import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams, Link } from "react-router-dom";
import api from "../api";
import PublicNavBar from "../components/PublicNavBar"
import "../styles/Graph.css";
import "../styles/GraphDetail.css"

function GraphCanvas({graph}){
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mode, setMode] = useState('add_vertex'); // Modes: 'add_vertex', 'delete_vertex', 'update_vertex', 'add_edge', 'delete_edge', 'update_edge'
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentValue, setCurrentValue] = useState('');
  const [currentVertex, setCurrentVertex] = useState(null);
  const [draggingVertex, setDraggingVertex] = useState(null);
  const [selectedVertices, setSelectedVertices] = useState([]);
  const canvasRef = useRef(null);
  const formRef = useRef(null);


  useEffect(() => {
    getVertices();
    getEdges();
  }, []);

  useEffect(() => {
    drawVertices();
    drawEdges();
  }, [vertices, edges]);



  const handleCanvasMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    if (mode === 'update_vertex') {
      let vertexFound = false;
      vertices.forEach((vertex, index) => {
        const distance = Math.sqrt((vertex.x - x) ** 2 + (vertex.y - y) ** 2);
        if (distance <= 20 && !vertexFound) {
          setDraggingVertex(index);
          vertexFound = true;
          //console.log('Starting drag');
        }
      });
    };
  };


  useEffect(() => {
    const handleMouseMove = (event) => {
      if (draggingVertex !== null) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        setVertices((prevVertices) =>
          prevVertices.map((vertex, index) =>
            index === draggingVertex ? { ...vertex, x, y } : vertex
          )
        );
      }
    };

    const handleMouseUp = (event) => {
      if (draggingVertex !== null) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        //console.log('Stopping drag, setting draggingVertex to null');
        //console.log(vertices[draggingVertex]);
        updateVertex(vertices[draggingVertex].id, vertices[draggingVertex].value, x, y);
        setDraggingVertex(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingVertex]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        canvasRef.current &&
        !canvasRef.current.contains(event.target)
      ) {
        setCurrentPosition(null);
        setCurrentValue('');
        setCurrentVertex(null);
        //console.log('Clicked outside form');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);


  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
  
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
  
    let closestVertex = null;
    let minDistance = Infinity;
  
    vertices.forEach((vertex, index) => {
      const distance = Math.sqrt((vertex.x - x) ** 2 + (vertex.y - y) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestVertex = { vertex, index };
      }
    });
  
    if (mode === 'add_vertex') {
      const vertexTooClose = minDistance <= 40;
      setCurrentPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    } else if (mode === 'delete_vertex') {
      if (closestVertex && minDistance <= 20) {
        deleteVertex(closestVertex.vertex.id);
      } else {
        //console.log("No vertex found at click position.");
      }
    } else if (mode === 'update_vertex') {
      if (closestVertex && minDistance <= 20) {
        setCurrentPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        setCurrentValue(closestVertex.vertex.value);
        setCurrentVertex(closestVertex.index);
      } else {
        setCurrentPosition(null);
        setCurrentValue('');
        setCurrentVertex(null);
      }
    } else if (mode === 'add_edge') {
      if (closestVertex && minDistance <= 20) {
        let prevSelected = selectedVertices;
        if (prevSelected[0]!==undefined && prevSelected.length === 1 && prevSelected[0] !== closestVertex.index) {
          setSelectedVertices([prevSelected[0], closestVertex]);
          setCurrentPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        } else {
          setSelectedVertices([closestVertex]);
        }
      }
    } else if (mode === 'delete_edge') {
    edges.forEach(edge => {
      const vertex1 = vertices.find(vertex => vertex.id === edge.source);
      const vertex2 = vertices.find(vertex => vertex.id === edge.destination);

      if (vertex1 && vertex2) {
        const threshold = 6;
        if (isPointNearLine(x, y, vertex1.x, vertex1.y, vertex2.x, vertex2.y, threshold)) {
          deleteEdge(edge.id);
        }
      }
    });
  }
  };
  
  
  const getVertices = () => {
    api.get(`/api/graphs/${graph.id}/vertices/`)
      .then((res) => {
        const data = res.data;
        setVertices(data);
      }).catch((error) => console.error("Error fetching data:", error));
  }


  const getEdges = () => {
    api.get(`/api/graphs/${graph.id}/edges/`)
      .then((res) => {
        const data = res.data;
        setEdges(data);
      }).catch((error) => console.error("Error fetching data:", error));
  };


  const addVertex = (currentValue, x, y) => {
    //console.log(currentValue, Math.round(x), Math.round(y));
    api
        .post(`/api/graphs/${graph.id}/vertices/`, {value: currentValue, x: Math.round(x), y: Math.round(y)})
        .then((res) => {
            if (res.status == 201){
              setVertices([...vertices, res.data]);
            } else {
              alert("Failed to add vertex.");
            }
        })
        .catch((err) => alert(err));
  }

  const deleteVertex = (vertexId) => {
    // Find and delete all edges connected to the vertex
    const edgesToDelete = edges.filter(edge => edge.source === vertexId || edge.destination === vertexId);
  
    const deleteEdgeRequests = edgesToDelete.map(edge =>
      api.delete(`/api/graphs/${graph.id}/edges/delete/${edge.id}/`)
    );
  
    Promise.all(deleteEdgeRequests)
      .then((responses) => {
        const failedDeletes = responses.filter(res => res.status !== 204);
        if (failedDeletes.length > 0) {
          alert("Failed to delete one or more edges.");
          return;
        }
  
        // Now delete the vertex
        api.delete(`/api/graphs/${graph.id}/vertices/delete/${vertexId}/`)
          .then((res) => {
            if (res.status === 204) {
              setEdges(prevEdges => prevEdges.filter(edge => edge.source !== vertexId && edge.destination !== vertexId));
              setVertices(prevVertices => prevVertices.filter(vertex => vertex.id !== vertexId));
            } else {
              alert("Failed to delete vertex.");
            }
          })
          .catch((err) => alert("Error deleting vertex: " + err));
      })
      .catch((err) => alert("Error deleting edges: " + err));
  };

  const updateVertex = (vertexId, value, x, y) => {
    //console.log(vertexId, value, Math.round(x), Math.round(y));
    api
        .put(`/api/graphs/${graph.id}/vertices/update/${vertexId}/`, {value: value, x: Math.round(x), y: Math.round(y)})
        .then((res) => {
            if (res.status === 200) {
              setVertices(vertices.map((vertex) => {
                if (vertex.id === vertexId) {
                  return res.data;
                } else {
                  return vertex;
                }
              }));
            } else {
              alert("Failed to update vertex.");
            }
        })
        .catch((err) => alert(err));
  }


  const addEdge = (currentWeight, vertex1, vertex2) => {
    //console.log("vertices", vertex1, vertex2);
    api
      .post(`/api/graphs/${graph.id}/edges/`, { weight: currentWeight, source: vertex1.id, destination: vertex2.id })
      .then((res) => {
        if (res.status === 201) {
          setEdges([...edges, res.data]);
          //console.log("edges:", edges);
        } else {
          alert("Failed to add edge.");
        }
      })
      .catch((err) => alert(err));
  };
    

  const deleteEdge = (edgeId) => {
    api
      .delete(`/api/graphs/${graph.id}/edges/delete/${edgeId}/`)
      .then((res) => {
        if (res.status === 204) {
          console.log("Deleted edge", edgeId);
          console.log("edges:", edges);
          setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
          console.log("edges:", edges);
        } else {
          alert("Failed to delete edge.");
        }
      })
      .catch((err) => alert(err));
  };


  const drawVertices = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vertices.forEach((vertex) => {
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, 20, 0, 2 * Math.PI); // 20 is the radius
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();

      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(vertex.value, vertex.x, vertex.y);
    });
  };


  const drawEdges = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    edges.forEach(edge => {
      const vertex1 = vertices.find(vertex => vertex.id === edge.source);
      const vertex2 = vertices.find(vertex => vertex.id === edge.destination);
  
      if (vertex1 && vertex2) {
        const dx = vertex2.x - vertex1.x;
        const dy = vertex2.y - vertex1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
  
        // Normalize direction vector
        const unitDx = dx / length;
        const unitDy = dy / length;
  
        // Calculate the new start and end points, 20 pixels away from each vertex
        const startX = vertex1.x + unitDx * 20;
        const startY = vertex1.y + unitDy * 20;
        const endX = vertex2.x - unitDx * 20;
        const endY = vertex2.y - unitDy * 20;
  
        // Draw line
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
  
        // Draw arrowhead
        const arrowLength = 10;
        const arrowWidth = 5;
        const angle = Math.atan2(dy, dx);
  
        context.beginPath();
        context.moveTo(endX, endY);
        context.lineTo(
          endX - arrowLength * Math.cos(angle - Math.PI / 6),
          endY - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        context.moveTo(endX, endY);
        context.lineTo(
          endX - arrowLength * Math.cos(angle + Math.PI / 6),
          endY - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        context.stroke();
  
        // Draw weight with an offset to avoid covering the line
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const offsetX = -10 * Math.sin(angle); // perpendicular offset
        const offsetY = 10 * Math.cos(angle);  // perpendicular offset
        context.font = '14px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(edge.weight, midX + offsetX, midY + offsetY);
      }
    });
  };  
  
  const isPointNearLine = (x, y, x1, y1, x2, y2, threshold) => {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
  
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    const param = len_sq !== 0 ? dot / len_sq : -1;
  
    let xx, yy;
  
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
  
    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  };


  const handleValueSubmit = () => {
    const { x, y } = currentPosition;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (currentValue === '' || isNaN(parseInt(currentValue))) {
      return;
    }
    if (mode === 'add_vertex' && currentPosition) {
      addVertex(currentValue, x * scaleX, y * scaleY);
      setCurrentPosition(null);
      setCurrentValue('');
      setDraggingVertex(null);
    } else if (mode === 'update_vertex' && currentPosition) {
      updateVertex(vertices[currentVertex].id, currentValue, x * scaleX, y * scaleY);
      setCurrentVertex(null);
      setCurrentPosition(null);
      setCurrentValue('');
      setDraggingVertex(null);
    } else if (mode === 'add_edge' && currentPosition) {
      addEdge(currentValue, selectedVertices[0].vertex, selectedVertices[1].vertex);
      setCurrentPosition(null);
      setCurrentValue('');
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setMode('add_vertex')}>Add Vertex</button>
        <button onClick={() => setMode('delete_vertex')}>Delete Vertex</button>
        <button onClick={() => setMode('update_vertex')}>Update Vertex</button>
        <button onClick={() => setMode('add_edge')}>Add Edge</button>
        <button onClick={() => setMode('delete_edge')}>Delete Edge</button>
        <button onClick={() => setMode('update_edge')}>Update Edge</button>
      </div>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{ border: '1px solid black' }}
          onMouseDown={handleCanvasMouseDown}
          onClick={handleCanvasClick}
        />
        {currentPosition && (
          <form ref={formRef} style={{
            position: 'absolute',
            left: currentPosition.x,
            top: currentPosition.y,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '10px',
            zIndex: 1000
          }}>
            <p>{currentPosition.x}, {currentPosition.y}</p>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder="Enter value"
              required
              pattern="\d+"
              title="Please enter a valid integer value."
            />
            <button type="button" onClick={handleValueSubmit}>Submit</button>
            <button type="button" onClick={() => {
              setCurrentPosition(null);
              setCurrentValue('');
              setCurrentVertex(null);
            }}>Cancel</button>
          </form>
        )}
      </div>
      
    </div>
  );
};

export default GraphCanvas;