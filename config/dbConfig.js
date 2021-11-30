module.exports = {
    connectionConfig: {
        max: 20,  // Clients in pool
        idleTimeoutMillis: 60000, // After 60 sec of idle time close connection.
        connectionTimeoutMillis: 2000,
        allowExitOnIdle: false
    }
};
