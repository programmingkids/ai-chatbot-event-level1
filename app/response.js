const  {tokenize} = require('kuromojin');

// レスポンスクラスの親クラス
class Response {
    constructor(name) {
        this.name = name;
    }
    
    getName() {
        return this.name;
    }
    
    getResponse(inputText, dictionary) {
        return '';
    }
}

// 質問返しのレスポンスクラス
class RepeatResponse extends Response {
    getResponse(inputText, dictionary) {
        return '「' + inputText + '」ってなんのこと?';
    }
}

// ランダムな返信を行うレスポンスクラス
class RandomResponse extends Response {
    getResponse(inputText, dictionary) {
        // 辞書からランダムデータを取得
        const randomData = dictionary.randomData;
        // ランダムデータから1個の文章を取得
        const text = randomData[ Math.floor( Math.random() * randomData.length ) ] ;
        // 返信テキストを返す
        return text;
    }
}

// パターンで返信を行うレスポンスクラス
class PatternResponse extends Response {
    getResponse(inputText, dictionary) {
        // 辞書からパターンデータを取得
        const patternData = dictionary.patternData;
        for( const [ regex, phraseArray ] of patternData ) {
            // 入力テキストがパターンにマッチしたら
            const matched = inputText.match(regex);
            if( matched === null) {
                // マッチしない場合、スキップ
                continue;
            }
            // 返信用フレーズをランダムに取得
            const phrase = phraseArray[ Math.floor( Math.random() * phraseArray.length ) ] ;
            // 返信用フレーズから「%match%」を置き換えして返す
            return phrase.replace('%match%', matched[0]);
        }
        // パターンにマッチしない場合
        return 'Not Matched';
        //return new RandomResponse().getResponse(inputText, dictionary);
    }
}

class TemplateResponse extends Response {
    async getResponse(inputText, dictionary) {
        // 辞書からテンプレートデータを取得
        const templateData = dictionary.templateData;
        // 入力テキストを形態素解析する
        const tokens = await this.parseText(inputText);
        // 形態素解析した配列から名詞のみの配列を作成
        let words = [];
        for ( const token of tokens ) {
            if ( token.pos === '名詞') {
                words.push(token.surface_form);
            }
        }
        
        // テンプレートデータと入力テキストの名詞数がマッチするテンプレートを探す        
        const wordCount = words.length;
        if( wordCount > 0 && wordCount in templateData ) {
            // 名詞数がマッチしたテンプレート
            const templates = templateData[wordCount];
            // テンプレート配列からランダムに1個のテンプレートを取得
            let template = templates[ Math.floor( Math.random() * templates.length ) ] ;
            console.log( template );
            for ( const word of words ) {
                // テンプレートの「%noun%」を名詞に置き換える
                template = template.replace('%noun%', word);
            }
            console.log( template );
            // 返信テキストを返す
            return template;
        }
        // パターンにマッチしない場合
        return 'Not Matched';
        //return new PatternResponse().getResponse(inputText, dictionary);
    }
    
    async parseText(text) {
        // 形態素解析を行う
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
        // 解析したトークン配列を返す
        return tokens;
    }
}

class MarcovResponse extends Response {
    async getResponse(inputText, dictionary) {
        // 辞書からマルコフ連鎖で作成したデータを取得
        const marcovData = await dictionary.marcovData;
        
        // 返信テキスト用の配列
        let results = [];
        // 入力テキストを形態素解析する
        const tokens = await this.parseText(inputText);
        for ( const token of tokens ) {
            if ( token.pos === '名詞') {
                // 名詞のみを取り出す
                const word = token.surface_form;
                // マルコフ連鎖済みの配列に繰り返し処理
                for ( const line of marcovData ) {
                    // マルコフ連鎖済みの文字列に入力テキストの名詞が含まれているか判定
                    if ( line.includes( word )) {
                        // 結果テキスト用配列にマッチした文章を追加
                        results.push(line);
                    }
                }
            }
        }
        // 結果テキスト用配列から重複を排除する
        results =  [...new Set(results)];
        console.log("<<< matched results >>>");
        console.log(results);
        
        // 結果テキスト配列が空でなければ
        if ( results.length > 0 ) {
            // 結果テキスト用配列からランダムな要素を返す
            return results[ Math.floor( Math.random() * results.length ) ] ;
        }
        // パターンにマッチしない場合
        return 'Not Matched';
        //return new TemplateResponse().getResponse(inputText, dictionary);
    }
        
    async parseText(text) {
        // 形態素解析を行う
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
        // 解析したトークン配列を返す
        return tokens;
    }
}

module.exports = { 
    RepeatResponse, 
    RandomResponse, 
    PatternResponse,
    TemplateResponse,
    MarcovResponse,
};
