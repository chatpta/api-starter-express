'use strict';

/**
 * This file contains functions common to all controllers.
 */

/**
 * Skips the route if does not receive data in dto
 * @param dto
 * @param next
 * @return {{success}|*}
 */
function checkSuccess( dto, next ) {
    if ( dto.success ) {
        return dto;
    } else {
        next( 'route' );
    }
}

module.exports = { checkSuccess };
