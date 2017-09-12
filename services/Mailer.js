const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../config/keys');

class Mailer extends helper.Mail {
	// this constructor is called because this Mailer is called with new Mailer
	// and it will have 2 arguments like in the surveyRoute
	// the first argument you will get the subject, recipient
	// and the second argument will be the content = body
	constructor({ subject, recipients}, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		// this will just make a no reply email
		this.from_email = new helper.Email('no-reply@emaily.com')
		this.subject = subject
		this.body = new helper.Content('text/html', content)
		// this recipients will be an array
		this.recipients = this.formatAddresses(recipients)

		// this is another function that takes the this.body
		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	}
	// A helper function for extracting emails from the subdocument
	formatAddresses(recipients) {
		return recipients.map( ({email}) => {
			return new helper.Email(email);
		})
	}

	// this helper function is for sendgrid scanning the email
	// and replace links with their own special link
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();

		// loop the recipients which is a new helper.Email(email)
		// so for each of the recipients add to the personalize object
		// then after that call the this.addPersonalization and add the pesonalize object to that
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		})
		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});
		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;