'use strict';

/**
 * Methods below are private-area methods  for ActiveRecords.js
 */

function _extractKeyPromptValueArrays( object ) {
    let keys = [];
    let values = [];
    let prompt = [];
    let number = 0;

    for ( let key of Object.keys( object ) ) {
        number += 1;
        keys.push( key );
        values.push( object[ key ] );
        prompt.push( `$${ number }` )
    }

    return [ keys, prompt, values ];
}

function _extractUpdateKeysValues( object ) {
    let keys = [];
    let values = [];
    let number = 1;

    for ( let key of Object.keys( object ) ) {
        number += 1;
        keys.push( key.toString() + "=$" + number );
        values.push( object[ key ] );
    }

    return [ keys, values ];
}

function _findByIdQueryBuilder( model, id ) {
    return ( `
        SELECT *
        FROM ${ model._tableName }
        WHERE ${ model._idName } = '${ id }';
    ` );
}

function _findOneQueryBuilder( model ) {
    return ( `
        SELECT *
        FROM ${ model._tableName } LIMIT 1;
    ` );
}

function _findLastTenQueryBuilder( model ) {
    return ( `
        SELECT *
        FROM ${ model._tableName }
        ORDER BY updated_at LIMIT 10
        OFFSET 0;
    ` );
}

function _saveQueryBuilder( model, object ) {
    let [ keys, prompt, values ] = _extractKeyPromptValueArrays( object );

    return ( {
        text: `INSERT INTO ${ model._tableName } (${ keys.join( ', ' ) })
               VALUES (${ prompt.join( ', ' ) }) RETURNING *`,
        values: values
    } );
}

function _updateQueryBuilder( model, record_id, updatedObject ) {
    let [ keys, values ] = _extractUpdateKeysValues( updatedObject );

    return ( {
        text: `UPDATE ${ model._tableName }
               SET ${ keys.join( ', ' ) }
               WHERE ${ model._idName } = $1 RETURNING *`,
        values: [ record_id, ...values ]
    } );
}

function _deleteQueryBuilder( model, record_id ) {
    return ( {
        text: `DELETE
               FROM ${ model._tableName }
               WHERE ${ model._idName } = $1 RETURNING *`,
        values: [ record_id ]
    } );
}

module.exports = {
    _findByIdQueryBuilder,
    _findOneQueryBuilder,
    _saveQueryBuilder,
    _updateQueryBuilder,
    _findLastTenQueryBuilder,
    _deleteQueryBuilder
};
