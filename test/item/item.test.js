'use strict';
const assert = require( 'assert' );
const { describe, it, beforeEach, afterEach } = require( "mocha" );
const  Item  = require( "../../sup-apps/item/itemModelFactory" ).getItem();


// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( 'Item model', () => {

        let testItemId = null;

        beforeEach( async () => {
            let testItem = await Item.save( { title: "Test Item" } );
            testItemId = testItem.data[ 0 ].item_id;
        } );

        afterEach( async () => {
            await Item.delete( testItemId );
        } );

        it( 'Saves item', async () => {
            // Arrange
            const testItem = { title: "Save me" };

            // Act
            let savedItem = await Item.save( testItem );
            let savedItemTitle = savedItem.data[ 0 ].title;
            let savedItemId = savedItem.data[ 0 ].item_id;
            await Item.delete( savedItemId );

            // Assert
            assert.deepStrictEqual( savedItemTitle, testItem.title );
        } );


        it( 'findOne', async () => {
            // Act
            const item = await Item.findOne();

            // Assert
            assert.deepStrictEqual( item.length, 1 );
        } );

        it( 'findById', async () => {
            // Act
            const foundItem = await Item.findById( testItemId );
            const foundItemId = foundItem.data[ 0 ].item_id;

            // Assert
            assert.deepStrictEqual( foundItemId, testItemId );
        } );

        it( 'update', async () => {
            // Arrange
            const updateItem = { title: "Updated item" };

            // Act
            const updatedItem = await Item.update( testItemId, updateItem );
            const updateItemId = updatedItem.data[ 0 ].item_id;
            const updateItemTitle = updatedItem.data[ 0 ].title;

            // Assert
            assert.deepStrictEqual( updateItemId, testItemId );
            assert.deepStrictEqual( updateItemTitle, "Updated item" );
        } );
    } );
}
