#!/bin/sh

echo "--> copying dependencies to test/lib\n"

# go to root
cd `dirname $0`
cd ..

mkdir -p test/lib/
cp node_modules/mocha/mocha.css node_modules/mocha/mocha.js test/lib
cp node_modules/chai/chai.js test/lib
cp node_modules/node-uuid/uuid.js test/lib
cp node_modules/underscore/underscore-min.js test/lib