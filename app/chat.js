const {
    RepeatResponse,
    RandomResponse,
    PatternResponse,
    TemplateResponse,
    MarcovResponse,
} = require("./response");

class Chat {
    constructor() {
        this.repeatResponse = new RepeatResponse('Repeat');
        this.randomResponse = new RandomResponse('Random');
        this.patternResponse = new PatternResponse('Pattern');
        this.templateResponse = new TemplateResponse('Template');
        this.marcovResponse = new MarcovResponse('Marcov');
    }
    
    async getResponse(inputText, dictionary) {
        // 質問返しのレスポンスクラス
        this.response = this.repeatResponse;
        
        // ランダムな返信を行うレスポンスクラス
        this.response = this.randomResponse;
        
        // パターンで返信を行うレスポンスクラス
        this.response = this.patternResponse;
        
        // 形態素解析でマッチした返信を行うレスポンスクラス
        this.response = this.templateResponse;
        
        // マルコフ連鎖の文章で返信を行うレスポンスクラス
        this.response = this.marcovResponse;
        
        // 返信テキストを取得
        const responseText = await this.response.getResponse(inputText, dictionary);
        console.log(this.response.getName());
        console.log(responseText);
        console.log('=====');
        // 返信テキストを返す
        return responseText;
    }
}

module.exports = Chat;
