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
        
        
        
    }
}

module.exports = Marcov;
