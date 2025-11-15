import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { obtenerCategoria, categoriaBadge } from "../utils/categorias";
import { formatearTiempo } from "../utils/tiempo";

export default function ResultadosPersecucion() {
  const [resultados, setResultados] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuario?.rol === "admin";

  // FILTROS
  const [filtroSexo, setFiltroSexo] = useState("Todos");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina, setResultadosPorPagina] = useState(5);

  // Cargar datos desde backend
  const cargarDatos = () => {
    fetch("https://backend-vr-ciclismo.onrender.com/api/persecucion")
      .then((res) => res.json())
      .then((data) => setResultados(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // ELIMINAR SOLO SI ES ADMIN
  const eliminarResultado = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    });

    if (!confirm.isConfirmed) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://backend-vr-ciclismo.onrender.com/api/persecucion/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      Swal.fire("Eliminado", "Registro eliminado correctamente", "success");
      cargarDatos();
    } else {
      Swal.fire("Error", data.message || "No se pudo eliminar.", "error");
    }
  };

  // FILTRAR RESULTADOS
  const resultadosFiltrados = resultados.filter((r) => {
    const categoria = obtenerCategoria(r.edad);
    const coincideSexo = filtroSexo === "Todos" || r.genero === filtroSexo;
    const coincideCategoria =
      filtroCategoria === "Todos" || categoria === filtroCategoria;
    return coincideSexo && coincideCategoria;
  });

  const categoriasDisponibles = [
    "Todos",
    ...new Set(resultados.map((r) => obtenerCategoria(r.edad))),
  ];

  // PAGINACIÓN
  const totalPaginas = Math.ceil(
    resultadosFiltrados.length / resultadosPorPagina
  );
  const indiceInicial = (paginaActual - 1) * resultadosPorPagina;
  const paginaVisible = resultadosFiltrados.slice(
    indiceInicial,
    indiceInicial + resultadosPorPagina
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroSexo, filtroCategoria, resultadosPorPagina]);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-extrabold mb-6 text-blue-600">
        Resultados · Persecución Individual
      </h1>

      {/* TABLA */}
      <div className="bg-white shadow-lg rounded-xl border">

        <div className="grid grid-cols-6 px-6 py-3 bg-gray-100 border-b font-bold">
          <div>#</div>
          <div>Tiempo Total</div>
          <div>Vueltas</div>
          <div>Género / Categoría</div>
          <div>Fecha</div>
          {esAdmin && <div>Acciones</div>}
        </div>

        {paginaVisible.map((r, index) => {
          const categoria = obtenerCategoria(r.edad);

          return (
            <div key={r._id}
              className="grid grid-cols-6 px-6 py-4 border-b hover:bg-gray-50"
            >
              <div>{indiceInicial + index + 1}</div>

              <div className="font-semibold">
                {formatearTiempo(r.tiempoTotal)}
              </div>

              <div className="text-sm">
                <ul className="list-disc ml-4">
                  {r.tiemposPorVuelta.map((t, i) => (
                    <li key={i}>V{i + 1}: {formatearTiempo(t)}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span>{r.genero}</span><br />
                <span className={`px-2 py-1 text-xs rounded-full ${categoriaBadge(categoria)}`}>
                  {categoria}
                </span>
              </div>

              <div>{new Date(r.fecha).toLocaleString()}</div>

              {esAdmin && (
                <div>
                  <button
                    onClick={() => eliminarResultado(r._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          );
        })}

      </div>

    </div>
  );
}
