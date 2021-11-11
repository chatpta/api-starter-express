require( 'dotenv' ).config();
const path = require( 'path' );
const params = require( './router' );
const loggers = require( './logger' );


const tableName =  {
    product: 'products',
    categories: 'categories',
    productsCategories: 'products_categories'
}

module.exports = {
    development: {
        siteName: 'Indian Masala',
        log: loggers.development,
        data: {
            speakers: path.join( __dirname, '../data/articles.json' ),
            avatars: path.join( __dirname, '../data/images' ),
        },
        database: {
            dsn: process.env.DEVELOPMENT_DB_DSN,
            tableNames: tableName
        },
        params: params,
    },
    production: {
        siteName: 'Indian Masala',
        log: loggers.production,
        data: {
            speakers: path.join( __dirname, '../data/articles.json' ),
            avatars: path.join( __dirname, '../data/images' ),
        },
        database: {
            dsn: process.env.PRODUCTION_DB_DSN,
            tableNames: tableName
        },
        params: params,
    },
    test: {
        siteName: 'Indian Masala',
        log: loggers.test,
        data: {
            speakers: path.join( __dirname, '../data/articles.json' ),
            avatars: path.join( __dirname, '../data/images' ),
        },
        database: {
            dsn: process.env.TEST_DB_DSN,
            tableNames: tableName
        },
        params: params,
    },
};
