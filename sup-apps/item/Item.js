'use strict';

const ActiveRecord = require( '../../model/ActiveRecord/ActiveRecord' );

class Item extends ActiveRecord {

    constructor() {
        super();
    }
}

module.exports.Item = Item;
