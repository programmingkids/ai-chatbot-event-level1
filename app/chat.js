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
        // 1 ~ 10
        const max = 1;
        const min = 10;
        const x = Math.floor( Math.random() * (max + 1 - min) ) + min ;
        
        /*
        if (x < 2 ) {
            this.response = this.repeatResponse;
        } else if( x < 4 ) {
            this.response = this.randomResponse;
        } else if( x < 6 ) {
            this.response = this.patternResponse;
        } else if ( x < 11 ) {
            this.response = this.templateResponse;
        } else {
            this.response = this.repeatResponse;
        }
        */
        this.response = this.marcovResponse;
        
        const response = await this.response.getResponse(inputText, dictionary);
        console.log(this.response.getName());
        console.log(response);
        console.log('=====');
        return response;
    }
}
module.exports = Chat;
