import React from "react";

function Login() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" style={{ display: "block", margin: "10px 0", width: "100%" }} />
        <input type="password" placeholder="Contraseña" style={{ display: "block", margin: "10px 0", width: "100%" }} />
        <button style={{ display: "block", width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;