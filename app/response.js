const  {tokenize} = require('kuromojin');

class Response {
    constructor(name) {
        this.name = name;
    }
    
    getName() {
        return this.name;
    }
    
    getResponse(inputText, data) {
        return '';
    }
}

class RepeatResponse extends Response {
    getResponse(inputText, data) {
        return `「${inputText}」ってなんのこと?`;
    }
}

class RandomResponse extends Response {
    getResponse(inputText, dictionary) {
        const randomData = dictionary.randomData;
        const text = randomData[ Math.floor( Math.random() * randomData.length ) ] ;
        return text;
    }
}

class PatternResponse extends Response {
    getResponse(inputText, dictionary) {
        const patternData = dictionary.patternData;
        for( const [ regex, phraseArray ] of patternData ) {
            const matched = inputText.match(regex);
            if( matched === null) {
                continue;
            }
            const phrase = phraseArray[ Math.floor( Math.random() * phraseArray.length ) ] ;
            return phrase.replace('%match%', matched[0]);
        }
        //return 'なんだかな～';
        return new RandomResponse().getResponse(inputText, dictionary);
    }
}

class TemplateResponse extends Response {
    async getResponse(inputText, dictionary) {
        const templateData = dictionary.templateData;
        const tokens = await this.parseText(inputText);
        let words = [];
        for ( const token of tokens ) {
            if ( token.pos === '名詞') {
                words.push(token.surface_form);
            }
        }
        
        const wordCount = words.length;
        if( wordCount > 0 && wordCount in templateData ) {
            const templates = templateData[wordCount];
            let template = templates[ Math.floor( Math.random() * templates.length ) ] ;
            console.log( template );
            for ( const word of words ) {
                template = template.replace('%noun%', word);
            }
            console.log( template );
            return template;
        }
        //return 'そうだね～';
        return new PatternResponse().getResponse(inputText, dictionary);
    }
    
    async parseText(text) {
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
        return tokens;
    }
}

class MarcovResponse extends Response {
    async getResponse(inputText, dictionary) {
        const marcovData = await dictionary.marcovData;
        
        let results = [];
        // 入力文字列を形態素解析する
        const tokens = await this.parseText(inputText);
        for ( const token of tokens ) {
            if ( token.pos === '名詞') {
                // 名詞のみを取り出す
                const word = token.surface_form;
                // マルコフ連鎖済みの配列に繰り返し処理
                for ( const line of marcovData ) {
                    // マルコフ連鎖済みの文字列に入力文字の名詞が含まれている
                    if ( line.includes( word )) {
                        // 結果配列に追加
                        results.push(line);
                    }
                }
            }
        }
        // 結果配列から重複を排除
        results =  [...new Set(results)];
        console.log("<<< matched results >>>");
        console.log(results);
        
        if ( results.length > 0 ) {
            // 結果配列が存在すれば、ランダムな要素を返す
            return results[ Math.floor( Math.random() * results.length ) ] ;
        }
        //return 'マルコフだね～';
        return new TemplateResponse().getResponse(inputText, dictionary);
    }
        
    async parseText(text) {
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
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
