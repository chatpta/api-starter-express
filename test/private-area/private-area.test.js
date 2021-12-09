const { describe, it } = require( "mocha" );
const request = require( "supertest" );
const app = require( "../../app" );
const assert = require( "assert" );


if ( process.env?.DB_CONN !== "none" ) {
    describe( "Application route /private", function () {

        const validJwt = 'Bearer eyJhbGciOiJzaGE1MTIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2Mzg3MjM1ODkyOTYsImNsaWVudF9pZCI6ImRhZDZlYjZhLWQwMGYtNDZhNS04N2Y2LWY4MDEwNGMzYTUzOCIsInJvbGVzIjpbImFkbWluIl19.Pt3dA-aOpER4ykEVDbzvJe92uIurz0OSOi3Zd2UjWkexUeFIbW_ID5RlCs47VI0UzZMyCTlNvkMGUA-1aCtN3y_IR2PPUdd51t9F3hTeH5XcqInJpG40wc4aw8XKLm1QG6aCw5HoLHuAxd5oc9cqU1ZuF4LsMpTwr-pJNdjEZug';

        it( "post", function ( done ) {

            // Act
            request( app )
                .post( '/private' )
                .set( 'Authorization', validJwt )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert.deepStrictEqual( response.status, 200 );
                    assert.deepStrictEqual( response?.body?.message, 'Private post response' );
                    done();
                } );
        } );

        it( "get", function ( done ) {

            // Act
            request( app )
                .get( '/private' )
                .set( 'Authorization', validJwt )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert.deepStrictEqual( response?.body?.message, 'Private get response' );
                    done();
                } );
        } );

        it( "patch", function ( done ) {

            // Act
            request( app )
                .patch( '/private' )
                .set( 'Authorization', validJwt )
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

        it( "delete", function ( done ) {

            // Act
            request( app )
                .delete( '/private' )
                .set( 'Authorization', validJwt )
                .send( {
                    user: { email: "updatedUserAppTest@gmail.com" }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert.deepStrictEqual( response?.body?.message, 'Private delete response' );
                    done();
                } );
        } );
    } );
}
