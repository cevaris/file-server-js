# File Server JS
File HTTP Server

** Compile on file change **
./node_modules/.bin/tsc --w

** Start Local Server **
npm start

** Run integration tests **
npm run test-integration

curl -v localhost:3000/
curl -v -X POST -F "file=@$HOME/Desktop/clouds.jpg" localhost:3000/files.json

curl -v -X POST -F "file=@$HOME/Desktop/clouds.jpg" https://calm-anchorage-06829.herokuapp.com/files.json
open https://calm-anchorage-06829.herokuapp.com/files/clouds.jpg


### Resources
- https://attacomsian.com/blog/uploading-files-nodejs-express
- https://expressjs.com/en/starter/static-files.html