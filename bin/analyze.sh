#!/bin/bash
echo "== Analyzing with eslint"
docker-compose -f bin/docker/docker-compose.dev.yml run codacy-cli analyze --tool eslint --force-file-permissions
echo "== Analyzing with jshint"
docker-compose -f bin/docker/docker-compose.dev.yml run codacy-cli analyze --tool jshint --force-file-permissions