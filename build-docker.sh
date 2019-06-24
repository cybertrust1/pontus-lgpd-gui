#!/bin/bash

DIR="$( cd "$(dirname "$0")" ; pwd -P )"
cd $DIR/docker
docker build --no-cache --rm . -t pontusvisiongdpr/pontus-lgpd-comply-lib

docker push pontusvisiongdpr/pontus-lgpd-comply-lib

