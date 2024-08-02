import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PublicNavBar from "../../components/PublicNavBar"
import ArraySlider from "../../components/ArraySlider";

function privateQuickSelect(array, k) {
    const steps = [];
    const pivots = [];
    const allPivots = new Array(array.length).fill(0);
    const eliminated = []
    const allEliminated = new Array(array.length).fill(0);

    function partition(arr, low, high) {
        const pivot = arr[high];
        allPivots[high] = 1;
        steps.push(structuredClone(arr));
        pivots.push(structuredClone(allPivots));
        eliminated.push(structuredClone(allEliminated));
        
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                if(i!=j){
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    [allPivots[i],allPivots[j]] = [allPivots[j], allPivots[i]]
                    steps.push(structuredClone(arr));
                    pivots.push(structuredClone(allPivots));
                    eliminated.push(structuredClone(allEliminated));
                }
            }
        }
        if (i+1 != high) {
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            [allPivots[i+1],allPivots[high]] = [allPivots[high], allPivots[i+1]]
            pivots.push(structuredClone(allPivots));
            steps.push(structuredClone(arr));
            eliminated.push(structuredClone(allEliminated));
        }
        return i + 1;
    }
    function quickSelectRecursive(arr, low, high, k) {
        if (low <= high) {
            let pi = partition(arr, low, high);
            if (pi == k) {
                return pi;
            } else if (pi < k) {
                for(let i = low; i <= pi; i++){
                    allEliminated[i] = 1;
                }
                return quickSelectRecursive(arr, pi + 1, high, k);
            } else {
                for(let i = pi; i <= high; i++){
                    allEliminated[i] = 1;
                }
                return quickSelectRecursive(arr, low, pi - 1, k);
            }
        }
    }
    let arrCopy = [...array];
    quickSelectRecursive(arrCopy, 0, arrCopy.length - 1, k);
    return { steps, pivots, eliminated };
}

function QuickSelect(){
    const location = useLocation();
    const { array } = location.state || { array: null };
    const [steps, setSteps] = useState([]);
    const [pivots, setPivots] = useState([]);
    const [eliminated, setEliminated] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (array) {
            getQuickSelectArray();
        }
    }, [])

    const getQuickSelectArray = () => {
        const { steps, pivots, eliminated } = privateQuickSelect(array.values, parseInt(target));
        console.log(steps, pivots, eliminated)
        setSteps(steps);
        setPivots(pivots);
        setEliminated(eliminated);
    }

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    };

    const handleSubmit = (e) => {
        setCurrentStep(0);
        e.preventDefault();
        getQuickSelectArray();
    };

    return (
        <div>
            <PublicNavBar />
            <div className="container">
                <div className="left-section">
                    <h1>Quickselect</h1>
                    <p>
                        Quickselect is a selection algorithm to find the k-th smallest element in an unordered list. It is related to the quick sort sorting algorithm.
                    </p>
                </div>
                <div className="right-section">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Target:
                            <input type="number" value={target} onChange={handleTargetChange} />
                        </label>
                        <button type="submit">Search</button>
                    </form>
                    <div className="slider-section">
                        <ArraySlider
                            max={steps.length-1}
                            currentRow={currentStep}
                            setCurrentRow={setCurrentStep}
                        />
                    </div>
                    <div className="array-section">
                        {steps.length > 0 && (
                            <table>
                                <tbody>
                                    <tr>
                                        {steps[currentStep].map((cell, cellIndex) => (
                                            <td key={cellIndex} style={{ color: eliminated[currentStep][cellIndex] === 1 ? 'white' : pivots[currentStep][cellIndex]===1 ? 'red' : 'black'}}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div>
            
            
            
            
        </div>
        </div>
    );
}

export default QuickSelect