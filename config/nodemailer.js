

"use strict";
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(env.smtp);

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

