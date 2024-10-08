import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import ArraySlider from "../../components/ArraySlider";
import PublicNavBar from "../../components/PublicNavBar"
import "../../styles/ArrayDivideAndConquerRender.css";
import "../../styles/ArrayVisualizer.css";

function MergeSort() {
    const location = useLocation();
    const { array } = location.state || { array: null };
    const [values, setValues] = useState([]);
    const [splitIndices, setSplitIndices] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [subArrays, setSubArrays] = useState([]);

    useEffect(() => {
        getMergeSortArray();
    }, []);

    const getMergeSortArray = () => {
        api.get(`/api/arrays/mergesort/${array.id}/`)
            .then((res) => res.data)
            .then((data) => {
                setValues(data.steps);
                setSplitIndices(data.split_indices);
                setSubArrays(splitArray(data.steps, data.split_indices));
                console.log(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const splitArray = (array, splitIndices) => {
        let result = [];
        let tempArray = [];
        let tempRow = [];

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                tempArray.push(array[i][j]);
                if (splitIndices[i][j] === 1 || j === array[i].length - 1) {
                    tempRow.push(tempArray);
                    tempArray = [];
                }
            }
            result.push(tempRow);
            tempRow = [];
        }
        return result;
    };

    if (!array) return <div>Array not found</div>;

    return (
        <div>
          <PublicNavBar />
          <div className="container">
            <div className="left-section">
                <h1>Merge Sort</h1>
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
                  max={subArrays.length - 1}
                  currentRow={currentRow}
                  setCurrentRow={setCurrentRow}
                />
              </div>
              <div className="array-section">
                <div className="row">
                  {subArrays[currentRow]?.map((subArray, subIndex) => (
                    <table key={subIndex} className="subarray-table">
                      <tbody>
                        <tr>
                          {subArray.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MergeSort;
