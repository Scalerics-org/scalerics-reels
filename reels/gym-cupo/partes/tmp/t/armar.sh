#!/bin/bash
cd "$(dirname "$0")"
cat 0_head.js 1_util.js 2_set.js 5a_tarj.js 3_pers.js 4_ui.js 5b_tarj.js 6_planos.js e_cam.js 7_render.js > ../../../assets/tres.js
