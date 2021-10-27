class User {

    constructor() {
    }

    getFirstUser() {
        return { name: "Peter" }
    }

    getUserById( id ) {
        return { name: "Peter", id: id }
    }
}

module.exports.User = User;
