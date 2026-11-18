#!/bin/bash
# medir100.sh <wav> [desde] [hasta]: tramos de 100 ms (pasaaltos 300 Hz) bajo -42 dBFS RMS
ffmpeg -hide_banner -i "$1" -af "aresample=48000,pan=mono|c0=0.5*c0+0.5*c1,highpass=f=300,asetnsamples=4800,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level" -f null - 2>&1 | grep -o 'RMS_level=[-0-9.inf]*' | cut -d= -f2 | awk -v a=${2:-0} -v b=${3:-9999} '{t=(NR-1)*0.1; if (t>=a && t<b) { if ($1=="-inf" || $1+0 < -42) printf "%.1f(%s) ", t, $1; if (m=="" || $1+0<m) m=$1+0 } } END {print "\nmin", m}'
