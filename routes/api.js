const express = require('express');
const router = express.Router();

// 返信テキストを作成して送信
router.post('/chat/get', function(req, res, next) {
    res.json({
        "value" : ''
    });
});

module.exports = router;
