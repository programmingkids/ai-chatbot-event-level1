const express = require('express');
const router = express.Router();

const Chat = require("../app/chat");
const Dictionary = require("./../app/dictionary");

const dictionary = new Dictionary();

router.post('/chat/get', function(req, res, next) {
    const inputText = req.body.text;
    
    const chat = new Chat();
    
    (async() => {
        const responseText = await chat.getResponse(inputText, dictionary);
        res.json({ 
            "value" : responseText
        });
    })();
});

module.exports = router;
