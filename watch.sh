#!/bin/sh

npm install
bower install

# clean and prepare public directory
rm -rf public
cp -r src public
cp -r bower_components public/bower

# compile jade to html
./node_modules/.bin/nodemon -e jade --watch src --exec "
  ./node_modules/.bin/jade src -o public -PH
  rm -rf src/*.html public/_partials" &

# compile sass to css
./node_modules/.bin/node-sass \
  --output-style compressed \
  --source-map-embed \
  --recursive \
  src/_styles/main.scss public/css/main.css &

# convert ES6 JS to ES5
./node_modules/.bin/babel \
  src \
  --out-dir public \
  -s inline \
  -w &


echo "clean"
# clean unneeded files
rm -rf public/_styles \
       public/*.jade \
       public/**/*.jade \
       public/*.scss \
       public/**/*.scss

echo "╔═══════════════════════════════════════════╗"
echo "║          Watching for changes...          ║"
echo "╚═══════════════════════════════════════════╝"
