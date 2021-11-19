const Dto = require( "../../interfaces" );


async function _createDto( record ) {
    const dto = await Dto.getDTO();

    // Create data transfer object ( Interface )
    if ( record?.rowCount >= 1 ) {
        dto.success = true;
        dto.length = record?.rowCount;
        dto.data = record?.rows;
    }

    return dto;
}

module.exports = {
    _createDto
};
