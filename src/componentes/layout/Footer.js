export default function Footer() {
  return (
    <footer className="bg-ciclismo-verde text-white mt-16 border-t-4 border-ciclismo-rojo shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col gap-3">

        {/* TITULO */}
        <h3 className="text-xl font-extrabold tracking-wide uppercase drop-shadow-md">
          Simulador Virtual de Pruebas de Ciclismo de Pista – AMC La Paz
        </h3>

        {/* SEPARADOR */}
        <div className="w-32 h-[3px] bg-ciclismo-rojo mx-auto rounded-full"></div>

        {/* INFO PRINCIPAL */}
        <p className="text-sm mt-2 text-gray-100">
          Plataforma oficial de registro y visualización de resultados del simulador VR de ciclismo de pista.
        </p>

        {/* CREDITOS */}
        <p className="text-xs mt-2 text-gray-200">
          Desarrollado por Gabriel Tito Mendoza
        </p>

        {/* COPYRIGHT */}
        <p className="text-xs mt-4 text-gray-100 font-semibold">
          © {new Date().getFullYear()} Asociación Municipal de Ciclismo de La Paz · Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
}
