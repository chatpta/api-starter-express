const {
    publicKey,
    privateKey,
    hashKey,
    passEmail,
    pgHost,
    pgPort,
    pgUser,
    pgDatabase,
    pgPassword
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

function getEmailPassword() {
    return process?.env?.EMAIL_PASSWORD || passEmail;
}

function getPgHost() {
    return process?.env?.PGHOST || pgHost;
}

function getPgPort() {
    return process?.env?.PGPORT || pgPort;
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


module.exports = {
    getPublicKey,
    getPrivateKey,
    getHashKey,
    getEmailPassword,
    getPgHost,
    getPgPort,
    getPgUser,
    getPgDatabase,
    getPgPassword
};
