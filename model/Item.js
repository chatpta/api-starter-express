'use strict';
const ActiveRecord = require( './ActiveRecord' );


class Item extends ActiveRecord {

    constructor( Database ) {
        super( Database );
    }

    getFirstLine() {
        return { name: "First line" }
    }
}

module.exports.Item = Item;
