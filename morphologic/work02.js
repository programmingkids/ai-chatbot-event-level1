const  {tokenize} = require('kuromojin');

// 形態素解析を行う文章
const text = '今日はとても暑いです';

// 形態素解析で利用する辞書の読み込み
const dictPath = { dicPath: '../node_modules/kuromoji/dict' };

// 形態素解析を行う
tokenize(text, dictPath).then(tokens => {
    // 形態素解析済みの文章の要素
    tokens.forEach(token => {
        // surface_formとposのみを表示
        console.log( token.surface_form + '\t\t' + token.pos );
    });
});
