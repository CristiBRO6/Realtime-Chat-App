const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

const sendMail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html,
    };

    const transporter = createTransporter();

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        throw new Error('Failed to send email');
    }
};

const generateEmailHTML = (headerText, contentText, footer, hasButton = false, buttonText = '', buttonUrl = '') => {
    const buttonHTML = hasButton ? 
    `<a href="${buttonUrl}" style="text-decoration: none; cursor: pointer;">
        <button style="cursor: pointer;">${buttonText}</button>
    </a>` : '';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                margin: 0;
                padding: 0;
                color: black;
            }
            .container {
                max-width: 400px;
                margin: 1rem auto;
                background: #ffffff;
                border: 1px solid #e4e4e7;
                border-radius: 0.375rem;
                overflow: hidden;
            }
            .header {
                text-align: center;
                padding: 1rem 0;
            }
            .content {
                text-align: center;
                padding-bottom: 1rem;
                padding-left: 1rem;
                padding-right: 1rem;
            }
            .footer {
                border-top: 1px solid #e4e4e7;
                text-align: center;
                padding: 1rem;
            }

            button {
                outline: none;
                border: none;
                color: #fafafa;
                background: #18181b;
                font-weight: 500;
                font-size: 0.875rem;
                line-height: 1.25rem;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                padding-left: 0.75rem;
                padding-right: 0.75rem;
                border-radius: 0.375rem;
                white-space: nowrap;
                height: 2.25rem;
                cursor: pointer;
                margin-top: 0.5rem;
            }
            a {
                text-decoration: none;
                cursor: pointer;
            }
            h1 {
                margin: 0;
                font-weight: 700;
                font-size: 1.25rem;
                letter-spacing: -0.025em;
            }
            h2 {
                margin: 0;
                font-weight: 700;
                font-size: 1.125rem;
                letter-spacing: -0.025em;
            }
            p {
                color: #71717a;
                margin: 0;
                font-size: 0.875rem;
                line-height: 1.25rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${headerText}</h1>
            </div>
            <div class="content">
                ${contentText}
                ${buttonHTML}
            </div>
            <div class="footer">
                <p>${footer}</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { sendMail, generateEmailHTML };