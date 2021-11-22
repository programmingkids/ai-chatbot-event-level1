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
        // ランダムデータ用ファイルを読み込む
        const file = './data/random.txt';
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        return data.split('\r\n');
    }
    
    getPatternData() {
        // パターンデータ用ファイルを読み込む
        const file = './data/pattern.txt';

        let patterns = [];
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        const lines = data.split('\r\n');
        for( const line of lines ) {
            // 空行をスキップする
            if ( line === '') continue;
            // タブ区切りでパターンとフレーズに分割する
            const [ pattern, phrase ] = line.split('\t');
            // パターンで正規表現インスタンスを作成
            const regex = new RegExp(pattern, 'ig');
            const phraseArray = phrase.split("|");
            // パターンデータに追加
            patterns.push([ regex, phraseArray ]);
        }
        // パターンとフレーズの配列を返す
        return patterns;
    }
    
    getTemplateData() {
        // テンプレートデータ用ファイルを読み込む
        const file = './data/template.txt';
        
        let templates = {};
        const data = fs.readFileSync(file,{encoding:'utf8', flag:'r'});
        const lines = data.split('\r\n');
        for( const line of lines ) {
            // 空行をスキップする
            if ( line === '') continue;
            // タブ区切りで名詞回数と文章に分割する
            const [ count, sentence ] = line.split('\t');
            if ( !( count in templates )) {
                templates[count] = [];
            }
            // パターンデータに追加
            templates[count].push(sentence);
        }
        // パターンデータを返す
        return templates;
    }

    async getMarcovData() {
        // マルコフ連鎖で作成した文章のデータを作成
        let templates = [];
        
        // マルコフクラスのインスタンス作成
        const marcov = new Marcov();
        // マルコフ連鎖済みの文字列取得
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
