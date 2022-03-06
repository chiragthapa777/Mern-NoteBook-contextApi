const router = require("express").Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

//get the notes of logged in user;
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.send(notes);
});

//add notes
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "title length much be atleast 1").isLength({ min: 1 }),
    body("description", "title length much be atleast 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.status(200).json(savedNote);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

//update
router.put(
  "/updatenote/:id",
  fetchUser,
  //   [
  //     body("title", "title length much be atleast 1").isLength({ min: 1 }),
  //     body("description", "title length much be atleast 5").isLength({ min: 5 }),
  //   ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //   const errors = validationResult(req);
      //   if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() });
      //   }
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //check if note is of user
      let note=await Note.findById(req.params.id);
      if(!note) return res.status(400).send("Note not found")
      if(note.user.toString() !== req.user.id) return res.status(400).send("Not authorized")

      //find the note to be updated
      note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
      res.json(note)
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);


//deleting the note 
router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
    try {
      //check if note is of user
      let note = await Note.findById(req.params.id);
      if(!note) return res.status(400).send("Note not found")
      if(note.user.toString() !== req.user.id) return res.status(400).send("Not authorized")

      //find the note to be delete
      note = await Note.findByIdAndDelete(req.params.id)
      res.json({message:"note has been deleted",note})
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

module.exports = router;
