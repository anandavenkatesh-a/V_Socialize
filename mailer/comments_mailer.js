

const nodeMailer = require('../config/nodemailer');
module.exports.newComment = (comment) => {
    const HTMLString = nodeMailer.renderTemplate({comment:comment},'/comment/comment_created.ejs');

    nodeMailer.transporter.sendMail({
        from:'vsocialize369@gmail.com',
        to:comment.user.email,
        subject:'Comment created successfully!',
        html:HTMLString
    },(err,info) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(info);
        }
    });
}
