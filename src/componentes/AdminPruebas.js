import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { categoriaBadge } from "../utils/categorias";

export default function AdminPruebas() {
  const [pruebas, setPruebas] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuario?.rol === "admin";

  // ===============================
  // FORMULARIO CREAR
  // ===============================
  const [form, setForm] = useState({
    nombre: "",
    genero: "Masculino",
    categoria: "",
    tipoPrueba: "Kilómetro",
    tiempo: "",
    fecha: "",
  });

  // ===============================
  // FORMULARIO EDITAR
  // ===============================
  const [editando, setEditando] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    nombre: "",
    genero: "Masculino",
    categoria: "",
    tipoPrueba: "Kilómetro",
    tiempo: "",
    fecha: "",
  });

  // ===============================
  // FILTROS
  // ===============================

  const [filtroGenero, setFiltroGenero] = useState("Todos");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [filtroPrueba, setFiltroPrueba] = useState("Todos");

  const categoriasLista = [
    "Pre-Infantil", "Infantil A", "Infantil B", "Pre-Cadete", "Cadete",
    "Junior", "Sub-23", "Élite", "Máster A", "Máster B", "Máster C", "Máster D"
  ];

  const cargarPruebas = () => {
    fetch("https://backend-vr-ciclismo.onrender.com/api/pruebas")
      .then((res) => res.json())
      .then((data) => setPruebas(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarPruebas();
  }, []);

  // ===============================
  // MANEJO DE FORMULARIOS
  // ===============================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // ===============================
  // CREAR PRUEBA
  // ===============================
  const crearPrueba = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("https://backend-vr-ciclismo.onrender.com/api/pruebas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire("Registrado", "Prueba creada correctamente", "success");
      cargarPruebas();
      setForm({
        nombre: "",
        genero: "Masculino",
        categoria: "",
        tipoPrueba: "Kilómetro",
        tiempo: "",
        fecha: "",
      });
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  // ===============================
  // ELIMINAR PRUEBA
  // ===============================
  const eliminarPrueba = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar prueba?",
      text: "Esto no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    });

    if (!confirm.isConfirmed) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`https://backend-vr-ciclismo.onrender.com/api/pruebas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      Swal.fire("Eliminado", "Prueba eliminada", "success");
      cargarPruebas();
    } else {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  // ===============================
  // ABRIR MODAL EDITAR
  // ===============================
  const abrirEdicion = (prueba) => {
    setEditForm({
      id: prueba._id,
      nombre: prueba.nombre,
      genero: prueba.genero,
      categoria: prueba.categoria,
      tipoPrueba: prueba.tipoPrueba,
      tiempo: prueba.tiempo,
      fecha: prueba.fecha.slice(0, 16),
    });
    setEditando(true);
  };

  // ===============================
  // GUARDAR EDICIÓN
  // ===============================
  const guardarEdicion = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://backend-vr-ciclismo.onrender.com/api/pruebas/${editForm.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      }
    );

    if (res.ok) {
      Swal.fire("Actualizado", "La prueba fue modificada", "success");
      setEditando(false);
      cargarPruebas();
    } else {
      Swal.fire("Error", "No se pudo editar", "error");
    }
  };

  // ===============================
  // FILTROS APLICADOS A TABLA
  // ===============================
  const pruebasFiltradas = pruebas.filter((p) => {
    const coincideGenero =
      filtroGenero === "Todos" || p.genero === filtroGenero;

    const coincideCategoria =
      filtroCategoria === "Todos" || p.categoria === filtroCategoria;

    const coincidePrueba =
      filtroPrueba === "Todos" || p.tipoPrueba === filtroPrueba;

    return coincideGenero && coincideCategoria && coincidePrueba;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-ciclismo-verde mb-6">
        Tiempo de pruebas reales
      </h1>

      {/* ===============================
            FILTROS
      =============================== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 border">
        <h3 className="text-xl font-bold mb-3">Filtros</h3>

        <div className="grid grid-cols-3 gap-4">

          {/* FILTRO GÉNERO */}
          <div>
            <label>Género</label>
            <select
              className="w-full border p-2 rounded"
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
            >
              <option>Todos</option>
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
          </div>

          {/* FILTRO CATEGORÍA */}
          <div>
            <label>Categoría</label>
            <select
              className="w-full border p-2 rounded"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option>Todos</option>
              {categoriasLista.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* FILTRO PRUEBA */}
          <div>
            <label>Tipo de prueba</label>
            <select
              className="w-full border p-2 rounded"
              value={filtroPrueba}
              onChange={(e) => setFiltroPrueba(e.target.value)}
            >
              <option>Todos</option>
              <option>Kilómetro</option>
              <option>200 metros</option>
              <option>Persecución</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===============================
            FORMULARIO CREAR
      =============================== */}
      {esAdmin && (
        <form
          onSubmit={crearPrueba}
          className="bg-white shadow-lg p-6 rounded-xl mb-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-4">Registrar nueva prueba</h2>

          <div className="grid grid-cols-3 gap-4">

            <div>
              <label>Nombre del ciclista</label>
              <input
                type="text"
                name="nombre"
                className="w-full border p-2 rounded"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Género</label>
              <select
                name="genero"
                className="w-full border p-2 rounded"
                value={form.genero}
                onChange={handleChange}
              >
                <option>Masculino</option>
                <option>Femenino</option>
              </select>
            </div>

            <div>
              <label>Categoría</label>
              <select
                name="categoria"
                className="w-full border p-2 rounded"
                value={form.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categoriasLista.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Tipo de prueba</label>
              <select
                name="tipoPrueba"
                className="w-full border p-2 rounded"
                value={form.tipoPrueba}
                onChange={handleChange}
              >
                <option>Kilómetro</option>
                <option>200 metros</option>
                <option>Persecución</option>
              </select>
            </div>

            <div>
              <label>Tiempo (segundos)</label>
              <input
                type="number"
                name="tiempo"
                step="0.01"
                className="w-full border p-2 rounded"
                value={form.tiempo}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Fecha</label>
              <input
                type="datetime-local"
                name="fecha"
                className="w-full border p-2 rounded"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button className="mt-4 bg-ciclismo-verde text-white px-5 py-2 rounded-lg hover:bg-green-700">
            Registrar prueba
          </button>
        </form>
      )}

      {/* ===============================
            TABLA
      =============================== */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="grid grid-cols-8 gap-4 px-6 py-3 bg-gray-100 font-bold border-b">
          <div>#</div>
          <div>Ciclista</div>
          <div>Género</div>
          <div>Categoría</div>
          <div>Prueba</div>
          <div>Tiempo</div>
          <div>Fecha</div>
          {esAdmin && <div>Acciones</div>}
        </div>

        {pruebasFiltradas.map((p, index) => (
          <div
            key={p._id}
            className="grid grid-cols-8 px-6 py-4 border-b hover:bg-gray-50"
          >
            <div>{index + 1}</div>
            <div>{p.nombre}</div>
            <div>{p.genero}</div>

            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${categoriaBadge(p.categoria)}`}>
                {p.categoria}
              </span>
            </div>

            <div>{p.tipoPrueba}</div>
            <div className="font-bold">{p.tiempo}s</div>
            <div>{new Date(p.fecha).toLocaleString()}</div>

            {esAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => abrirEdicion(p)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarPrueba(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===============================
            MODAL DE EDICIÓN
      =============================== */}
      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-1/2 shadow-lg border">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Editar prueba</h2>

            <form onSubmit={guardarEdicion} className="grid grid-cols-3 gap-4">

              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="w-full border p-2 rounded"
                  value={editForm.nombre}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Género</label>
                <select
                  name="genero"
                  className="w-full border p-2 rounded"
                  value={editForm.genero}
                  onChange={handleEditChange}
                >
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>

              <div>
                <label>Categoría</label>
                <select
                  name="categoria"
                  className="w-full border p-2 rounded"
                  value={editForm.categoria}
                  onChange={handleEditChange}
                >
                  {categoriasLista.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Prueba</label>
                <select
                  name="tipoPrueba"
                  className="w-full border p-2 rounded"
                  value={editForm.tipoPrueba}
                  onChange={handleEditChange}
                >
                  <option>Kilómetro</option>
                  <option>200 metros</option>
                  <option>Persecución</option>
                </select>
              </div>

              <div>
                <label>Tiempo</label>
                <input
                  type="number"
                  name="tiempo"
                  className="w-full border p-2 rounded"
                  value={editForm.tiempo}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Fecha</label>
                <input
                  type="datetime-local"
                  name="fecha"
                  className="w-full border p-2 rounded"
                  value={editForm.fecha}
                  onChange={handleEditChange}
                />
              </div>

              <div className="col-span-3 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="bg-gray-500 px-4 py-2 text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar cambios
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
