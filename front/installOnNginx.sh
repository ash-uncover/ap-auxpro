npm install
npm run prod
service nginx stop
cp index.html /var/www/html/index.html
cp dist/auxpro.bundle.js /var/www/html/auxpro.bundle.js
rm -r /var/www/html/assets
cp -r assets /var/www/html/assets
rm -r dist
service nginx start
