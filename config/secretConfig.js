const {
    publicKey,
    privateKey,
    hashKey,
    pgUser,
    pgDatabase,
    pgPassword,
    pgHost,
    pgPort,
    smtpEmailServer,
    senderEmail,
    passEmail
} = require( process?.env?.SECRET_PATH );

function getPublicKey() {
    return process?.env?.PUBLIC_KEY || publicKey;
}

function getPrivateKey() {
    return process?.env?.PRIVATE_KEY || privateKey;
}

function getHashKey() {
    return process?.env?.HASH_KEY || hashKey;
}

function getPgUser() {
    return process?.env?.PGUSER || pgUser;
}

function getPgDatabase() {
    return process?.env?.PGDATABASE || pgDatabase;
}

function getPgPassword() {
    return process?.env?.PGPASSWORD || pgPassword;
}

function getPgHost() {
    return process?.env?.PGHOST || pgHost;
}

function getPgPort() {
    return process?.env?.PGPORT || pgPort;
}

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
    getPublicKey,
    getPrivateKey,
    getHashKey,
    getPgUser,
    getPgDatabase,
    getPgPassword,
    getPgHost,
    getPgPort,
    getSmtpEmailServer,
    getSenderEmail,
    getEmailPassword
};
