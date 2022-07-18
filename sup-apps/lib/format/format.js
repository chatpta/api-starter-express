function formatResponseApiV1( req, status, data ) {
    return {
        version: "1.0.0",
        status: status,
        originalUrl: req?.originalUrl,
        data: data
    }
}

module.exports = {
    formatResponseApiV1
}
