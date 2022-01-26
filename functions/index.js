const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const adminEmail = functions.config().adminemail.email;
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
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
      from: gmailEmail,
      to: adminEmail,
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
  求人リンク: https://lraough.dev/joblisting/${data.jobListingId}
  応募した日: ${data.appliedOn}
  `;
};

exports.sendApplicationMail = functions
  .region("us-central1")
  .https.onCall((data, context) => {
    const adminMail = {
      from: gmailEmail,
      to: adminEmail,
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
