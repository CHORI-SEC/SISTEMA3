<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Control - Sistema de Insumos</title>
  <style>
    :root {
      --primary: #2c3e50;
      --secondary: #34495e;
      --accent: #3498db;
      --danger: #e74c3c;
      --bg: #f4f7f6;
    }

    body.dashboard-body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--bg);
    }

    .navbar {
      background-color: var(--primary);
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .btn-logout {
      background-color: var(--danger);
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .dashboard-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 20px;
    }

    header h1 {
      color: var(--primary);
      margin-bottom: 5px;
    }

    header p {
      color: #666;
      margin-bottom: 30px;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .menu-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      text-decoration: none;
      color: var(--primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border: 1px solid #eee;
    }

    .menu-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      border-color: var(--accent);
    }

    .icon {
      font-size: 50px;
      margin-bottom: 15px;
    }

    .menu-card h3 {
      margin: 10px 0;
      font-size: 1.4rem;
    }

    .menu-card p {
      color: #7f8c8d;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .hidden {
      display: none !important;
    }
  </style>
</head>
<body class="dashboard-body">

  <nav class="navbar">
    <div class="logo">
      <strong>Sistema de Insumos</strong>
    </div>
    <div class="user-info">
      <span id="welcomeText" style="color: white;">Cargando usuario...</span>
      <button onclick="logout()" class="btn-logout">Cerrar Sesión</button>
    </div>
  </nav>

  <div class="dashboard-container">
    <header>
      <h1>Panel de Control</h1>
      <p>Bienvenido al sistema de gestión de mermas e insumos.</p>
    </header>

    <div class="menu-grid">
      <a href="report.html" class="menu-card">
        <div class="icon">📦</div>
        <h3>Registrar Insumo</h3>
        <p>Reportar productos dañados o realizar nuevos pedidos al supervisor.</p>
      </a>

      <a href="approve.html" id="adminCard" class="menu-card hidden">
        <div class="icon">⚖️</div>
        <h3>Aprobaciones</h3>
        <p>Revisar y gestionar las solicitudes de insumos pendientes.</p>
      </a>

      <a href="history.html" class="menu-card">
        <div class="icon">📋</div>
        <h3>Historial</h3>
        <p>Consulta el estado y los detalles de reportes anteriores.</p>
      </a>
    </div>
  </div>

  <script>
    // ================= CONFIGURACIÓN Y LÓGICA INTEGRADA =================

    const users = [
      { user: "admin", pass: "1234", role: "admin" },
      { user: "almacen", pass: "1234", role: "almacen" }
    ];

    function getSession() {
      const sessionData = localStorage.getItem("session");
      return sessionData ? JSON.parse(sessionData) : null;
    }

    function logout() {
      localStorage.removeItem("session");
      window.location.href = "index.html";
    }

    // Al cargar el Dashboard
    document.addEventListener("DOMContentLoaded", function() {
      const session = getSession();

      // Seguridad: Si no hay sesión, volver al login
      if (!session) {
        window.location.href = "index.html";
        return;
      }

      // 1. Mostrar nombre de usuario
      const welcome = document.getElementById("welcomeText");
      if (welcome) {
        welcome.innerText = `Hola, ${session.user} (${session.role})`;
      }

      // 2. Mostrar opciones de Admin
      if (session.role === "admin") {
        const adminCard = document.getElementById("adminCard");
        if (adminCard) {
          adminCard.classList.remove("hidden");
          adminCard.style.display = "flex";
        }
      }
    });

    // Nota: Las funciones addItem, loadPending, approve, etc., 
    // deben estar también en sus respectivos archivos .html o en un app.js compartido.
  </script>
</body>
</html>
