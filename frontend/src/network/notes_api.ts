import { Note } from "../models/note";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5001/api/users", {
    method: "GET",
  });
  return response.json();
}

export type SignUpCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5001/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export type LoginCredentials = {
  username: string;
  password: string;
};

export async function logIn(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5001/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logOut() {
  await fetchData("http://localhost:5001/api/users/logout", { method: "POST" });
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:5001/api/notes", {
    method: "GET",
  });
  return response.json();
}

export type NoteInput = { title: string; text?: string };

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData("http://localhost:5001/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `http://localhost:5001/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`http://localhost:5001/api/notes/${noteId}`, {
    method: "DELETE",
  });
}
