#! /bin/sh

source ~/.nvm/nvm.sh
rm -rf node_modules package-lock.json
npm i
npm rebuild