const { describe, it } = require( "mocha" );
const ActiveRecord = require( '../../model/ActiveRecord' );
const assert = require( "assert" );

describe( "Active Record base class", () => {

    it( "Contains getById function", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.getById;

        // Assert
        assert(typeOfProperty === "function");
        done();
    } );

    it( "Contains getByName function", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.getByName;

        // Assert
        assert(typeOfProperty === "function");
        done();
    } );

} );
