'use strict';
const { describe, it } = require( "mocha" );
const ActiveRecord = require( '../../model/ActiveRecord/ActiveRecord' );
const assert = require( "assert" );

describe( "Model/activeRecord", () => {

    it( "Contains findById", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.findById;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains findOne", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.findOne;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains findLastTen", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.findLastTen;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains save", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.save;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains update", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.update;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains delete", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.delete;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );
} );
