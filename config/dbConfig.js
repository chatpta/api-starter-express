module.exports = {
    connectionConfig: {
        max: 20,  // Clients in pool
        idleTimeoutMillis: 2000, // After 2 sec of idle time close connection.
        connectionTimeoutMillis: 200, // After 200 ms of trying to connect time out.
        allowExitOnIdle: false
    }
};
