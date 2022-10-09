#!/bin/bash

# Check specific service
systemctl status chatpta_starter_api.service

# Stop service
systemctl restart chatpta_starter_api.service

# Check specific service
systemctl status chatpta_starter_api.service
