const router = require('express').Router();
const bcrypt = require('bcryptjs')
const { protected } = require('../../middlewares/restricted');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dfulxq7so',
    api_key: '842388283784946',
    api_secret: 'S29wX1Wd2y5oWt8rK0JWawt9u8o'
})

//POST image
router.post('/', (req,res) => {
    const values = Object.values(req.files)
    console.log('values', values)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    Promise
        .all(promises)
        .then(results => {
            console.log(results)
            res.status(200).json(results[0].url)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    
})

module.exports = router;