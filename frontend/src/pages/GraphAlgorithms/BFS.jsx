import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import GraphCanvas from "../../components/GraphCanvas";
import ArraySlider from "../../components/ArraySlider";
import PublicNavBar from "../../components/PublicNavBar"
import "../../styles/ArrayVisualizer.css";


function privateBFS(graph, startVertex) {
    const grayVertices = [];
    const blackVertices = [];
    const queueStates = [];
    const vertexMap = new Map();
    for (const vertex of graph.vertices) {
      vertexMap.set(vertex.id, vertex);
    }
    const queue = [];
    grayVertices.push([startVertex.id]);
    blackVertices.push([]);
    queue.push(startVertex.id);
    //console.log("graph", graph);
    //console.log("startVertex", startVertex);
    //console.log("queue", queue);
    queueStates.push([...queue]);
    let visited = new Set();
    visited.add(startVertex);
    
    while (queue.length > 0) {
      let vertex = vertexMap.get(queue.shift());

      let neighbors = [];
      let currentGray = new Set(queue);
      let currentBlack = new Set(blackVertices[blackVertices.length - 1]);
      currentBlack.add(vertex.id);

      for (let i = 0; i < vertex.outgoing_edges.length; i++) {
        let edge = vertex.outgoing_edges[i];
        neighbors.push(edge.destination);
        if (!visited.has(edge.destination)) {
          queue.push(edge.destination);
          visited.add(edge.destination);
          currentGray.add(edge.destination);
        }
      }
      grayVertices.push(Array.from(currentGray));
      blackVertices.push(Array.from(currentBlack));
      queueStates.push([...queue]);
    }
    //console.log("grayVertices", grayVertices);
    //console.log("blackVertices", blackVertices);
    //console.log("queueStates", queueStates);
    return {
      grayVertices: grayVertices,
      blackVertices: blackVertices,
      queueStates: queueStates
  };
}

function BFS(){
    const location = useLocation();
    const [graph, setGraph] = useState(location.state?.graph || null);
    const [grayVertices, setGrayVertices] = useState([]);
    const [blackVertices, setBlackVertices] = useState([]);
    const [queueStates, setQueueStates] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const vertexMap = new Map();
    for (const vertex of graph?.vertices || []) {
      vertexMap.set(vertex.id, vertex);
    }


  useEffect(() => {
    getGraph(graph.id);
  }, []);

  useEffect(() => {
    if (graph) {
      console.log("graph", graph);
      const {grayVertices, blackVertices, queueStates} = privateBFS(graph, graph.vertices[3]);
      setGrayVertices(grayVertices);
      setBlackVertices(blackVertices);
      setQueueStates(queueStates);
      console.log("queueStates", queueStates);
    }
  }, [graph])

  const handleGraphUpdate = () => {
    getGraph(graph.id);
    console.log("graph", graph);
  };

  const getGraph = (id) => {
    api.get(`/api/graphs/${id}/`)
      .then((res) => {
        setGraph(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

    return (
        <div>
          <PublicNavBar />
          <div className="container">
            <div className="left-section">
                <h1>BFS</h1>
                <p>
                Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array.
                </p>
                <p>
                In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted.
                </p>
            </div>

            <div className="right-section">
                <div className="slider-section">
                    <ArraySlider
                    max={grayVertices.length - 1}
                    currentRow={currentRow}
                    setCurrentRow={setCurrentRow}
                    />
                </div>
                <div className="graph-section">
                    <GraphCanvas
                    graph={graph}
                    grayVertices={grayVertices[currentRow]}
                    blackVertices={blackVertices[currentRow]}
                    onGraphUpdate={handleGraphUpdate}
                    ></GraphCanvas>
                </div>
                <div>
                    {queueStates[currentRow] && queueStates[currentRow].length>0 && (
                        <table>
                            <tbody>
                                <tr>
                                    {queueStates[currentRow].map((cell, cellIndex) => (
                                        <td key={cellIndex}>
                                            {vertexMap.get(cell).value}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
          </div>
        </div>
      );

}

export default BFS