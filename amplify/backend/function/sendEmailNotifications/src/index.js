/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'us-east-1' });

/**
 * A function that sends emails to users
 * @param {Arrays} emails An array of email addresses to send email to
 * @param {String} sourceEmail The email address to send emails from
 * @param {String} subject The subject of the email
 * @param {String} body The body of the email
 */
exports.handler = async ({ emails, subject, body, sourceEmail }) => {
	const params = {
		Destination: {
			ToAddresses: [...emails],
		},
		Message: {
			Body: {
				Text: {
					Data: body,
				},
			},
			Subject: {
				Data: subject,
			},
		},
		Source: sourceEmail,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			console.log(err, err.stack);
		} else {
			console.log('Email sent successfully:', data);
		}
	});
};
