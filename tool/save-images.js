//#!/usr/bin/env bash
//# github에 올린 user-images를 자동으로 다운로드합니다.
var shell = require('shelljs');
var fs = require('fs');

//NUM=1855714

//CHANGE_LIST=`git diff --exit-code --cached --name-only --diff-filter=ACM -- "*.md"`
var ret = shell.exec(`git diff --exit-code --cached --name-only --diff-filter=ACM -- "*.md"`);
var CHANGE_LIST = ret.stdout.split('\n');

var SUCCESS_COUNT=0
var FAIL_COUNT=0
//for CHANGED_FILE in $CHANGE_LIST; do
CHANGE_LIST.forEach((CHANGED_FILE) => {
    //echo $CHANGED_FILE
    
	console.log(`CHANGED_FILE = ${CHANGED_FILE}`);
	var ex = /(.*)\/[a-zA-Z_-]+.md$/

    // _wiki/sfmb_betatest_how_to_make_parallax_background.md
    // ^^^^^
    var DIR_NAME = CHANGED_FILE.match(ex);
    //DIR_NAME=`echo $CHANGED_FILE | sed -E 's,^.+/([^\.]+)\.md$,\1,'`
    console.log(`DIR_NAME = ${DIR_NAME}`);

    shell.exec(`mkdir -p ./post-img/${DIR_NAME}`)
	
    // #TODO CHANGED_FILE을 열어서 아래 조건으로 검색
	var ret = shell.exec(`ag "https://user-images\.githubuser.*?\/$NUM\/.*?(png|jpg|gif)" -o $CHANGED_FILE`);
    var URI_LIST = ret.stdout.split('\n');

	//for URI in $URI_LIST; do
	URI_LIST.forEach((URI) => {    
        var FILE_NAME = `echo $URI | sed 's,^.*/,,'`;
        console.log(`TARGET: ${URI}`);
		
        shell.exec(`curl -s ${URI} > ./post-img/${DIR_NAME}/${FILE_NAME}`);

        // #TODO
		/*
        if [ "$?" == "0" ]; then
            echo "DOWNLOAD SUCCESS: $FILE_NAME"
            sed -i '' -E 's, *https://.*('"$FILE_NAME"') *, /post-img/'$DIR_NAME'/\1 ,g' $CHANGED_FILE

            git add post-img/$DIR_NAME/$FILE_NAME

            SUCCESS_COUNT=$((SUCCESS_COUNT+1))
        else
            echo "DOWNLOAD FAIL: $FILE_NAME"
            rm -f ./post-img/$DIR_NAME/$FILE_NAME
            FAIL_COUNT=$((FAIL_COUNT+1))
        fi
		*/
    });
    
	//git add $CHANGED_FILE
});

//done

//printf "Success: %d, Fail: %d\n" $SUCCESS_COUNT $FAIL_COUNT
console.log(`Success: ${SUCCESS_COUNT}, Fail: ${FAIL_COUNT}`);
