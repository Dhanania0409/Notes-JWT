const Note = require('./Note'); 
const User = require('./user');

const notes = []; 

exports.createNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const note = new Note({
            user: userId,
            title: req.body.title,
            content: req.body.content
        });
        await note.save();

        res.status(201).json(note);
    } catch (error) {
        res.status(500).send('Error creating the note');
    }
};

exports.getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const userNotes = await Note.find({ user: userId });
        res.json(userNotes);
    } catch (error) {
        res.status(500).send('Error fetching notes');
    }
};

exports.getNoteById = async(req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to view this note');
        }
        res.json(note);
        }
     catch (error) {
        res.status(500).send('Error fetching the note');
    }
    
};

exports.updateNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send('Note not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to edit this note');
        }

        const { title, content } = req.body;
        note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        
        res.json(note);
    } catch (error) {
        res.status(500).send('Error updating the note');
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to delete this note');
        }

        await note.remove();
        res.status(200).send('Note deleted');
    } catch (error) {
        res.status(500).send('Error deleting the note');
    }
};