const {
    appTitle,
    appNamespace,
    appPort,
    appRootPath,
    appCORSAllowedOrigins,
    appCORSAllowedHeaders
} = require( process?.env?.SECRET_PATH );

function getAppTitle() {
    return process?.env?.APP_TITLE || appTitle;
}

function getAppNamespace() {
    return process?.env?.APP_NAMESPACE || appNamespace;
}

function getAppPort() {
    return process?.env?.APP_PORT || appPort;
}

function getAppRootPath() {
    return process?.env?.APP_ROOT_PATH || appRootPath;
}

function getAppCORSAllowedList() {
    return process?.env?.APP_CORS_ALLOWED_ORIGINS || appCORSAllowedOrigins;
}

function getAppCORSAllowedHeaders() {
    return process?.env?.APP_CORS_ALLOWED_HEADER || appCORSAllowedHeaders;
}

module.exports = {
    getAppTitle,
    getAppNamespace,
    getAppPort,
    getAppRootPath,
    getAppCORSAllowedList,
    getAppCORSAllowedHeaders
}
