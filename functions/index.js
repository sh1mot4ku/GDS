const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const testEmail = functions.config().testemail.email;
const testPassword = functions.config().testemail.password;
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

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

const emailContentsForContactForm = (data) => {
  return `Global Developersのコンタクトフォームから${data.name}よりお問い合わせがきています。
  Name: ${data.name}様
  Email: ${data.email}
  Message: ${data.content}`;
};

exports.sendMail = functions
  .region("us-central1")
  .https.onCall((data, context) => {
    const adminMail = {
      from: testEmail,
      to: testEmail,
      subject: `[GDS] ${data.name}様よりお問い合わせがきています。`,
      text: emailContentsForContactForm(data),
    };
    mailTransport.sendMail(adminMail, (err, info) => {
      if (err) {
        return console.error(`transmission error: ${err}`);
      }
      return console.log("Email sent successfully.");
    });
  });

const emailContentsForApplicationEmail = (data) => {
  // change url later
  return `Global Developersの求人への応募がきています。
  応募者名: ${data.applicant}
  応募者Email: ${data.applicantEmail}
  求人タイトル: ${data.jobTitle}
  会社名: ${data.companyName}
  求人リンク: http://localhost:3000/joblisting/${data.jobListingId}
  応募した日: ${data.appliedOn}
  `;
};

exports.sendApplicationMail = functions
  .region("us-central1")
  .https.onCall((data, context) => {
    const adminMail = {
      from: testEmail,
      to: testEmail,
      subject: `[GDS] ${data.applicant}様より求人への応募がありました。`,
      text: emailContentsForApplicationEmail(data),
    };
    mailTransport.sendMail(adminMail, (err, info) => {
      if (err) {
        return console.error(`transmission error: ${err}`);
      }
      return console.log("Email sent successfully.");
    });
  });
