const {
    getPgUser,
    getPgDatabase,
    getPgPassword,
    getPgHost,
    getPgPort
} = require( './secretConfig' );

module.exports = {
    connectionConfig: {
        host: getPgHost(),
        user: getPgUser(),
        database: getPgDatabase(),
        password: getPgPassword(),
        port: getPgPort(),
        max: 20,  // Clients in pool
        idleTimeoutMillis: 2000, // Connection close after 2 sec of idle time.
        connectionTimeoutMillis: 200, // After 200 ms of trying to connect time out.
        allowExitOnIdle: false
    },
};
