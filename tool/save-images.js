// 2021-03-10 neoarc; 기존의 save-images.sh를 node.js 스크립트로 포팅한 것
//                    비교하기 용이하도록 변수명은 기존값을 유지했음 (대문자 변수들)
//                    sed, ag 등의 명령이 사용 불가능할 경우 사용하자.

// github에 올린 user-images를 자동으로 다운로드 합니다.
const shell = require('shelljs');
const fs = require('fs');

// 각 계정별 고유값으로 추정됨
// 본인의 github.io Repo Issue 페이지에 글을 작성할 때 확인 가능
let NUM = 963958; 

// 변경된 파일 목록을 얻어온다.
var ret = shell.exec(`git diff --exit-code --name-only -- "*.md"`);
var CHANGE_LIST = ret.stdout.split('\n');
console.log(`CHANGE_LIST = ${CHANGE_LIST}`);

var SUCCESS_COUNT=0
var FAIL_COUNT=0
CHANGE_LIST.forEach((CHANGED_FILE) => {
    if (!CHANGED_FILE || CHANGED_FILE.length == 0) return;
	console.log(`CHANGED_FILE = ${CHANGED_FILE}`);

    // 주의: _wiki 경로로 그대로 복사하면 Jekyll이 _site 폴더로 복사하지 않는다.
    //       _ 로 시작하는 폴더는 자동으로 제외되는 듯 하다.
    //
    // _wiki/aaa/bbb/ccc.md
    //  ^^^^^^^^^^^^^^^^
    let dirMatched = CHANGED_FILE.match(/_(.*).md$/);
    if (!dirMatched) return;

    var DIR_NAME = dirMatched[1].split('/').join('\\');
    console.log(`DIR_NAME = ${DIR_NAME}`);

    // .md를 제외한 이름으로 계층구조의 폴더 생성
    shell.exec(`mkdir .\\post-img\\${DIR_NAME}`)
	
    // CHANGED_FILE을 열어서, githubuser* 에 링크된 이미지 파일을 찾는다.
    var URI_LIST = [];
    {
        fs.readFileSync(`${CHANGED_FILE}`)
          .toString()
          .split('\n')
          .forEach((line) => {
            let imageUriMatched = line.match(/https\:\/\/user-images\.githubuser.*?\/963958\/.*?(png|jpg|gif)/);
            if (!imageUriMatched) return;

            URI_LIST.push(imageUriMatched[0]);
        });
    }

    // 찾아낸 URI에 대하여 처리한다.
	URI_LIST.forEach((URI) => {    
        // 파일이름만 잘라낸다.
        let imageFilenameMatched = URI.match(/\/([a-zA-Z_\-0-9]+.(png|jpg|gif))$/);
        if (!imageFilenameMatched) return;

        console.log(`TARGET: ${URI}`);		
        let FILE_NAME = imageFilenameMatched[1];

        // 이미지 파일을 github에서 로컬경로로(post-img/...) 다운로드한다.
        let downloadResult = shell.exec(`curl -s ${URI} > ./post-img/${DIR_NAME}/${FILE_NAME}`);
        if (downloadResult.code == 0) {
            console.log(`DOWNLOAD SUCCESS: ${FILE_NAME}`);

            // 다운로드에 성공했으면, 위키 문서를 열어 모든 URI를 로컬경로로 replace한다.
            {
                let newLines = [];
                fs.readFileSync(`${CHANGED_FILE}`)
                  .toString()
                  .split('\n')
                  .forEach((line) => {
                    if (line.indexOf(URI) < 0) 
                        newLines.push(line);
                    else {
                        let DIR_NAME_AS_URI = DIR_NAME.split('\\').join('/');
                        let convertedLine = line.replace(URI, `/post-img/${DIR_NAME_AS_URI}/${FILE_NAME}`);
                        newLines.push(convertedLine);
                    }
                });
                fs.writeFileSync(`${CHANGED_FILE}`, newLines.join('\n'));
            }

            // 잘 변환한 이미지 파일을 커밋할 수 있도록 add 한다.
            shell.exec(`git add post-img/${DIR_NAME}/${FILE_NAME}`)
            ++SUCCESS_COUNT
        } else {
            console.log(`DOWNLOAD FAIL: ${FILE_NAME}`)
            
            // 다운로드에 실패했다면, 받다 만 찌꺼기 파일을 삭제한다.
            shell.exec(`del ./post-img/${DIR_NAME}/${FILE_NAME}`)
            ++FAIL_COUNT
        }
    });

	// 해당 md 파일을 다시 add 한다.
    shell.exec(`git add ${CHANGED_FILE}`)
});

console.log(`Success: ${SUCCESS_COUNT}, Fail: ${FAIL_COUNT}`);

// 끝
