'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const { appConfig } = require( "../../config" );


describe( "Config/appConfig", function () {

    it( "getAppTitle", function ( done ) {

        // Act
        const appTitle = appConfig.getAppTitle();

        // Assert
        assert.deepStrictEqual( appTitle, "chatpta api starter" );
        done();
    } );

    it( "getAppNamespace", function ( done ) {

        // Act
        const appNamespace = appConfig.getAppNamespace();

        // Assert
        assert.deepStrictEqual( appNamespace, "api-starter-express:server" );
        done();
    } );

    it( "getAppPort", function ( done ) {

        // Act
        const appPort = appConfig.getAppPort();

        // Assert
        assert.deepStrictEqual( appPort, "40000" );
        done();
    } );

    it( "getAppRootPath", function ( done ) {

        // Act
        const appRootPath = appConfig.getAppRootPath();

        // Assert
        assert.deepStrictEqual( appRootPath, "/api/v1/starter" );
        done();
    } );

    it( "getAppCORSAllowedList", function ( done ) {

        // Act
        const appCORSAllowedList = appConfig.getAppCORSAllowedList();

        // Assert
        assert.deepStrictEqual( appCORSAllowedList, [ /\.chatpta\.ca$/, /localhost:3000$/ ] );
        done();
    } );

    it( "getAppCORSAllowedHeaders", function ( done ) {

        // Act
        const appCORSAllowedHeaders = appConfig.getAppCORSAllowedHeaders();

        // Assert
        assert.deepStrictEqual( appCORSAllowedHeaders, [
            'access-control-allow-origin',
            'authorization',
            'content-type',
            'visitor'
        ] );
        done();
    } );
} );

