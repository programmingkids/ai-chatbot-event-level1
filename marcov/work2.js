const  {tokenize} = require('kuromojin');
const fs = require('fs');

// 読み込むファイル
const file = './data.txt';
// ファイルを同期処理で読み込む
let text = fs.readFileSync(file,{encoding:'utf8', flag:'r'});

// 読み込んだデータを改行で配列に分割する
const textArray = text.split('\n');
// 配列を文字列に結合する
text = textArray.join('');

// 形態素解析で利用する辞書の読み込み
const dictPath = { dicPath: '../node_modules/kuromoji/dict' };

// 形態素解析を行う
tokenize(text, dictPath).then(tokens => {
    // 「surface_form」のみの配列を作成する
    const wordList = getSurfaceForm( tokens );
    
    // マルコフ連鎖を行うための辞書を作成
    const marcovDict = createMarcofDict( wordList );
    
    // マルコフ辞書から文章を作り出す
    
    
    
    
});

function getSurfaceForm( tokens ) {
    const wordList = [];
    for( const token of tokens ) {
        wordList.push( token.surface_form );
    }
    return wordList;
}

function createMarcofDict( wordList ) {
    const marcovDict = {};
    // 辞書のキーとなる単語
    for ( let i = 1; i < wordList.length; i++ ) {
        const key = wordList[i - 1];
        const word = wordList[i];
        
   	    if ( ! (key in marcovDict) ) {
   	        // 存在しない場合、キーを設定
   	        marcovDict[key] = [];
   	    }
   	    // 辞書に「word」を追加
   	    marcovDict[key].push(word);
    }
    // マルコフ連鎖で利用する辞書完成
    return marcovDict;
}
