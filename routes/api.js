const express = require('express');
const router = express.Router();

// Chatクラスの読み込み
const Chat = require("../app/chat");
// Dictionaryクラスの読み込み
const Dictionary = require("./../app/dictionary");

// Dictionaryのインスタンス作成
const dictionary = new Dictionary();

// 返信テキストを作成して送信
router.post('/chat/get', function(req, res, next) {
    // ユーザの入力した文字を取得
    const inputText = req.body.text;
    // チャットクラスインスタンス作成
    const chat = new Chat();
    // 返信テキストの送信
    (async() => {
        // 返信テキストの取得
        const responseText = await chat.getResponse(inputText, dictionary);
        // 送信
        res.json({
            "value" : responseText
        });
    })();
});

module.exports = router;
