const express = require('express');
const router = express.Router();
const noteController = require('./noteController');

const authMiddleware = require('./authMiddleware'); 

router.post('/', authMiddleware.verifyToken, noteController.createNote);

router.get('/', authMiddleware.verifyToken, noteController.getAllNotes);
router.get('/:id', authMiddleware.verifyToken, noteController.getNoteById);
router.put('/:id', authMiddleware.verifyToken, noteController.updateNote);
router.delete('/:id', authMiddleware.verifyToken, noteController.deleteNote);

module.exports = router;
