#!/bin/bash
PACKAGE_JSON_PATH=$1
git fetch origin master:master
VERSION_CURRENT=$(jq -r '.version' $PACKAGE_JSON_PATH)
VERSION_MASTER=$(git show master:$PACKAGE_JSON_PATH | jq -r '.version')

if [ "$VERSION_CURRENT" = "$VERSION_MASTER" ]; then
  echo "Version has not changed"
  exit 1
# elif [ "$VERSION_CURRENT" < "$VERSION_MASTER" ]; then
elif [ "$(printf '%s\n' "$VERSION_MAIN" "$VERSION_CURRENT" | sort -V | head -n1)" = "$VERSION_CURRENT" ]; then
  echo "Version has decreased"
  exit 1
else 
  echo "Version increased to $VERSION_CURRENT"
fi
