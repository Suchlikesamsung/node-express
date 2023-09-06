var express = require('express');
var router = express.Router();

router.get('/goladream', function(req, res, next) {
    const choosePlace = () => {
        const placeList = ["세무서","유안타","회식"]
        const randomIndex = Math.floor(Math.random() * placeList.length);
        return placeList[randomIndex]
    }
    const response = {
        "text" : choosePlace(),
        "responseType" : "inChannel"

    }
    res.json(response);
});

module.exports = router;
