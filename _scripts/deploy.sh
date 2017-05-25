#!/bin/bash
rm deploy.enc
chmod 600 deploy
ssh -i deploy deploy@139.59.12.220<<EOF
cd feedfusion-node
git pull
EOF
