#!/bin/bash
source utils.sh
ENV_FILE="$(git_root)/services/.env
loadEnv "$ENV_FILE"

launchPostgress() {
  docker run -it -d --rm 
}

launchPostgress