import { useSetAtom } from "jotai";
import "./App.css";
import { useEffect } from "react";
import { Note } from "./domain/note";
import { notesAtom } from "./store";
import SideMenu from "./components/SideMenu";
import Edit from "./components/Edit";

function App() {
  const setNotes = useSetAtom(notesAtom);

  useEffect(() => {
    const noteDate = [
      new Note("1", "Note 1", "Contet 1", new Date().getTime()),
      new Note("2", "Note 2", "Contet 2", new Date().getTime()),
      new Note("3", "Note 3", "Contet 3", new Date().getTime()),
    ];
    setNotes(noteDate);
  }, []);

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
