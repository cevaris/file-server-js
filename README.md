# File Server JS
File HTTP Server

./node_modules/.bin/tsc --w
npm start

curl -v localhost:3000/
curl -v -X POST -F "file=@$HOME/Desktop/clouds.jpg" localhost:3000/upload/

curl -v -X POST -F "file=@$HOME/Desktop/clouds.jpg" https://calm-anchorage-06829.herokuapp.com/upload/
open https://calm-anchorage-06829.herokuapp.com/clouds.jpg


### Resources
- https://attacomsian.com/blog/uploading-files-nodejs-express
- https://expressjs.com/en/starter/static-files.html