import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ArrayDetail from "./pages/ArrayDetail"
import MergeSort from "./pages/MergeSort"
import QuickSort from "./pages/Quicksort"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

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
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App