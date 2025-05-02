import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import RedirectPage from "./components/RedirectPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/redirect/:shortCode" element={<RedirectPage />} />
      </Routes>
    </Router>
  )
}

export default App
