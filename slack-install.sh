#!/bin/bash

# Step 1: Download and install the Slack CLI using curl and bash
echo "Downloading and installing Slack CLI..."
sudo curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash

# Step 2: Add the Slack CLI bin directory to the PATH
export PATH="/Users/loganford/.slack/bin:$PATH"

echo "Slack CLI installation and setup completed."