const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const testEmail = functions.config().testemail.email;
const testPassword = functions.config().testemail.password;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: testEmail,
    pass: testPassword,
  },
});

const adminContents = (data) => {
  return `Global Developersのコンタクトフォームよりお問い合わせがきています。
  Name: ${data.name}
  Email: ${data.email}
  Message: ${data.content}`;
};

exports.sendMail = functions
  .region("us-central1")
  .https.onCall((data, context) => {
    const adminMail = {
      from: testPassword,
      to: testPassword,
      subject:
        "Global Developersのコンタクトフォームよりお問い合わせがきています。",
      text: adminContents(data),
    };
    mailTransport.sendMail(adminMail, (err, info) => {
      if (err) {
        return console.error(`transmission error: ${err}`);
      }
      return console.log("Email sent successfully.");
    });
  });
