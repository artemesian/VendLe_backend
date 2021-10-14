const express = require('express')
const router = express.Router();
const country= require('../controllers/country_controller')



router.post('/country/create',country.createCountry)
router.get('/country',country.findCountry)
router.get('/country/:name',country.findOneCountry)//name dans le body
router.put('/country/:name',country.updateOneCountry)
router.delete('/country/:name',country.deleteOneCountry)
router.post('/country',country.loadData)


module.exports= router;