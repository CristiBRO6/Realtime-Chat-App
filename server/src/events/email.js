const eventEmitter = require('@/events/index');
const { sendMail, generateEmailHTML } = require('@/services/emailService');

eventEmitter.on('welcome', async ({ email, name, resolve, reject }) => {
  try {
    const subject = 'Welcome to Chat App';
    const html = generateEmailHTML(
        'Welcome to Chat App',
        `<h3>Hello, ${name}!</h3>
        <p>We're excited to welcome you to our community!</p>
        <p>Click the button below to get started and explore all that we have to offer.</p>`,
        'Thank you for joining our community! We’re thrilled to have you with us. If you have any questions or need assistance, feel free to reach out to our support team.',
        true,
        'Get Started',
        `${process.env.ALLOWEDORIGIN}`
    );

    await sendMail(email, subject, html);

    resolve();
  } catch (err) {
    console.error(err);
  }
});

eventEmitter.on('sendVerificationCode', async ({ email, code, id, resolve, reject }) => {
  try {
    const subject = 'Account Verification Code';
    const html = generateEmailHTML(
        'Account Verification',
        `<p>Your account verification code is: 
        <strong><h2>${code}</h2></strong></p>`,
        'If you did not request this, please ignore this email.',
        true,
        'Verify Account',
        `${process.env.ALLOWEDORIGIN}/auth/email-verification/${id}`
    );

    await sendMail(email, subject, html);

    resolve();
  } catch (err) {
    console.error(err);
  }
});

eventEmitter.on('resetPassword', async ({ email, id, resolve, reject }) => {
  try {
    const subject = 'Reset Password';
    const html = generateEmailHTML(
        'Reset Your Password',
        '<p>You have requested to reset your password. Click the button below to reset your password. This link will expire in 10 minutes.</p>',
        'If you did not request this, please ignore this email.',
        true,
        'Reset Password',
        `${process.env.ALLOWEDORIGIN}/auth/reset-password/${id}`
    );

    await sendMail(email, subject, html);

    resolve();
  } catch (err) {
    console.error(err);
  }
});

module.exports = eventEmitter;
