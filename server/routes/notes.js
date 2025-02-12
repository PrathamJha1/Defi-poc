const express = require("express");
const app = express.Router(); // Corrected: Added parentheses

let notes = [];
let id = 0;


// Middleware to parse JSON request bodies
app.use(express.json()); // Important for handling POST/PUT data

// Retrieve all notes
app.get("/", (req, res) => {
  try {
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new note
app.post("/", (req, res) => {
  try {
    const { title, description } = req.body;
    if (title && description) {
      notes.push({ id: id++, title, desc: description });
      return res.status(201).json({ message: "Note created successfully" });
    }
    return res.status(400).json({ message: "Title or description not found" });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Retrieve a specific note by ID
app.get("/:id", (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const foundNote = notes.find((n) => n.id === noteId);
    if (foundNote) {
      return res.status(200).json(foundNote);
    } else {
      return res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error retrieving note:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a specific note by ID
app.put("/:id", (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const { title, description } = req.body;
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex !== -1) {
      notes[noteIndex] = {
        id: notes[noteIndex].id,
        title: title || notes[noteIndex].title,
        desc: description || notes[noteIndex].desc,
      };
      return res.status(200).json({ message: "Note updated successfully" });
    } else {
      return res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a specific note by ID
app.delete("/:id", (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const noteExists = notes.some((n) => n.id === noteId);

    if (noteExists) {
      notes = notes.filter((n) => n.id !== noteId);
      return res.status(200).json({ message: "Note has been deleted" });
    } else {
      return res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;
