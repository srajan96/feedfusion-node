#!/bin/bash
rm deploy.enc
chmod 600 deploy
ssh -i deploy deploy@139.59.64.249<<EOF
cd feedfusion-test
git pull
EOF
