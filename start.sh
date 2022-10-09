#!/bin/bash

# Reload the systemd demon - for new service
systemctl daemon-reload

# Enable new service
systemctl enable chatpta_starter_api.service

# Start new service
systemctl start chatpta_starter_api.service
