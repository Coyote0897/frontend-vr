// =========================
//  CATEGORÍAS POR EDAD
// =========================

export function obtenerCategoria(edad) {
  if (edad >= 6 && edad <= 8) return "Pre-Infantil";
  if (edad >= 9 && edad <= 10) return "Infantil A";
  if (edad >= 11 && edad <= 12) return "Infantil B";
  if (edad >= 13 && edad <= 14) return "Pre-Cadete";
  if (edad >= 15 && edad <= 16) return "Cadete";
  if (edad >= 17 && edad <= 18) return "Junior";
  if (edad >= 19 && edad <= 22) return "Sub-23";
  if (edad >= 23 && edad <= 29) return "Élite";
  if (edad >= 30 && edad <= 39) return "Máster A";
  if (edad >= 40 && edad <= 49) return "Máster B";
  if (edad >= 50 && edad <= 59) return "Máster C";
  if (edad >= 60) return "Máster D";

  return "Sin categoría";
}

// =========================
//  BADGES POR CATEGORÍA
// =========================

export function categoriaBadge(categoria) {
  const colores = {
    "Pre-Infantil": "bg-blue-200 text-blue-800",
    "Infantil A": "bg-blue-300 text-blue-900",
    "Infantil B": "bg-blue-400 text-white",

    "Pre-Cadete": "bg-yellow-200 text-yellow-800",
    "Cadete": "bg-orange-300 text-orange-900",
    "Junior": "bg-red-300 text-red-900",

    "Sub-23": "bg-green-300 text-green-900",

    // Categoría Élite → Colores AMC (rojo)
    "Élite": "bg-ciclismo-rojo text-white",

    "Máster A": "bg-purple-300 text-purple-900",
    "Máster B": "bg-purple-400 text-white",
    "Máster C": "bg-gray-300 text-gray-800",
    "Máster D": "bg-gray-500 text-white",

    "Sin categoría": "bg-gray-200 text-gray-600"
  };

  return colores[categoria] || colores["Sin categoría"];
}
