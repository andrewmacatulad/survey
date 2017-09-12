const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplates");

module.exports = app => {
	app.get('/api/surveys', requireLogin,  async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id })
		// this is like saying don't include the recipients field
		.select({ recipients: false });

		res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		res.send("Thanks for doing this survey");
	});

	app.post("/api/surveys/webhooks", (req, res) => {
		const p = new Path("/api/surveys/:surveyId/:choice");

	_.chain(req.body)	
		.map(event => {
			const match = p.test(new URL(event.url).pathname);

			if (match) {
				return {
					email: event.email,
					surveyId: match.surveyId,
					choice: match.choice
				};
			}
		})

		// this compact lodash will remove elements that are undefined
		.compact()
		// this uniqBy lodash will remove duplicate elements
		.uniqBy("email", "surveyId")
		.each(event => {
			Survey.updateOne({
			// this is for searching of the data
				_id: event.surveyId,
				recipients: {
					$elemMatch: { email: event.email, responded: false }
				}
			}, 
			// this is for updating it
			{
			// this will increment whether if it is yes or no
			// which is a key interpolation which is [choice] this is not an array
				$inc: { [event.choice]: 1 },
			// this will set the responded to true
			// the recipients is the subdocument
			// the $ is from the elemMatch which have an index that depends on what you find
				$set: { 'recipients.$.responded': true },
				lastResponded: new Date()
			// this will execute the query
			}).exec()
		})
		.value();

		res.send({});
	});

	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(",")
				.map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// SENDING AND SAVING SURVEYS TO THE DATABASE
		try {
			// Sending Email
			// first argument is pass in the survey data/values
			// the second is the body of the email that have the div etc
			// which in this case the template
			const mailer = new Mailer(survey, surveyTemplate(survey));
			// this will call the send function you created at the Mailer.js
			await mailer.send();

			// this will save the survey to the database
			await survey.save();

			// deduct credits
			req.user.credits -= 1;
			// then save the changes in the user credits
			const user = await req.user.save();
			// this will update the number of credit
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
