#!/bin/bash

# explicit declaration that this script needs a $TAG variable passed in e.g TAG=1.2.3 ./script.sh
TAG=$TAG

RELEASE_SYNTAX='^[0-9]+\.[0-9]+\.[0-9]+$'
PRERELEASE_SYNTAX='^[0-9]+\.[0-9]+\.[0-9]+(-.+)+$'

if [ ! "$CI" = true ]; then
  echo "Warning: this script should not be run outside of the CI"
  echo "If you really need to run this script, you can use"
  echo "CI=true ./scripts/publishRelease.sh"
  exit 1
fi

if [[ -z "${GITHUB_AUTH}" ]]; then
  echo "\033[0;33mWarning: GitHub Token not set for lerna-changelog package. See https://github.com/lerna/lerna-changelog#github-token\033[0m"
fi

# print CHANGELOG from PRs
yarn lerna-changelog

echo "Latest changelog has been printed to your console"

if [[ "$PRE_RELEASE" = true || "$(echo $TAG | grep -E $PRERELEASE_SYNTAX)" == "$TAG" ]]; then
  npm version $TAG --no-push --no-push --no-git-tag-version --exact --ignore-changes -y 
  echo "publishing a new pre release: $TAG" 
  npm publish --tag next
elif [[ "$(echo $TAG | grep -E $RELEASE_SYNTAX)" == "$TAG" ]]; then
  TAG=$TAG npm run release:validate
  echo "publishing a new release: $TAG"
  npm publish
else
  echo "Error: the tag $TAG is not valid. exiting..."
  exit 1
fi
