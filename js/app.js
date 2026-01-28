function login() {
  console.log("Login ejecutado");

  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "block";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}
