function _findByFirstNameQueryBuilder( name, className ) {
    return ( `
        SELECT *
        FROM ${ className }s
        WHERE first_name = '${ name }';
    ` );
}


module.exports = {
    _findByFirstNameQueryBuilder,
};