import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PublicNavBar from "../../components/PublicNavBar"
import ArraySlider from "../../components/ArraySlider";
import "../../styles/ArrayDivideAndConquerRender.css";

function privateCountingInversions (array) {
    const steps = [];
    const tempArrays = [];
    const split_indices = [];
    const split_count = [];
    const currTempArray = [];
    const currSplitIndices = [];
    const currSplitCount = [0];

    function mergeAndCount(arr, l, m, r){
        let left = [];
        for(let i = l; i < m + 1; i++){
            left.push(arr[i]);
        }
        let right = [];
        for(let i = m + 1; i < r + 1; i++){
            right.push(arr[i]);
        }
        let i = 0, j = 0, k = l, swaps = 0;
        while (i < left.length && j < right.length){
            if (left[i] <= right[j]){
                currTempArray.push(left[i]);
                arr[k++] = left[i++];
            }
            else{
                currTempArray.push(right[j]);
                arr[k++] = right[j++];
                swaps += (m + 1) - (l + i);
            }
            steps.push([...arr]);
            tempArrays.push([...currTempArray]);
            split_indices.push([...currSplitIndices].sort((a,b) => a - b));
            split_count.push([...currSplitCount]);
        }
        while (i < left.length){
            arr[k++] = left[i++];
            steps.push([...arr]);
            tempArrays.push([...currTempArray]);
            split_indices.push([...currSplitIndices].sort((a,b) => a - b));
            split_count.push([...currSplitCount]);
        }
        while (j < right.length){
            arr[k++] = right[j++];
            steps.push([...arr]);
            tempArrays.push([...currTempArray]);
            split_indices.push([...currSplitIndices].sort((a,b) => a - b));
            split_count.push([...currSplitCount]);
        }
        while(currTempArray.length > 0){
            currTempArray.pop();
        }
        return swaps;
    }

    function mergeSortAndCount(arr, l, r){
        let count = 0;
        steps.push([...arr]);
        tempArrays.push([...currTempArray]);
        split_indices.push([...currSplitIndices].sort((a,b) => a - b));
        split_count.push([...currSplitCount]);
        if (l < r) 
        {
            let m = Math.floor((l + r) / 2);
            currSplitIndices.push(m);
            const c1 = mergeSortAndCount(arr, l, m);
            const c2 = mergeSortAndCount(arr, m + 1, r);
            const c3 = mergeAndCount(arr, l, m, r)
            count += c1+c2+c3;
            currSplitCount.pop();
            currSplitCount.pop();
            currSplitCount.push(c1+c2+c3)
            currSplitIndices.pop();
        } else {
            currSplitCount.push(0);
        }
        return count;
    }

    let arrCopy = [...array];
    const count = mergeSortAndCount(arrCopy, 0, arrCopy.length-1);
    steps.push([...arrCopy]);
    tempArrays.push([...currTempArray]);
    split_indices.push([...currSplitIndices].sort((a,b) => a - b));
    split_count.push([...currSplitCount]);
    return { count, steps, tempArrays, split_indices, split_count };
}


function splitArray(arr, splitIndices) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let currentArray = arr[i];
        let indices = splitIndices[i];
        let splitArray = [];
        let start = 0;

        for (let j = 0; j < indices.length; j++) {
            let end = indices[j] + 1;
            splitArray.push(currentArray.slice(start, end));
            start = end;
        }

        // Push the remaining part of the array
        if (start < currentArray.length) {
            splitArray.push(currentArray.slice(start));
        }

        result.push(splitArray);
    }

    return result;
}


function CountingInversions(){
    const location = useLocation();
    const { array } = location.state || { array: null };
    const [result, setResult] = useState("");
    const [steps, setSteps] = useState([]);
    const [subArrays, setSubArrays] = useState([]);
    const [tempArrays, setTempArrays] = useState([]);
    const [splitIndices, setSplitIndices] = useState([]);
    const [splitCount, setSplitCount] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (array) {
            getCountedInversions();
        }
    }, []);

    const getCountedInversions = () => {
        console.log(array.values);
        const { count, steps, tempArrays, split_indices, split_count } = privateCountingInversions(array.values);
        setResult(count);
        setSteps(steps);
        setTempArrays(tempArrays);
        setSplitIndices(split_indices);
        setSplitCount(split_count);
        console.log(count);
        console.log(steps);
        console.log(tempArrays);
        console.log(split_indices);
        console.log(split_count);
    };

    useEffect(() => {
        if (steps.length > 0 && splitIndices.length > 0) {
            setSubArrays(splitArray(steps, splitIndices));
        }
    }, [steps, splitIndices]);

    useEffect(() => {
        console.log("subArray results:", subArrays);
    }, [subArrays]);


    return (
        <div>
            <PublicNavBar />
            <div className="container">
                <div className="left-section">
                    <h1>Counting Inversions</h1>
                    <p>
                        Use Merge sort with modification that every time an unsorted pair is found increment count by one and return count at the end.
                    </p>
                </div>
                <div className="right-section">
                    <div className="slider-section">
                        <ArraySlider
                        max={steps.length-1}
                        currentRow={currentStep}
                        setCurrentRow={setCurrentStep}
                        />
                    </div>
                        <div className="array-section">
                            <div className="row">
                            {subArrays[currentStep]?.map((subArray, subIndex) => (
                                <div key={subIndex} className="subarray-container">
                                    <table className="subarray-table">
                                        <tbody>
                                            <tr>
                                                {subArray.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="split-count">
                                        ({splitCount[currentStep]?.[subIndex+1]})
                                    </div>
                                </div>
                            ))}
                        </div>
                        <table>
                            <tr>
                                {tempArrays[currentStep]?.map((temp, tempIndex) => (
                                    <td key={tempIndex}>
                                        {temp}
                                    </td>
                                ))}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
         </div>
    );
}

export default CountingInversions