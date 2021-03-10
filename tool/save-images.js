//#!/usr/bin/env bash
//# github에 올린 user-images를 자동으로 다운로드합니다.
var shell = require('shelljs');
var fs = require('fs');

//NUM=1855714
let NUM = 963958; // 각 계정별 고유값으로 추정됨

//CHANGE_LIST=`git diff --exit-code --cached --name-only --diff-filter=ACM -- "*.md"`
//var ret = shell.exec(`git diff --exit-code --cached --name-only --diff-filter=ACM -- "*.md"`);
var ret = shell.exec(`git diff --exit-code --name-only -- "*.md"`);
var CHANGE_LIST = ret.stdout.split('\n');
console.log(`CHANGE_LIST = ${CHANGE_LIST}`);

var SUCCESS_COUNT=0
var FAIL_COUNT=0
//for CHANGED_FILE in $CHANGE_LIST; do
CHANGE_LIST.forEach((CHANGED_FILE) => {
    //echo $CHANGED_FILE
    if (!CHANGED_FILE || CHANGED_FILE.length == 0) return;

	console.log(`CHANGED_FILE = ${CHANGED_FILE}`);
	var ex = /_(.*).md$/

    // 주의: _wiki 경로로 그대로 복사하면 Jekyll 이 복사하지 않는다.
    //       _ 로 시작하는 폴더는 자동으로 제외되는 듯 하다.
    // _wiki/sfmb_betatest_how_to_make_parallax_background.md
    //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    let dirMatchResult = CHANGED_FILE.match(ex);
    //console.debug(`dirMatchResult = ${dirMatchResult}`);

    if (!dirMatchResult) return;
    var DIR_NAME = dirMatchResult[1].split('/').join('\\');
    //DIR_NAME=`echo $CHANGED_FILE | sed -E 's,^.+/([^\.]+)\.md$,\1,'`
    console.log(`DIR_NAME = ${DIR_NAME}`);
    shell.exec(`mkdir .\\post-img\\${DIR_NAME}`)
	
    // CHANGED_FILE을 열어서 아래 조건으로 검색
    var URI_LIST = [];
    {
        let buf = fs.readFileSync(`${CHANGED_FILE}`);
        let lines = buf.toString().split('\n');
        lines.forEach((line) => {
            let ex2 = /https\:\/\/user-images\.githubuser.*?\/963958\/.*?(png|jpg|gif)/
            let ex2result = line.match(ex2);
            if (!ex2result) return;
            //console.debug(`ex2result = ${ex2result[0]}`);
            URI_LIST.push(ex2result[0])
        });
    }
	//var ret = shell.exec(`ag "https://user-images\.githubuser.*?\/$NUM\/.*?(png|jpg|gif)" -o $CHANGED_FILE`);
    //var URI_LIST = ret.stdout.split('\n');

	//for URI in $URI_LIST; do
	URI_LIST.forEach((URI) => {    
        //var FILE_NAME = `echo $URI | sed 's,^.*/,,'`;
        let ex3 = /\/([a-zA-Z_\-0-9]+.(png|jpg|gif))$/
        let ex3result = URI.match(ex3);
        //console.debug(`ex3result = ${ex3result}`);
        console.log(`TARGET: ${URI}`);
		
        if (!ex3result) return;
        let FILE_NAME = ex3result[1];
        let downloadResult = shell.exec(`curl -s ${URI} > ./post-img/${DIR_NAME}/${FILE_NAME}`);
        
        //if [ "$?" == "0" ]; then
        //console.debug(`downloadResult.code = ${downloadResult.code}`);
        if (downloadResult.code == 0) {
            //echo "DOWNLOAD SUCCESS: $FILE_NAME"
            console.log(`DOWNLOAD SUCCESS: ${FILE_NAME}`)
            //sed -i '' -E 's, *https://.*('"$FILE_NAME"') *, /post-img/'$DIR_NAME'/\1 ,g' $CHANGED_FILE
            {
                // #TODO  
                let buf = fs.readFileSync(`${CHANGED_FILE}`);
                let lines = buf.toString().split('\n');
                let lines2 = [];
                lines.forEach((line) => {
                    //let ex4 = /https\:\/\/.*('`${FILE_NAME}`')/
                    //if (!ex4.test(line)) {
                    if (line.indexOf(URI) < 0) {
                        lines2.push(line);
                        //console.debug(`NO MATCH: ${line}`)
                    } else {
                        console.debug(`    FROM: ${line}`)
                        let DIR_NAME_AS_URI = DIR_NAME.split('\\').join('/');
                        let line2 = line.replace(URI, `/post-img/${DIR_NAME}/${FILE_NAME}`);
                        console.debug(`      TO: ${line2}`)
                        lines2.push(line2);
                    }
                });
                fs.writeFileSync(`${CHANGED_FILE}`, lines2.join('\n'))
            }

            // #TODO
            //git add post-img/$DIR_NAME/$FILE_NAME
            shell.exec(`git add post-img/${DIR_NAME}/${FILE_NAME}`)

            //SUCCESS_COUNT=$((SUCCESS_COUNT+1))
            ++SUCCESS_COUNT
        } else {
            //echo "DOWNLOAD FAIL: $FILE_NAME"
            console.log(`DOWNLOAD FAIL: ${FILE_NAME}`)
            
            //rm -f ./post-img/$DIR_NAME/$FILE_NAME
            shell.exec(`del ./post-img/${DIR_NAME}/${FILE_NAME}`)

            //FAIL_COUNT=$((FAIL_COUNT+1))
            ++FAIL_COUNT
        }
    });

	//git add $CHANGED_FILE
    shell.exec(`git add ${CHANGED_FILE}`)
});

//done

//printf "Success: %d, Fail: %d\n" $SUCCESS_COUNT $FAIL_COUNT
console.log(`Success: ${SUCCESS_COUNT}, Fail: ${FAIL_COUNT}`);
