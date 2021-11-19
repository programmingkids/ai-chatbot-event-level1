const fs = require("fs");
const Marcov = require('./marcov');

class Dictionary {
    constructor() {
        this.randomData = this.getRandomData();
        this.patternData = this.getPatternData();
        this.templateData = this.getTemplateData();
        this.marcovData = this.getMarcovData();
    }
    
    getRandomData() {
        const file = './data/random.txt';
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        return data.split('\r\n');
    }
    
    getPatternData() {
        const file = './data/pattern.txt';

        let patterns = [];
        
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        const lines = data.split('\r\n');
        for( const line of lines ) {
            if ( line === '') continue;
            const [ pattern, phrase ] = line.split('\t');
            const regex = new RegExp(pattern, 'ig');
            const phraseArray = phrase.split("|");
            patterns.push([ regex, phraseArray ]);
        }
        return patterns;
    }
    
    getTemplateData() {
        const file = './data/template.txt';
        
        let templates = {};
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        const lines = data.split('\r\n');
        for( const line of lines ) {
            if ( line === '') continue;
            const [ count, sentence ] = line.split('\t');
            if ( !( count in templates )) {
                templates[count] = [];
            }
            templates[count].push(sentence);
        }
        return templates;
    }

    async getMarcovData() {
        let templates = [];
        
        // マルコフクラスのインスタンス作成
        const marcov = new Marcov();
        // マルコフ連鎖済みの文章の文字列取得
        const sentence = await marcov.makeSentence();
        
        // 文字列を配列に変換
        const sentences = sentence.split('\n');
        for( const sentence of sentences ) {
            if ( sentence !== '' ) {
                // 空行以外を追加
                templates.push(sentence);
            }
        }
        // マルコフ連鎖済みの配列を返す
        return templates;
    }
}

module.exports = Dictionary;
