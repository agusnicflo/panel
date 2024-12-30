import React from "react";
import { Routes, Route } from "react-router-dom";
import { SilhouetteProvider } from "./context/SilhouetteContext";
import AdminLayout from "./components/AdminLayout";
import Calendar from "./pages/Calendar";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import Revenue from "./pages/Revenue";
import Apariencia from "./pages/Apariencia";
import Home from "./components/Home";
import EditPage from "./pages/EditPage";
import "./styles/global.css";
import FinalPage from "./pages/FinalPage"; // Importa FinalPage aquí
import FinalPage2 from "./pages/FinalPage2";

function App() {
  return (
    <SilhouetteProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="apariencia" element={<Apariencia />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payment" element={<Payment />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>
        <Route path="/edit" element={<EditPage />} />
        <Route path="/final" element={<FinalPage />} />{" "}
        <Route path="/finalpage2" element={<FinalPage2 />} />
        {/* Ruta independiente */}
      </Routes>
    </SilhouetteProvider>
  );
}

export default App;
