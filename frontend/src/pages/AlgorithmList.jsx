import { Link } from "react-router-dom";
import PublicNavBar from "../components/PublicNavBar"
import "../styles/AlgorithmList.css"

function AlgorithmList(){
    return <div>
        <PublicNavBar></PublicNavBar>
        <center><h1>Algorithms</h1></center>
        <div className="container">
            <div className="left-section">
                <h2>Array Algorithms</h2>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/mergesort"}>Merge Sort</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/quicksort"}>Quick Sort</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/binarysearch"}>Binary Search</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/countinginversions"}>Counting Inversions</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/quickselect"}>Quick Select</Link>
                    </p>
                </div>
            </div>
            <div className="right-section">
                <h2>Graph Algorithms</h2>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/dijkstra"}>Dijkstra's Algorithm</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={"/algorithm-list/prim"}>Prim's Algorithm</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default AlgorithmList