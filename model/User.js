'use strict';
const ActiveRecord = require( './ActiveRecord' );


class User extends ActiveRecord {

    constructor(Database) {
        super(Database);
    }

    findFirstUser() {
        return { name: "Peter" }
    }

}

module.exports.User = User;
