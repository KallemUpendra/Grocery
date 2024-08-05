function validateForm() {
  var name = document.getElementById("cname").value.trim();
  var email = document.getElementById("cmail").value.trim();
  var password = document.getElementById("cpassword").value.trim();
  var address = document.getElementById("caddress").value.trim();
  var contact = document.getElementById("ccontact").value.trim();

  if (!name.match(/^[a-zA-Z\s]+$/)) {
    alert("Customer Name must have alphabets only");
    return false;
  }
  if (name === "") {
    alert("Customer Name cannot be empty");
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Email id not valid");
    return false;
  }

  if (
    password.length < 5 ||
    !password.match(/[A-Z]/) ||
    !password.match(/[0-9]/) ||
    !password.match(/[!-@#$%^&*]/)
  ) {
    alert("Password is not matching the criteria");
    return false;
  }
  if (password === "") {
    alert("Password cannot be empty");
    return false;
  }

  if (address === "") {
    alert("Address cannot be empty");
    return false;
  }

  if (contact === "" || contact.match(/[a-zA-Z]/)) {
    alert("Contact number must not have alphabets and cannot be empty");
    return false;
  }
  if (contact.length != 10) {
    alert("Contact number must be 10 digits");
    return false;
  }

  var customerId = "C" + Math.floor(Math.random() * 1000000);
  var customerData = {
    id: customerId,
    name: name,
    email: email,
    password: password,
    address: address,
    contact: contact,
  };

  var customers = JSON.parse(localStorage.getItem("customers")) || [];

  customers.push(customerData);

  localStorage.setItem("customers", JSON.stringify(customers));

  document.getElementById("mainid").style.display = "none";
  document.getElementById("acknowledgment").style.display = "block";
  document.getElementById("customerId").textContent = customerId;
  document.getElementById("customerName").textContent = name;
  document.getElementById("customerEmail").textContent = email;

  return false;
}