import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./componentes/layout/Header";
import Footer from "./componentes/layout/Footer";
import Login from "./componentes/pages/Login";


import ResultadosKilometro from "./componentes/ResultadosKilometro";
import ResultadosPersecucion from "./componentes/ResultadosPersecucion";
import ResultadosVelocidad200 from "./componentes/ResultadosVelocidad200";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">

        <Header />

        <main className="flex-grow p-4">
          <Routes>

            <Route path="/" element={<h1 className="text-3xl">Bienvenido al Panel de Resultados VR</h1>} />

            <Route path="/kilometro" element={<ResultadosKilometro />} />

            <Route path="/persecucion" element={<ResultadosPersecucion />} />

            <Route path="/velocidad200" element={<ResultadosVelocidad200 />} />

            <Route path="/login" element={<Login />} />


          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
