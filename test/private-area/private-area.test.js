const { describe, it } = require( "mocha" );
const request = require( "supertest" );
const app = require( "../../app" );
const assert = require( "assert" );


describe( "Application route /private", function () {

    const validJwtUser = 'Bearer eyJhbGciOiJzaGE1MTIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2MzkwNjMzMDY5ODAsImNsaWVudF9pZCI6ImJmM2NmZjg2LWVlOTgtNDliZi1hOGY4LTQxOGFlOTU3ZjFkMSIsInJvbGVzIjpbInVzZXIiXX0.Hdpe1TGCI61SUL17Uv9MwLkh5iDAaGwnKedRc_frIJbVpGcqQ2W7rleDw8oJviaNSRNEJw67jXzD6AtI8SLuAfehf2x8W-VRBKuFtmCSmkF--2TKkVP7s_01icgQS06wWrxaK0uJcdheq6vYATamODxtdcwV2vwm0lVEZ5bZor0';
    const validJwtAdmin = 'Bearer eyJhbGciOiJzaGE1MTIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2Mzg3MjM1ODkyOTYsImNsaWVudF9pZCI6ImRhZDZlYjZhLWQwMGYtNDZhNS04N2Y2LWY4MDEwNGMzYTUzOCIsInJvbGVzIjpbImFkbWluIl19.Pt3dA-aOpER4ykEVDbzvJe92uIurz0OSOi3Zd2UjWkexUeFIbW_ID5RlCs47VI0UzZMyCTlNvkMGUA-1aCtN3y_IR2PPUdd51t9F3hTeH5XcqInJpG40wc4aw8XKLm1QG6aCw5HoLHuAxd5oc9cqU1ZuF4LsMpTwr-pJNdjEZug';
    const validJwtUserSeller = 'Bearer eyJhbGciOiJzaGE1MTIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2MzkwNjMwMjU1MTYsImNsaWVudF9pZCI6IjFjNzZlYTQ2LWEyMTItNGNjNS05MDMxLWE5YTI4ZDkyN2M0YyIsInJvbGVzIjpbInVzZXIiLCJzZWxsZXIiXX0.Hjl0DMJOz-HlzlnirXjoKZWmD1L3CJVrIW4T78ObkmRkuFqFw88RkqbOWvtQfcvrgKDZ0d0WWqShd_5nzt_mZIRDzYbABvAR5EEjW-eCkofWe4RJOAUmgrRlxvIr6fGWFy4guv9ccQc8UPj-d5apCMQqAHq-llLfinvaq1GNk28';

    it( "post with jwt containing ['user'] role", function ( done ) {

        // Act
        request( app )
            .post( '/private' )
            .set( 'Authorization', validJwtUser )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert.deepStrictEqual( response.status, 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private post response' );
                done();
            } );
    } );

    it( "post with jwt containing ['user', 'seller'] role", function ( done ) {

        // Act
        request( app )
            .post( '/private' )
            .set( 'Authorization', validJwtUserSeller )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert.deepStrictEqual( response.status, 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private post response' );
                done();
            } );
    } );

    it( "get with jwt containing ['user'] role", function ( done ) {

        // Act
        request( app )
            .get( '/private' )
            .set( 'Authorization', validJwtUser )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private get response' );
                done();
            } );
    } );

    it( "patch with jwt containing ['user', 'seller'] role", function ( done ) {

        // Act
        request( app )
            .patch( '/private' )
            .set( 'Authorization', validJwtUserSeller )
            .send( {
                user: { email: "userAppTest@gmail.com" },
                updated_user: { email: "updatedUserAppTest@gmail.com" }
            } )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private patch response' );
                done();
            } );
    } );

    it( "delete fails with jwt containing ['admin'] role", function ( done ) {

        // Act
        request( app )
            .delete( '/private' )
            .set( 'Authorization', validJwtAdmin )
            .send( {
                user: { email: "updatedUserAppTest@gmail.com" }
            } )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.error, 'wrong credentials' );
                done();
            } );
    } );
} );

