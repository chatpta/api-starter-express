'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const { emailConfig } = require( "../../config" );


describe( "Config/emailConfig", function () {

    it( "getSmtpEmailServer", function ( done ) {

        // Act
        const smtpEmailServer = emailConfig.getSmtpEmailServer();

        // Assert
        assert.deepStrictEqual( smtpEmailServer, "chatptamail.com" );
        done();
    } );

    it( "getSenderEmail", function ( done ) {

        // Act
        const senderEmail = emailConfig.getSenderEmail();

        // Assert
        assert.deepStrictEqual( senderEmail, "accounts@chatpta.com" );
        done();
    } );


    it( "getEmailPassword", function ( done ) {

        // Act
        const emailPassword = emailConfig.getEmailPassword();

        // Assert
        assert.deepStrictEqual( emailPassword, "password" );
        done();
    } );
} );

