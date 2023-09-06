var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const choosePlace = () => {
        const placeList = ["세무서","유안타","회식"]
        const randomIndex = Math.floor(Math.random() * placeList.length);
        return placeList[randomIndex]
    }
    res.send(choosePlace())
});
//2

module.exports = router;
