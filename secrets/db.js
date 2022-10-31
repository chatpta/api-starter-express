module.exports = exports = {
    pgDatabase: "chatpta_starter_db",
    pgUser: "chatpta_starter_user",
    pgPassword: "password",
    pgHost: "127.0.0.1",
    pgPort: process?.env?.NODE_ENV === 'test' ? 40111 :
        process?.env?.NODE_ENV === 'development' ? 40222 : 5432
};
