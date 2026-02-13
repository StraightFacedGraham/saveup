
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { BudgetTracker } from "./pages/budget-tracker/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/budget-tracker" element={<BudgetTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
