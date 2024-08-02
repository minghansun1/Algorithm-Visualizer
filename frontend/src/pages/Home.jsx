import { useState, useEffect } from "react";
import api from "../api";
import Array from "../components/Array"
import PublicNavBar from "../components/PublicNavBar"
import "../styles/Home.css"

function Home() {
    const [arrays, setArrays] = useState([]);
    const [arrayContent, setArrayContent] = useState("");
    const [arrayName, setArrayName] = useState("");

    useEffect(() => {
        getArrays();
    }, []);

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
                if (res.status !== 201) alert("Failed to make array.");
                getArrays();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
          <PublicNavBar />
          <div className="container">
            <div className="left">
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
                <br />
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
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div className="right">
                <h2>Arrays</h2>
                <div style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                    {arrays.map((array) => (
                        <Array array={array} onDelete={deleteArray} key={array.id} />
                    ))}
                </div>
            </div>
          </div>
        </div>
      );
}

export default Home;