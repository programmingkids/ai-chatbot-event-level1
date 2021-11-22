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
    // 形態素解析済みの文章の要素
    tokens.forEach(token => {
        console.log( token.surface_form + '\t\t' + token.pos );
    });
});
