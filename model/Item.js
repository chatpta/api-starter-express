'use strict';
const ActiveRecord = require( './ActiveRecord' );


class Item extends ActiveRecord {

    constructor() {
        super();
    }

    getFirstLine() {
        return { name: "First line" }
    }
}

module.exports.Item = Item;
