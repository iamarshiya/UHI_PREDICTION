import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Riskmap from "./pages/Riskmap";
import Forecast from "./pages/Forecast";
import Contact from "./pages/Contact";
import Chatbot from "./components/chatbot";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/riskmap" element={<Riskmap />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;