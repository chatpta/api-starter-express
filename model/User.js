const ActiveRecord = require( './ActiveRecord' );


class User extends ActiveRecord{

    constructor() {
        super();
    }

    getFirstUser() {
        return { name: "Peter" }
    }

}

module.exports.User = User;
