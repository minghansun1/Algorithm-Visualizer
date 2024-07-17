import { useState, useEffect } from "react";
import api from "../api";
{/*import Note from "../components/Note"*/}
import Array from "../components/Array"
import PublicNavBar from "../components/PublicNavBar"
import "../styles/Home.css"

function Home() {
    {/* const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState(""); */}
    const [arrays, setArrays] = useState([]);
    const [arrayContent, setArrayContent] = useState("");
    const [arrayName, setArrayName] = useState("");

    useEffect(() => {
        {/*getNotes();*/}
        getArrays();
    }, []);

    {/*
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
    */}
    const getArrays = () => {
        api
            .get("/api/arrays/")
            .then((res) => res.data)
            .then((data) => {
                setArrays(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteArray = (id) => {
        api
            .delete(`/api/arrays/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Array deleted!");
                else alert("Failed to delete array.");
                getArrays();
            })
            .catch((error) => alert(error));
    };

    const createArray = (e) => {
        e.preventDefault();
        const values = arrayContent.split(',').map(value => {
            const parsedValue = parseInt(value.trim(), 10);
            if (isNaN(parsedValue)) {
                alert(`"${value.trim()}" is not a valid number`);
                return;
            }
            return parsedValue;
        });

        const filteredValues = values.filter(value => value !== undefined);

        if (filteredValues.length === 0) {
            alert("No valid numbers to create an array.");
            return;
        }

        api
            .post("/api/arrays/", {name: arrayName, values})
            .then((res) => {
                if (res.status === 201) alert("Array created!");
                else alert("Failed to make array.");
                getArrays();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <PublicNavBar></PublicNavBar>
            <div>
                {/*
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
                */}
                <h2>Arrays</h2>
                {arrays.map((array) => (
                    <Array array={array} onDelete={deleteArray} key={array.id} />
                ))}
            </div>
            {/*
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            */}
            <h2>Create an Array</h2>
            <form onSubmit={createArray}>
                <label htmlFor="arrayName">Name:</label>
                <br />
                <input
                    type="text"
                    id="arrayName"
                    name="arrayName"
                    required
                    onChange={(e) => setArrayName(e.target.value)}
                    value={arrayName}
                />
                <label htmlFor="arrayContent">Values (comma separated integers):</label>
                <br />
                <textarea
                    id="arrayContent"
                    name="arrayContent"
                    required
                    value={arrayContent}
                    onChange={(e) => setArrayContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;