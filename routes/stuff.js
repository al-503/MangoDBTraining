const express = require('express');
const router = express.Router();

const stuffController = require("../controllers/stuff.js")

router.post('/', stuffController.createThing);
router.get('/:id', stuffController.readOneStuff);
router.put('/:id', stuffController.updateOneStuff);
router.delete('/:id', stuffController.deleteOneStuff);
router.get('/' + '', stuffController.readAllStuff);

module.exports = router;