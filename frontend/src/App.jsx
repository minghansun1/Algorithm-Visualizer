import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import About from "./pages/About"
import AlgorithmList from "./pages/AlgorithmList"
import NotFound from "./pages/NotFound"
import ArrayDetail from "./pages/ArrayDetail"
import MergeSort from "./pages/ArrayAlgorithms/MergeSort"
import QuickSort from "./pages/ArrayAlgorithms/QuickSort"
import BinarySearch from "./pages/ArrayAlgorithms/BinarySearch"
import CountingInversions from "./pages/ArrayAlgorithms/CountingInversions"
import QuickSelect from "./pages/ArrayAlgorithms/QuickSelect"
import MergeSortInfo from "./pages/Info/MergeSortInfo"
import QuickSortInfo from "./pages/Info/QuickSortInfo"
import BinarySearchInfo from "./pages/Info/BinarySearchInfo"
import CountingInversionsInfo from "./pages/Info/CountingInversionsInfo"
import QuickSelectInfo from "./pages/Info/QuickSelectInfo"
import DijkstraInfo from "./pages/Info/DjikstraInfo"
import PrimInfo from "./pages/Info/PrimInfo"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/array/:id"
          element={
            <ProtectedRoute>
              <ArrayDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/array/:id/mergesort"
          element={
            <ProtectedRoute>
              <MergeSort />
            </ProtectedRoute>
          }
        />
        <Route
          path="/array/:id/quicksort"
          element={
            <ProtectedRoute>
              <QuickSort />
            </ProtectedRoute>
          }
        />
        <Route
        path="/array/:id/binarysearch"
        element={
          <ProtectedRoute>
            <BinarySearch />
          </ProtectedRoute>
        }
        />
        <Route
        path="/array/:id/countinginversions"
        element={
          <ProtectedRoute>
            <CountingInversions />
          </ProtectedRoute>
        }
        />
        <Route
        path="/array/:id/quickselect"
        element={
          <ProtectedRoute>
            <QuickSelect />
          </ProtectedRoute>
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/about" element={<About />} />
        <Route path="/algorithm-list" element={<AlgorithmList />} />
        <Route path="/algorithm-list/mergesort" element={<MergeSortInfo />} />
        <Route path="/algorithm-list/quicksort" element={<QuickSortInfo />} />
        <Route path="/algorithm-list/binarysearch" element={<BinarySearchInfo />} />
        <Route path="/algorithm-list/countinginversions" element={<CountingInversionsInfo />} />
        <Route path="/algorithm-list/quickselect" element={<QuickSelectInfo />} />
        <Route path="/algorithm-list/dijkstra" element={<DijkstraInfo />} />
        <Route path="/algorithm-list/prim" element={<PrimInfo />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App