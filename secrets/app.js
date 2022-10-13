module.exports = exports = {
    appTitle: "chatpta api starter",
    appNamespace: "api-starter-express:server",
    appPort: "30000",
    appRootPath: "/api/v1/starter",
    appCORSAllowedOrigins: [ /\.chatpta\.ca$/, /localhost:3000$/ ],
    appCORSAllowedHeaders: [
        'access-control-allow-origin',
        'authorization',
        'content-type',
        'visitor'
    ],
};
