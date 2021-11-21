import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BasicCard from "views/login/BasicCard"
import Lists from "views/lists"
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/lists" />} />
        <Route path="/login" element={<BasicCard />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:listName" element={<Lists />} />
      </Routes>
    </Router>
  );
}
 
export default App;
