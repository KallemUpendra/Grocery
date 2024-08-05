function showRegisterForm() {
  window.location.href = "registration.html";
}

function validateLogin() {
  var loginId = document.getElementById("loginId").value.trim();
  var loginPassword = document.getElementById("loginPassword").value.trim();

  var customers = JSON.parse(localStorage.getItem("customers")) || [];
  var customer = customers.find((c) => c.id === loginId);
 
  if (!customer) {
    document.getElementById("loginMessage").textContent = "ID not valid";
    return false;
  }

  if (customer.password !== loginPassword) {
    document.getElementById("loginMessage").textContent = "Password not valid";
    return false;
  }

  alert("Login successful. Redirecting to Home Page.");
  window.location.href = `home.html?loginId=${loginId}`;
  return false;
}
