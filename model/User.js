'use strict';
const ActiveRecord = require( './ActiveRecord' );


class User extends ActiveRecord {

    constructor( DatabaseFactory ) {
        super( DatabaseFactory );
    }

    findFirstUser() {
        return { name: "Peter" }
    }

}

module.exports.User = User;
