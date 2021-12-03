'use strict';

/**
 * All controllers are exported here.
 */
module.exports = {
    home: require( './homeController' ),
    user: require( '../sup-apps/user/usersController' ),
    item: require( '../sup-apps/item/itemsController' )
}
