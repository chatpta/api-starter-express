const {
    smtpEmailServer,
    senderEmail,
    passEmail
} = require( process?.env?.SECRET_PATH );

function getSmtpEmailServer() {
    return process?.env?.SMTP_EMAIL_SERVER || smtpEmailServer;
}

function getSenderEmail() {
    return process?.env?.SMTP_EMAIL_SERVER || senderEmail;
}

function getEmailPassword() {
    return process?.env?.EMAIL_PASSWORD || passEmail;
}

module.exports = {
    getSmtpEmailServer,
    getSenderEmail,
    getEmailPassword
};
