import { useState, useEffect } from "react";
import api from "../api";
import Graph from "../components/Graph"
import PublicNavBar from "../components/PublicNavBar"
import "../styles/GraphAlgorithmsHome.css"

function GraphAlgorithmsHome() {
    const [graphs, setGraphs] = useState([]);
    const [graphName, setGraphName] = useState("");

    useEffect(() => {
        getGraphs();
        console.log(graphs);
    }, []);


    const getGraphs = () => {
      api
          .get("/api/graphs/")
          .then((res) => res.data)
          .then((data) => {
              setGraphs(data);
              console.log(data);
          })
          .catch((err) => alert(err));
    };


    const deleteGraph = (id) => {
        api
            .delete(`/api/graphs/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Graph deleted!");
                else alert("Failed to delete graph.");
                getGraphs();
            })
            .catch((error) => alert(error));
    };


    const createGraph = (e) => {
        e.preventDefault();
        api
            .post("/api/graphs/", {name: graphName})
            .then((res) => {
                if (res.status !== 201) alert("Failed to make graph.");
                getGraphs();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
          <PublicNavBar />
          <div className="container">
            <div className="left">
              <h2>Create a Graph</h2>
              <center><p>*Add vertices and edges after creating a graph.</p></center>
              <form onSubmit={createGraph}>
              <label htmlFor="graphName">Graph Name:</label>
                <br />
                <input
                  type="text"
                  id="graphName"
                  name="graphName"
                  required
                  onChange={(e) => setGraphName(e.target.value)}
                  value={graphName}
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div className="right">
                <h2>Graphs</h2>
                <div style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                    {graphs.map((graph) => (
                        <Graph graph={graph} onDelete={deleteGraph} key={graph.id} />
                    ))}
                </div>
            </div>
          </div>
        </div>
      );
}

export default GraphAlgorithmsHome;