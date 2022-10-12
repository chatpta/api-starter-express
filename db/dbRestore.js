#!/usr/bin/env node
'use strict';

/**
 * Connect to database and restore it.
 */
const { restoreDatabaseFromSqlFiles } = require( "./lib/restoreDatabaseFromSqlFiles" );


restoreDatabaseFromSqlFiles()
    .finally( process.exit )


