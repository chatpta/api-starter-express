'use strict';

const ActiveRecord = require( '../../model' );

class Item extends ActiveRecord {

    constructor() {
        super();
    }
}

module.exports.Item = Item;
