import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";

export default function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      try {
        setUsuario(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-ciclismo-rojo">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO + TITULO */}
        <div className="flex items-center gap-6">
          <div className="
            bg-white 
            rounded-full 
            p-3 
            shadow-xl 
            border-4 
            border-ciclismo-verde 
            relative
            transition-transform 
            duration-300 
            hover:scale-105
          ">
            <div className="
              absolute inset-0 
              rounded-full 
              border-[3px] 
              border-ciclismo-rojo 
            "></div>

            <img 
              src={logo}
              alt="AMC La Paz"
              className="h-28 w-auto select-none"
            />
          </div>

          <h1 className="
            text-1xl
            font-extrabold 
            text-ciclismo-verde 
            tracking-widest 
            uppercase 
            max-w-[550px]
          ">
            Simulador Virtual de Pruebas – Asociación Municipal de Ciclismo de La Paz
          </h1>
        </div>

        {/* NAV + USUARIO */}
        <div className="flex items-center gap-8 text-lg font-semibold">

          <nav className="flex gap-8 items-center">
            <Link to="/" className="link-item">Inicio</Link>
            <Link to="/kilometro" className="link-item">Kilómetro</Link>
            <Link to="/persecucion" className="link-item">Persecución</Link>
            <Link to="/velocidad200" className="link-item">200m</Link>
          </nav>

          {/* SI NO ESTÁ LOGUEADO → botón login */}
          {!usuario && (
            <Link 
              to="/login"
              className="
                bg-ciclismo-verde text-white 
                px-3 py-1 
                rounded-full 
                shadow 
                font-medium 
                text-xs
                uppercase
                tracking-wide
                hover:bg-ciclismo-rojo
                transition
              "
            >
              Iniciar Sesión
            </Link>
          )}

          {/* SI ESTÁ LOGUEADO → mostrar nombre + cerrar sesión */}
          {usuario && (
            <div className="flex items-center gap-4">

              <span className="text-ciclismo-verde font-bold text-sm">
                👤 {usuario.nombre}
              </span>

              <button
                onClick={cerrarSesion}
                className="
                  text-white 
                  bg-ciclismo-rojo 
                  px-3 py-1
                  rounded-full
                  text-xs
                  uppercase
                  font-semibold
                  hover:opacity-80
                  transition
                "
              >
                Cerrar Sesión
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}
