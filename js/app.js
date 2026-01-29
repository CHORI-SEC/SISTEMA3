// ================= USUARIOS =================
const users = [
  { user: "admin", pass: "1234", role: "admin" },
  { user: "almacen", pass: "1234", role: "almacen" }
];

// ================= SESIÓN =================
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  const found = users.find(x => x.user === u && x.pass === p);

  if (!found) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  localStorage.setItem("session", JSON.stringify(found));
  window.location.href = "dashboard.html";
}

function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

function logout() {
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

// ================= DATA =================
let items = JSON.parse(localStorage.getItem("items")) || [];

// ================= PROTECCIÓN DE PÁGINAS =================
function protectPage(requiredRole = null) {
  const session = getSession();

  if (!session) {
    window.location.href = "index.html";
    return;
  }

  if (requiredRole && session.role !== requiredRole) {
    alert("No tienes permiso para acceder aquí");
    window.location.href = "dashboard.html";
  }
}

// ================= REPORTAR =================
function addItem() {
  const name = document.getElementById("name").value;
  const qty = document.getElementById("qty").value;
  const reason = document.getElementById("reason").value;

  if (!name || !qty || !reason) {
    alert("Completa todos los campos");
    return;
  }

  items.push({
    id: Date.now(),
    name,
    qty,
    reason,
    status: "pendiente",
    date: new Date().toLocaleString(),
    reportedBy: getSession().user
  });

  localStorage.setItem("items", JSON.stringify(items));
  alert("Insumo enviado a aprobación");
  window.location.href = "dashboard.html";
}

// ================= APROBACIÓN (SOLO ADMIN) =================
function loadPending() {
  protectPage("admin");

  const container = document.getElementById("pendingList");
  if (!container) return;

  container.innerHTML = "";

  const pendingItems = items.filter(i => i.status === "pendiente");

  if (pendingItems.length === 0) {
    container.innerHTML = "<p style='text-align:center; color:#666;'>No hay solicitudes pendientes.</p>";
    return;
  }

  pendingItems.forEach(i => {
    container.innerHTML += `
      <div class="card-item">
        <div class="card-info">
          <b>📦 ${i.name}</b>
          <p>Cantidad: ${i.qty} | Reportado por: ${i.reportedBy}</p>
          <small>Motivo: ${i.reason}</small>
        </div>
        <div class="card-actions">
          <button class="btn-approve" onclick="approve(${i.id})">Aprobar</button>
          <button class="btn-reject" onclick="reject(${i.id})">Rechazar</button>
        </div>
      </div>
    `;
  });
}

function approve(id) {
  updateStatus(id, "aprobado");
}

function reject(id) {
  updateStatus(id, "rechazado");
}

function updateStatus(id, status) {
  items = items.map(i =>
    i.id === id
      ? { ...i, status, reviewedBy: getSession().user }
      : i
  );

  localStorage.setItem("items", JSON.stringify(items));
  loadPending(); // Recarga la lista automáticamente
}
}




