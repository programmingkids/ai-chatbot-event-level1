//const kuromojin = require("kuromojin");
const  {tokenize, getTokenizer} = require('kuromojin');

//const text = "親譲りの無鉄砲で小供の時から損ばかりしている"
//const text = "すもももももももものうち";
//const text = "今日はとても暑いです";
//const text = "昔々、あるところにお爺さんとお婆さんが住んでいたそうな。お爺さんは山へ芝刈りに、お婆さんは川へ洗濯に向かいましたとさ。すると、川上からどんぶらこどんぶらこと大きな桃が流れてきました。";
const text = "私のおすすめの夕食はピザとカレーですが、あなたの好きな料理は何ですか";

const dictPath = { dicPath: "node_modules/kuromoji/dict" };

class Hoge {
  async getTokens() {
      const r = await tokenize(text, dictPath);
      //console.log( r );
      return r;
  }
  
  async getHoge() {
    //this.getTokens();
    const r = await this.getTokens();
    return r;
    //console.log( r );
  }
}


const h = new Hoge();
//h.getHoge();
(async () => {
  const result = await h.getHoge();
  console.log( result );
})();
//console.log("------")

//const p = getTokens();
/*
p.then(tokens => {
  tokens.forEach(e => {
    console.log(`${e.surface_form} \t\t ${e.pos}`);
  });
});
*/