// this is a regex that will check if email inputted is valid
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails => {
	const invalidEmails = emails
		// first split the emails with ,
		.split(",")
		// then trim it to trim it you need to map it so the trim will work on each email
		.map(email => email.trim())
		// then filter it to check if the email is valid
		// the re.test will check the email since we check if false you === false
		.filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};

// http://emailregex.com/
