function checkSuccess( dto, next ) {
    if ( dto.success ) {
        return dto;
    } else {
        next( 'route' );
    }
}

module.exports = { checkSuccess };
