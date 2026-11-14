#!/bin/bash
# snap.sh "t1,t2,..." [nombre]: snapshots con el candado de Chrome; copia los PNG a renders/snap/<nombre>/ y arma una hoja
cd "$(dirname "$0")"
N=${2:-ult}
out=$(flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 snapshot --at "$1" --no-end 2>&1)
dir=$(echo "$out" | grep -o '/home[^ ]*snapshots/[a-z0-9-]*' | head -1)
mkdir -p renders/snap/$N && rm -f renders/snap/$N/*.png && cp $dir/frame-*.png renders/snap/$N/
n=$(ls renders/snap/$N/frame-*.png | wc -l); cols=$(( n < 6 ? n : 6 ))
ffmpeg -loglevel error -y -pattern_type glob -i "renders/snap/$N/frame-*.png" -vf "scale=300:-1,drawtext=text='%{eif\:n\:d}':x=6:y=6:fontsize=28:fontcolor=red,tile=${cols}x$(( (n + cols - 1) / cols ))" -frames:v 1 renders/snap/$N/hoja.png
echo "renders/snap/$N/hoja.png ($n cuadros)"
