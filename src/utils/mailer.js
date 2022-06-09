//jshint esversion:11

import sgMail from "@sendgrid/mail";
import { baseTemplate } from "./mailTemplate.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function email(to, subject, username, message) {
  const msg = {
    to,
    from: {
      name: "Shethink",
      email: "dinesh@shethink.in",
    },
    subject,
    html: baseTemplate(username, message),
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response);
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
