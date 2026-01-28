function login() {
  console.log("Login ejecutado");

  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "block";

  const users = [
  { user: "admin", pass: "1234", role: "admin" },
  { user: "almacen", pass: "1234", role: "almacen" }
];

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}

