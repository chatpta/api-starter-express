#!/usr/bin/env node
'use strict';

const { runRollback } = require( "./lib/runRollback" );
/**
 * Creates database and tables for starter application.
 */

const {} = require( "./lib/runMigrationSqlFiles" );


runRollback()
    .finally( process.exit )
