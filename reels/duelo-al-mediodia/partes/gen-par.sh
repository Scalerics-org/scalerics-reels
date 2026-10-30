#!/bin/bash
cd "$(dirname "$0")/.."
# corre voces.sh en paralelo: cada gen en background
source <(sed 's/^gen \(..\) /gen \1 /; s/^\(gen .*\)$/\1 \&/' partes/voces.sh | sed '$a wait')
