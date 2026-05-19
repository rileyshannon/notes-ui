import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";

interface Note {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  setToken: (token: string | null) => void;
}

export default function Notes({ setToken }: Props) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editForm, setEditForm] = useState({ title: "", body: "" });

  useEffect(() => {
    api
      .get("/notes")
      .then((res) => setNotes(res.data))
      .catch(() => toast.error("Failed to load notes"));
  }, []);

  const handleSelect = (note: Note) => {
    setSelectedNote(note);
    setEditForm({ title: note.title, body: note.body ?? "" });
  };

  const handleCreate = async () => {
    try {
      const response = await api.post("/notes", {
        title: "New Note",
        body: null,
      });
      setNotes([response.data, ...notes]);
      handleSelect(response.data);
      toast.success("Note created successfully");
    } catch {
      toast.error("Failed to create note");
    }
  };

  const handleSave = async () => {
    if (!selectedNote) return;
    try {
      const response = await api.put(`/notes/${selectedNote.id}`, editForm);
      setNotes(
        notes.map((n) => (n.id === selectedNote.id ? response.data : n)),
      );
      setSelectedNote(response.data);
      toast.success("Note saved successfully");
    } catch {
      toast.error("Failed to save note");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
      if (selectedNote?.id === id) setSelectedNote(null);
      toast.success("Note deleted successfully");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">My Notes</h1>
          <button
            onClick={() => handleLogout()}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="p-3">
          <button
            onClick={handleCreate}
            className="w-full bg-sky-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            + New Note
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleSelect(note)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedNote?.id === note.id
                  ? "bg-sky-50 border-l-2 border-l-sky-600"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {note.title}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note.id);
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors text-xs ml-2 shrink-0"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {note.body ?? "No content"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="text-xl font-semibold text-gray-800 flex-1 focus:outline-none"
                placeholder="Note title"
              />
              <button
                onClick={handleSave}
                className="bg-sky-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors ml-4"
              >
                Save
              </button>
            </div>
            <textarea
              value={editForm.body}
              onChange={(e) =>
                setEditForm({ ...editForm, body: e.target.value })
              }
              className="flex-1 p-6 text-gray-700 text-sm focus:outline-none resize-none bg-gray-50"
              placeholder="Start writing..."
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-sm">
              Select a note to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
