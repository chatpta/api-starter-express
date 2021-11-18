const DTO  = require( '../interfaces' );

class DtoFactory {
    static getDTO() {
        return new DTO();
    }
}

module.exports = DtoFactory;
