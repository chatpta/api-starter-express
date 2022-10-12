#!/usr/bin/env node
'use strict';

/**
 * Creates database and tables for starter application.
 */

const { runMigrationSqlFiles } = require( "./lib/runMigrationSqlFiles" );


runMigrationSqlFiles()
    .finally( process.exit )
