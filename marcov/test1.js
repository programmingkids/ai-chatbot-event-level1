const kuromoji = require('kuromoji');

//const text = "親譲りの無鉄砲で小供の時から損ばかりしている"
//const text = "すもももももももものうち";
//const text = "今日はとても暑いです";
//const text = "昔々、あるところにお爺さんとお婆さんが住んでいたそうな。お爺さんは山へ芝刈りに、お婆さんは川へ洗濯に向かいましたとさ。すると、川上からどんぶらこどんぶらこと大きな桃が流れてきました。";
const text = "私のおすすめの夕食はピザとカレーですが、あなたの好きな料理は何ですか";

const dictPath = { dicPath: "node_modules/kuromoji/dict" };

kuromoji.builder(dictPath).build((err, tokenizer) => {
  if(err){
    console.log(err);
  } else {
    const tokens = tokenizer.tokenize(text);
    tokens.forEach(e => {
        console.log(`${e.surface_form} \t\t ${e.pos}`);
    });
    console.log(tokens);
  }
});
