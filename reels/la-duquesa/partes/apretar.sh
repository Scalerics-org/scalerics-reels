#!/bin/bash
# acorta las pausas internas (>0.32 s a -30 dB) a 0.22 s y recorta las puntas. Correr desde reels/la-duquesa: bash partes/apretar.sh NN
n=$1; f=partes/$n.wav
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)
S=$(ffmpeg -hide_banner -i $f -af silencedetect=n=-30dB:d=0.32 -f null - 2>&1 | grep -o "silence_\(start\|end\): [0-9.]*" | awk '{print $2}' | paste -sd' ')
node -e '
const D=+process.argv[1]; const s=process.argv[2].trim()?process.argv[2].trim().split(" ").map(Number):[];
const iv=[]; for(let i=0;i<s.length;i+=2) iv.push([s[i], s[i+1]??D]);
// tramos con voz
let keep=[], cur=0;
for (const [a,b] of iv){ const ini=a<0.05; const fin=b>=D-0.01;
  if(ini){cur=Math.max(0,b-0.05);continue;}
  if(fin){keep.push([cur,a+0.1]);cur=null;break;}
  keep.push([cur,a+0.11]); cur=b-0.11; }
if(cur!==null) keep.push([cur,D]);
const f=keep.map(([a,b],i)=>`[0:a]atrim=${a.toFixed(3)}:${b.toFixed(3)},asetpts=PTS-STARTPTS[p${i}]`).join(";")+";"+keep.map((_,i)=>`[p${i}]`).join("")+`concat=n=${keep.length}:v=0:a=1[o]`;
console.log(f);' "$D" "$S" > /tmp/claude-ap-$n.txt
ffmpeg -hide_banner -loglevel error -y -i $f -filter_complex "$(cat /tmp/claude-ap-$n.txt)" -map "[o]" -ar 48000 -ac 1 partes/$n-c.wav
rm -f /tmp/claude-ap-$n.txt
