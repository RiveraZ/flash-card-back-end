const express = require("express");
const app = express();
const cors = require("cors");
const notes = require("./db.json");
const PORT = 3001;
const fs = require("fs");
const {
  addNotes,
  getNoteById,
  getNoteIndexById,
  updateNoteById,
  deleteNote,
} = require("./utils");

app.use(cors());
app.get("/notes", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("sending notes");
  res.send(notes);
});

app.get("/note/:id", (req, res) => {
  // grab all notes from current db
  const idNumber = req.params.id;
  // store our id parameter in variable
  const note = getNoteById(idNumber);
  // search our notes by that id to find the note to send
  res.send(note ? note : "No note found.");
  // send that note
});

app.patch("/note/:id", (req, res) => {
  // use the given id to find the note
  const idNumber = req.params.id;
  const newNote = req.query.note;
  const newTitle = req.query.title;

  console.log("++++++ Patching", newTitle, newNote);
  if (!newTitle) {
    throw new Error("Title Required");
  }
  if (!newNote) {
    throw new Error("Note Required");
  }
  // replace note in the array with new note
  const noteIndex = getNoteIndexById(idNumber);
  if (noteIndex < 0) {
    res.send("Note not found");
  }
  // save note and title to database
  const noteDetails = updateNoteById(noteIndex, newNote, newTitle);
  res.send(noteDetails);
});

app.post("/new_note", (req, res) => {
  // res.set("Access-Control-Allow-Origin", "http://localhost:3000")
  const title = req.query.title;
  const note = req.query.note;
  console.log("+++", note, title);
  if (!note) {
    throw new Error("Note is required");
  }
  if (!title) {
    throw new Error("Title is required");
  }

  addNotes(note, title, notes);
  res.send("Saved it for ya");
});

app.delete("/note/:id", (req, res) => {
  // indentify the objects position in the array
  const idNumber = req.params.id;
  const noteIndex = notes.findIndex(
    (element) => element.id === Number(idNumber)
  );
  // remove object from array
  deleteNote(noteIndex);
  res.send("Took out the trash");
  // confirm deletion
});

app.listen(PORT, () => {
  console.log("App is running", PORT);
});
