const fs = require("fs");
const notes = require("./db.json");
// const crimes = require('./state_crime.json')

const debug = (label, functionCall) => {
  console.log(label, functionCall);
};

// debug("All Notes: ", notes)

const isCompleted = (arr) => {
  const checker = notes.filter((category) => {
    return category.completed === true;
  });
  return checker;
};

const notCompleted = (arr) => {
  const filteredNotes = notes.filter(
    (noteElement) => noteElement.completed !== true
  );
  return filteredNotes;
};

const justNotes = (arr) => {
  const noteInfo = notes.map((noteElement) => {
    return noteElement.note;
  });
  return noteInfo;
};

const getNoteById = (idNumber) => {
  return notes.find((element) => element.id === Number(idNumber));
};

const getNoteIndexById = (idNumber) => {
  return notes.findIndex((element) => element.id === Number(idNumber));
};

const updateNoteById = (noteIndexNumber, newNote, newTitle) => {
  const noteDetails = notes[noteIndexNumber];
  noteDetails.note = newNote;
  noteDetails.title = newTitle;
  fs.writeFile("./src/db.json", JSON.stringify(notes), (err) => {
    console.log("Note Updated");
  });
  return noteDetails;
};

const addNotes = (note, title, allNotes) => {
  const noteElement = {
    id: allNotes.length === 0 ? 1 : allNotes[notes.length - 1].id + 1,
    date: Date(),
    completed: true,
    note,
    title,
  };
  allNotes.push(noteElement);
  const newNotes = JSON.stringify(allNotes);
  fs.writeFile("./src/db.json", newNotes, (err) => {
    console.log("New Note Added");
  });
};

const deleteNote = (noteIndex) => {
  notes.splice(noteIndex, 1);
  fs.writeFile("./src/db.json", JSON.stringify(notes), (err) => {
    console.log("Note Deleted");
  });
};

// debug("Incomplete Notes", notCompleted(notes))
// debug("Completed Notes",isCompleted(notes))
// debug("Just the Notes", justNotes(notes))
// debug("Added Note", addNotes("HelloWorld", "Notesssssss", notes))
// debug("ALL NOTES", notes)

// debug('Crimes', crimes.map(crime => {
//     debug('Crime', crime)
//     const data = {...crime.Data}
//     const rates = {...data.Rates}
//     const totals = {...data.Totals}
//     const newObj = {
//         state: crime.State,
//         ...data,
//         ...rates

//     }
//     delete newObj.Rates
//     return newObj
// }))

module.exports = {
  getNoteById,
  getNoteIndexById,
  updateNoteById,
  addNotes,
  deleteNote,
};
