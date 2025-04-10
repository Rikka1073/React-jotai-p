import { useSetAtom } from "jotai";
import "./App.css";
import { useEffect } from "react";
import { Note } from "./domain/note";
import { notesAtom } from "./store";
import SideMenu from "./components/SideMenu";
import Edit from "./components/Edit";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const setNotes = useSetAtom(notesAtom);
  const initializeNotes = useQuery(api.notes.get);

  useEffect(() => {
    const notes = initializeNotes?.map(
      (note) => new Note(note._id, note.title, note.content, note.lastEditTime)
    );
    setNotes(notes || []);
  }, [initializeNotes, setNotes]);

  return (
    <>
      <div className="flex h-screen w-full bg-white">
        <SideMenu />
        <Edit />
      </div>
    </>
  );
}

export default App;
