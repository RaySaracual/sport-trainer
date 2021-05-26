const { Router } = require('express');
const { createBriseo, uploadFileBriseo, getBriseo } = require('./controller.js')
const router = Router();

router.get('/', getBriseo);
router.post('/', createBriseo);
router.post('/upload', uploadFileBriseo);

module.exports = router;
