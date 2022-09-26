module.exports = exports = {
    pgDatabase: "chatpta_starter_db",
    pgUser: "chatpta_starter_user",
    pgPassword: "password",
    pgHost: "localhost",
    pgPort: process?.env?.NODE_ENV === 'test' ? 3111 :
        process?.env?.NODE_ENV === 'development' ? 3222 : 5432
};
