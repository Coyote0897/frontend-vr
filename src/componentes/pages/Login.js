import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://backend-vr-ciclismo.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("Respuesta login:", data);

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: data.message || "Credenciales incorrectas",
        });
        return;
      }

      if (!data.token || data.token === "undefined") {
        console.error("⚠️ El backend NO envió un token válido:", data.token);

        Swal.fire({
          icon: "error",
          title: "Token inválido",
          text: "El servidor no generó un token válido.",
        });

        return;
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Hola, ${data.usuario.nombre}`,
        timer: 1500,
        showConfirmButton: false
      });

      // ⬇️ Redirigir al home
      navigate("/");

      // ⬇️ Recargar la página después del login
      setTimeout(() => {
        window.location.reload();
      }, 300); // pequeña espera para que navigate termine

    } catch (error) {
      console.error("Error login:", error);

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo contactar con el servidor.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-xl w-[350px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-ciclismo-verde">
          Iniciar Sesión
        </h2>

        <label className="font-semibold">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="font-semibold">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-ciclismo-verde hover:bg-ciclismo-rojo text-white p-2 rounded font-bold transition"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
