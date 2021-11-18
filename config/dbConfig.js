module.exports = {
    connectionConfig: {
        max: 20,  // Clients in pool
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 2000,
        allowExitOnIdle: false
    }
};
