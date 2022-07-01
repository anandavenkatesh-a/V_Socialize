

"use strict";
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'vsocialize369@gmail.com', 
      pass: 'wpdxuwginszkaasq', 
    },
  });

  let renderTemplate = (data,relativePath) => {
        let mailHTML;
        ejs.renderFile(
            path.join(__dirname,'../views/mail_templates',relativePath),
            data,
            (err,template) => {
                if(err)
                {
                    console.log(err);
                    return;
                }

                mailHTML = template;
            }
        );

        return mailHTML;
  };

module.exports = {
          transporter:transporter,
          renderTemplate:renderTemplate
        };

