import { useAtom } from "jotai";
import { notesAtom } from "../store";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Note } from "../domain/note";

const SideMenu = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const createNote = useMutation(api.notes.create);
  const deleteNote = useMutation(api.notes.deleteNote);

  const handleCreateNote = async () => {
    const noteId = await createNote({
      title: "New Note",
      content: "",
    });

    const newNote = new Note(noteId, "New Note", "", Date.now());
    setNotes([...notes, newNote]);
  };

  const handleDleteNote = async (noteId: Id<"notes">) => {
    await deleteNote({ noteId });
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2>notes</h2>
        <button onClick={handleCreateNote}>+</button>
        <div>
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-2 mb-2 rounded cursor-pointer flex justify-between items-center group"
            >
              <div className="flex-1 min-w-0">
                <input type="text" className="bg-gray-100" />
                <p>
                  {note.lastEditTime
                    ? new Date(note.lastEditTime).toLocaleDateString()
                    : "Never edited"}
                </p>
              </div>
              <button onClick={() => handleDleteNote(note.id)}>-</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
