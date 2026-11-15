#!/bin/bash
# partes/ver.sh <carpeta de snap> <salida.png> <índices...>: une cuadros a 450 px de ancho, lado a lado
d=$1; o=$2; shift 2; ins=""; f=""; k=0
for i in "$@"; do p=$(ls $d/frame-$(printf %02d $i)-*.png); ins="$ins -i $p"; f="$f[$k]scale=450:-1[v$k];"; k=$((k+1)); done
s=""; for ((j=0;j<k;j++)); do s="$s[v$j]"; done
ffmpeg -loglevel error -y $ins -filter_complex "${f}${s}hstack=$k" $o
