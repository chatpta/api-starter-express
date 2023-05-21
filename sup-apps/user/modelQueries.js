function _findByFirstNameQueryBuilder( name, tableName ) {
    return ( `

        SELECT ${ tableName }.user_id,
               ${ tableName }.first_name,
               ${ tableName }.last_name,
               ${ tableName }.roles,
               ${ tableName }.updated_at

        FROM ${ tableName }

        WHERE ${ tableName }.first_name = '${ name }';

    ` );
}


module.exports = {
    _findByFirstNameQueryBuilder,
};
