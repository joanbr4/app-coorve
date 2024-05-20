#!/bin/bash
source utils.sh
ENV_FILE="$(git_root)/services/sso/.env
loadEnv "$ENV_FILE"

launchTurso() {
  docker run -it -d --rm 
}

launchTurso