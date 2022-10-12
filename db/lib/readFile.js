const fs = require( "fs/promises" );

async function readFile( filePath, encoding = { encoding: 'utf8' } ) {
    try {
        return await fs.readFile( filePath, encoding );
    } catch ( err ) {
        console.log( err );
    }
}

module.exports = {
    readFile,
}
