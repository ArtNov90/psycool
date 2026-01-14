import { BrowserRouter, Routes, Route,  Navigate } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

import Home from "./pages/Home.tsx";
import Consultations from "./pages/Consultations.tsx";
import Conferences from "./pages/Conferences.tsx";
import Contact from "./pages/Contact.tsx";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


