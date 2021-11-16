'use strict';
const ActiveRecord = require( './ActiveRecord' );


class Item extends ActiveRecord {

    constructor( DatabaseFactory ) {
        super( DatabaseFactory );
    }

    getFirstLine() {
        return { name: "First line" }
    }
}

module.exports.Item = Item;
