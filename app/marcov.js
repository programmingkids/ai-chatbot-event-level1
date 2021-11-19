const fs = require('fs');
const  {tokenize} = require('kuromojin');

class Marcov {
    readFile() {
        const file = './data/marcov3.txt';
        
        let results = [];
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        // 〇で区切る
        let lines = data.split('。');
        
        for( const line of lines ) {
            // 空行はスキップ
            if ( line === '') continue;
            const newLines = line.split('\n');
            // 開業で区切る
            for( const newLine of newLines ) {
                // 空行はスキップ
                if ( newLine === '') continue;
                // 配列に追加
                results.push(newLine.trim());
            }
        }
        // 文章の配列を返す
        return results;
    }
    
    async getSurfaceText(text) {
        const tokens = await this.parseText(text);
        return tokens.map(token => {
            return token.surface_form;
        });
    }
    
    async parseText(text) {
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
        return tokens;
    }

    async makeSentence() {
        const fileData = this.readFile();
        // 配列を改行コードで連結して文字列にする
        const text = fileData.join('\n');
        // 形態素解析済みの文字の配列
        const wordList = await this.getSurfaceText(text);
        
	    // マルコフ辞書の作成
	    const marcovDict = {};
	    let p1 = '';
	    let p2 = '';
	    let p3 = '';
	    
	    for ( const word of wordList ) {
    	    // p1、p2、p3のすべてに値が格納されているか
    	    if ( p1 && p2 && p3 ) {
       		    // markovに(p1, p2, p3)キーが存在するか
       		    const key = p1 + '_' + p2 + '_' + p3;
                
       		    if ( ! (key in marcovDict) ) {
       		        marcovDict[key] = [];
       		    }
       		    marcovDict[key].push(word);
    	    }
            // 3つのプレフィックスの値を置き換える
            [p1, p2, p3] = [p2, p3, word];
	    }
        
        // マルコフ辞書から文章を作り出す
        let count = 0;
        let sentence = '';
    	// markovのキーをランダムに抽出し、プレフィックス1～3に代入
    	const keys = Object.keys(marcovDict);
        let key = keys[ Math.floor( Math.random() * keys.length ) ];
        
        [p1, p2, p3] = key.split('_');
        
        while( count < wordList.length ) {
            let tmp = '';
            // キーが存在するかチェック
            if ( key in marcovDict ) {
                // 文章にする単語を取得
                const words = marcovDict[key];
                tmp = words[ Math.floor( Math.random() * words.length ) ];
                // 取得した単語をsentenceに追加
                sentence += tmp;
            }
            // 3つのプレフィックスの値を置き換える
            [p1, p2, p3] = [p2, p3, tmp];
            key = p1 + '_' + p2 + '_' + p3;
            count += 1;
        }
        
        // カッコを削除
        sentence = sentence.replace('「', '');
        sentence = sentence.replace('」', '');
        // 先頭の文章を削除
        sentence = sentence.replace(/^.+?。/, '');
        // 最後の文章を削除
        sentence = sentence.replace(/。[^。]*?$/, '');
        // マルコフ連鎖の文章を文字列で返す
        return sentence;
    }
}

module.exports = Marcov;
