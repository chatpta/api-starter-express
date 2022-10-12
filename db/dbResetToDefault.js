#!/usr/bin/env node
'use strict';


const { resetToDefault } = require( "./lib/resetToDefault" );

resetToDefault()
    .finally( process.exit )
