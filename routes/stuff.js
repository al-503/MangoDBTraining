const express = require('express');
const auth = require('../middleware/auth'); // a rajouter a toute les routes que l'on veut proteger
const router = express.Router();

const stuffController = require("../controllers/stuff")

router.post('/', auth, stuffController.createThing);
router.get('/:id', auth, stuffController.readOneStuff);
router.put('/:id', auth, stuffController.updateOneStuff);
router.delete('/:id', auth, stuffController.deleteOneStuff);
router.get('/', auth, stuffController.readAllStuff);

module.exports = router;