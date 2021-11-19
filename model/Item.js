'use strict';

const ActiveRecord = require( './ActiveRecord/ActiveRecord' );

class Item extends ActiveRecord {

    constructor() {
        super();
    }
}

module.exports.Item = Item;
