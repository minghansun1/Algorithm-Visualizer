import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import api from "../api";
import PublicNavBar from "../components/PublicNavBar"
import GraphCanvas from "../components/GraphCanvas";
import "../styles/Graph.css";
import "../styles/GraphDetail.css"


function GraphDetail(){
    const location = useLocation();
    console.log("location state: ", location.state);
    const { graph } = location.state || { graph: null };
    const [vertices, setVertices] = useState([]);
    const [edges, setEdges] = useState([]);
    const [graphName, setGraphName] = useState("");

    const getNewGraph = () => {
        api.get(`/api/graphs/${graph.id}/`)
          .then((res) => {
            const data = res.data;
            setGraphName(data.name);
            setVertices(data.vertices);
            setEdges(data.edges);
          })
          .catch((error) => console.error("Error fetching data:", error));
      };

    useEffect(() => {
        if (graph) {
          getNewGraph();
        }
    }, [graph]);
    /*
    const addVertex = (e) => {
        e.preventDefault();
        const newVertex = {
            id: vertices.length + 1,
            name: `${vertices.length + 1}`,
            x: 0,
            y: 0,
        };
        api
            .post(`/api/graphs/${graph.id}`, newVertex)
            .then((res) => {
                if (res.status !== 201) alert("Failed to add vertex.");
                getNewGraph();
            })
            .catch((err) => alert(err));
    }

    const deleteVertex = (vertexId) => {
        api
            .delete(`/api/graphs/${graph.id}/vertex/${vertexId}`)
            .then((res) => {
                if (res.status !== 204) alert("Failed to delete vertex.");
                getNewGraph();
            })
            .catch((err) => alert(err));
    }
    */

    return <div>
        <PublicNavBar></PublicNavBar>
        <h1>Graph Detail</h1>
        <div className="container">
            <div className="left-section">
                <GraphCanvas graph={graph}></GraphCanvas>
            </div>
            <div className="right-section">
                <div className="algorithm-container">
                <p>filler</p>
                </div>
            </div>
        </div>
    </div>
}

export default GraphDetail