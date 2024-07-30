import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import PublicNavBar from "../../components/PublicNavBar"
import ArraySlider from "../../components/ArraySlider";

function privateQuickSort(array) {
    const steps = [];
    const pivots = [];
    const allPivots = new Array(array.length).fill(0);


    function partition(arr, low, high) {
        const pivot = arr[high];
        allPivots[high] = 1;
        steps.push(structuredClone(arr));
        pivots.push(structuredClone(allPivots));
        
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                if(i!=j){
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    [allPivots[i],allPivots[j]] = [allPivots[j], allPivots[i]]
                    steps.push(structuredClone(arr));
                    pivots.push(structuredClone(allPivots));
                }
            }
        }
        if (i+1 != high) {
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            [allPivots[i+1],allPivots[high]] = [allPivots[high], allPivots[i+1]]
            pivots.push(structuredClone(allPivots));
            steps.push(structuredClone(arr));
        }
        return i + 1;
    }

    function quickSortRecursive(arr, low, high) {
        if (low <= high) {
            let pi = partition(arr, low, high);
            quickSortRecursive(arr, low, pi - 1);
            quickSortRecursive(arr, pi + 1, high);
        }
    }

    let arrCopy = [...array];
    quickSortRecursive(arrCopy, 0, arrCopy.length - 1);
    return { steps, pivots };
}

function QuickSort(){
    const location = useLocation();
    const { array } = location.state || { array: null };
    const [steps, setSteps] = useState([]);
    const [pivots, setPivots] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (array) {
            getQuickSortArray();
        }
    }, [])
    
    const getQuickSortArray = () => {
        const { steps, pivots } = privateQuickSort(array.values);
        console.log(steps, pivots)
        setSteps(steps);
        setPivots(pivots);
    };

    return (
        <div>
            <PublicNavBar />
            <h1>QuickSort</h1>
            {steps.length > 0 && (
                <ArraySlider
                    max={steps.length - 1}
                    currentRow={currentStep}
                    setCurrentRow={setCurrentStep}
                />
            )}
            {steps.length > 0 && (
                <table>
                    <tbody>
                        <tr>
                            {steps[currentStep].map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ color: pivots[currentStep][cellIndex] === 1 ? 'red' : 'black' }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
    
}


export default QuickSort