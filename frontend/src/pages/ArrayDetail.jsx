import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import api from "../api";
import "../styles/Array.css";
import PublicNavBar from "../components/PublicNavBar"
import "../styles/ArrayDetail.css"

function ArrayDetail() {
    const location = useLocation();
    const { array } = location.state || { array: null };
    const [arrayContent, setArrayContent] = useState(array.values.join(", "));

    const getNewArray = () => {
        api.get(`/api/arrays/${array.id}/`)
            .then((res) => {
                setArrayContent(res.data.values.join(", "));
                array.values = res.data.values;
            })
            .catch((error) => console.error("Error fetching data:", error));
        console.log(arrayContent);
    }
    
    useEffect(() => {
        if (array) {
          getNewArray();
        }
    }, [array]);

    const updateArray = (e) => {
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
            .put(`/api/arrays/update/${array.id}/`, {name: array.name, values})
            .then((res) => {
                if (res.status !== 200) alert("Failed to update array.");
                getNewArray();
            })
            .catch((err) => alert(err));
    };

    if (!array) return <div>Array not found</div>;

    return (
        <div>
            <PublicNavBar></PublicNavBar>
            <h1>Array Detail</h1>
            <div >
                <form className="array-container" onSubmit={updateArray}>
                    <h2 className="array-title">{array.name}</h2>
                    <p className="array-content">{arrayContent}</p>
                    <input
                        type="text"
                        value={arrayContent}
                        onChange={(e) => setArrayContent(e.target.value)}
                        placeholder="New Content"
                    />
                    <button className="form-button" type="submit">Update Array</button>
                </form>
            </div>
            <div className="algorithm-list-container">
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={`/array/${array.id}/mergesort`} state={{ array }}>Merge Sort</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                    <Link to={`/array/${array.id}/quicksort`} state={{ array }}>Quick Sort</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={`/array/${array.id}/binarysearch`} state={{ array }}>BinarySearch</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                    <Link to={`/array/${array.id}/countinginversions`} state={{ array }}>Counting Inversions</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                    <Link to={`/array/${array.id}/quickselect`} state={{ array }}>QuickSelect</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArrayDetail;
