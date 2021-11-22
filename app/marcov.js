const fs = require('fs');
const {tokenize} = require('kuromojin');

class Marcov {
    readFile() {
        // マルコフ連鎖のもとになるデータファイル
        const file = './data/marcov1.txt';
        
        let results = [];
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        // 〇で区切る
        let lines = data.split('。');
        
        for( const line of lines ) {
            // 空行はスキップ
            if ( line === '') continue;
            // 改行で分割した配列作成
            const newLines = line.split('\n');
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
        // トークンから「surface_form」の配列を返す
        const tokens = await this.parseText(text);
        return tokens.map(token => {
            return token.surface_form;
        });
    }
    
    async parseText(text) {
        // 形態素解析を行う
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
        // 解析済みのトークンを返す
        return tokens;
    }

    async makeSentence() {
        // マルコフ連鎖による文章の作成
        // データファイルを読み込む
        const fileData = this.readFile();
        // 配列を行コードで連結して文字列にする
        const text = fileData.join('\n');
        // 形態素解析を行い、「surface_form」のみの配列取得
        const wordList = await this.getSurfaceText(text);
        
	    // マルコフ連鎖用の辞書の作成
	    const marcovDict = {};
	    let p1 = '';
	    let p2 = '';
	    let p3 = '';
	    
	    for ( const word of wordList ) {
    	    // p1、p2、p3のすべてに値が格納されているか
    	    if ( p1 && p2 && p3 ) {
    	        // 辞書のキーを作成
       		    const key = p1 + '_' + p2 + '_' + p3;
                // 辞書にキーが存在するか判定
       		    if ( ! (key in marcovDict) ) {
       		        // 存在しない場合、新しいキーを作成
       		        marcovDict[key] = [];
       		    }
       		    // 辞書のキーに追加
       		    marcovDict[key].push(word);
    	    }
            // 3つのプレフィックスの値をずらす
            [p1, p2, p3] = [p2, p3, word];
	    }
        
        // マルコフ辞書から文章を作り出す
        let count = 0;
        let sentence = '';
        // 辞書からキーの配列を取得
    	const keys = Object.keys(marcovDict);
    	// キーの配列からランダムなキーを取得
        let key = keys[ Math.floor( Math.random() * keys.length ) ];
        // キーをアンダースコアで分割
        [p1, p2, p3] = key.split('_');
        
        while( count < wordList.length ) {
            let tmp = '';
            // キーが存在するかチェック
            if ( key in marcovDict ) {
                // 辞書から単語配列を取得
                const words = marcovDict[key];
                // 単語配列から1個の単語をランダムに取得
                tmp = words[ Math.floor( Math.random() * words.length ) ];
                // 単語を文章に連結
                sentence += tmp;
            }
            // 3つのプレフィックスの値をずらす
            [p1, p2, p3] = [p2, p3, tmp];
            // 新しいキーを作成
            key = p1 + '_' + p2 + '_' + p3;
            count += 1;
        }
        
        // 不要なカッコを削除
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
