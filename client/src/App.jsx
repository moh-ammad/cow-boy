// src/App.jsx or wherever you define routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreateRvm from "./pages/CreateRvm";
import EditRvm from "./pages/EditRvm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-4"> {/* maybe spacing under navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/create" element={<CreateRvm />} />
          <Route path="/edit/:id" element={<EditRvm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
