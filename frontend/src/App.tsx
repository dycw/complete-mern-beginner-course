import NoteComponent from "./components/Note";
import { Note as NoteModel } from "./models/note";
import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("http://localhost:5001/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <NoteComponent key={note._id} note={note} />
      ))}
    </div>
  );
}
