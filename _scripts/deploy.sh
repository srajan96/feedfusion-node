#!/bin/bash
rm deploy.enc
chmod 600 deploy
ssh -i deploy deploy@139.59.64.249<<EOF
cd feedfusion
git pull
rm target/hello.war
mvn package
rm /var/lib/tomcat8/webapps/feedfusion.war
cp target/hello.war /var/lib/tomcat8/webapps/feedfusion.war
echo "deployed"
EOF
