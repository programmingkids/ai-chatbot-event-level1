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
    
}

// ランダムな返信を行うレスポンスクラス
class RandomResponse extends Response {
    
}

// パターンで返信を行うレスポンスクラス
class PatternResponse extends Response {
    
}

class TemplateResponse extends Response {
    
    
    async parseText(text) {
        // 形態素解析を行う
        const dictPath = { dicPath: "node_modules/kuromoji/dict" };
        const tokens = await tokenize(text, dictPath);
        // 解析したトークン配列を返す
        return tokens;
    }
}

class MarcovResponse extends Response {
    
        
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
