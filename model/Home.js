const ActiveRecord = require( './ActiveRecord' );

class Home extends ActiveRecord{

    constructor() {
        super();
    }

    getFirstLine() {
        return { name: "First line" }
    }
}

module.exports.Home = Home;
