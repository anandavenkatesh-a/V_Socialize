

const queue = require('../config/kue');
const commentMailer = require('../mailer/comments_mailer').newComment;

queue.process('comment_email', function(job, done){
    console.log('processing job',job)
    commentMailer(job.data);
    done();
});
   