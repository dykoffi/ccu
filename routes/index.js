const express = require('express')
const router = express.Router();


router
.get('/', (req, res, next)=>{
    console.log("bienvenue");
    res.end("edy koffi")
})



module.exports = router