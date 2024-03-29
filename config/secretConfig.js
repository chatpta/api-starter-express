const {
    publicKey,
    privateKey,
    hashKey,
    pgUser,
    pgDatabase,
    pgPassword,
    pgHost,
    pgPort
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

module.exports = {
    getPublicKey,
    getPrivateKey,
    getHashKey,
    getPgUser,
    getPgDatabase,
    getPgPassword,
    getPgHost,
    getPgPort
};
