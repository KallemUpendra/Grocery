document.addEventListener("DOMContentLoaded", function() {
    showContent('home');
});

let cart = [];
let currentCustomerId = null;

function addToCart(productName, price, image) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const product = { name: productName, price: price, image: image, quantity: 1 };
        cart.push(product);
    }
    updateCart();
    showPopup('Item successfully added to cart.');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartHeading = document.getElementById('carthead');

    if (cart.length === 0) {
        document.getElementById('carthead').style.display='flex';
        cartHeading.innerHTML = "Your cart is empty.";
		document.getElementById('total-price').textContent = 0;
		cartItems.innerHTML = '';
		document.getElementById('checkout').style.display='none';
		document.getElementById('cart-table').style.display='none';
		document.getElementById('ctp').style.display='none';
		
        document.getElementById('bottom').style.display='flex';
		
    } else {
		document.getElementById('carthead').style.display='block';
        cartHeading.innerHTML = "Grocery Cart";
        cartItems.innerHTML = '';

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${item.image}" width="50" height="50"/></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${item.price * item.quantity}</td>
                <td><button style="background-color:#ff0000; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px;" onmouseover="this.style.backgroundColor='#ff3333'" onmouseout="this.style.backgroundColor='#ff0000'" onclick="removeFromCart('${item.name}')">Delete</button>
</td>
            `;
            cartItems.appendChild(row);
			document.getElementById('checkout').style.display='block';
			document.getElementById('cart-table').style.display='block';
			document.getElementById('ctp').style.display='block';
            document.getElementById('bottom').style.display='none';
        });

        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('total-price').textContent = totalPrice;
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
    showPopup('Item successfully removed from cart.');
	updateCart();
}


function showContent(id) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const check = document.getElementById(id);
    if (check) {
        check.classList.add('active');
    }

    const params = new URLSearchParams(window.location.search);
    currentCustomerId = params.get('loginId'); // Get loginId from query params

    if (currentCustomerId) {
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const customer = customers.find(c => c.id === currentCustomerId);
        if (customer) {
            document.getElementById('profileName').textContent = `Name: ${customer.name}`;
            document.getElementById('profileId').textContent = customer.id;
            document.getElementById('profileNameInput').value = customer.name;
            document.getElementById('profileEmail').value = customer.email;
            document.getElementById('profileAddress').value = customer.address;
            document.getElementById('profileContact').value = customer.contact;
            document.getElementById('profilePassword').value = customer.password;
			document.getElementById('mname').textContent="Hi "+customer.name+", Welcome to Online Grocery Store.";
        }
    }
	
}

function enableEditing() {
    document.getElementById('profileNameInput').disabled = false;
    document.getElementById('profileEmail').disabled = false;
    document.getElementById('profileAddress').disabled = false;
    document.getElementById('profileContact').disabled = false;
    document.getElementById('profilePassword').disabled = false;
    document.getElementById('saveButton').style.display = 'inline';
}

function validateProfile(name, email, password, address, contact) {
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

    return true;
}

function saveProfile() {
    const name = document.getElementById('profileNameInput').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const address = document.getElementById('profileAddress').value.trim();
    const contact = document.getElementById('profileContact').value.trim();
    const password = document.getElementById('profilePassword').value.trim();

    if (!validateProfile(name, email, password, address, contact)) {
        return;
    }

    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const customer = customers.find(c => c.id === currentCustomerId);

    if (customer) {
        customer.name = name;
        customer.email = email;
        customer.address = address;
        customer.contact = contact;
        customer.password = password;

        localStorage.setItem("customers", JSON.stringify(customers));

        // Disable the fields and hide the Save button
        document.getElementById('profileNameInput').disabled = true;
        document.getElementById('profileEmail').disabled = true;
        document.getElementById('profileAddress').disabled = true;
        document.getElementById('profileContact').disabled = true;
        document.getElementById('profilePassword').disabled = true;
        document.getElementById('saveButton').style.display = 'none';

        showPopup('Profile updated successfully.');

        // Update the profile section with the new information
        updateProfileSection();
    } else {
        showPopup('Customer not found.');
    }
}

function updateProfileSection() {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const customer = customers.find(c => c.id === currentCustomerId);

    if (customer) {
        document.getElementById('profileName').textContent = `Name: ${customer.name}`;
        document.getElementById('profileId').textContent = customer.id;
        document.getElementById('profileNameInput').value = customer.name;
        document.getElementById('profileEmail').value = customer.email;
        document.getElementById('profileAddress').value = customer.address;
        document.getElementById('profileContact').value = customer.contact;
        document.getElementById('profilePassword').value = customer.password;
    }
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 1000);
}

function updateVal()
{
	var totalAmount = document.getElementById('total-price').textContent;
	document.getElementById('product-price').textContent = totalAmount;
	var discount = 0.12 * totalAmount;
	discount = Math.floor(discount * 100) / 100;
	document.getElementById('discount').textContent="-"+discount;
	totalAmount-=discount;
	var gstdel=0.18*totalAmount + 50;
	gstdel=Math.floor(gstdel*100)/100;
	document.getElementById('extra-charges').textContent=gstdel;
	totalAmount+=gstdel;
	document.getElementById('order-total').textContent=totalAmount;



}

function completeTransaction() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        showPopup("Please select a payment method.");
        return;
    }
	document.getElementById('transaction-form').style.display='none';
    // Simulate transaction completion
	const randomDigits = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    const transactionId = 'TX' + randomDigits;
    const customerId = currentCustomerId;
    const productIds = cart.map(item => item.name).join(', ');
    const totalAmount = document.getElementById('order-total').textContent;
    const numberOfItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Display invoice
    document.getElementById('transaction-id').textContent = transactionId;
    document.getElementById('customer-id').textContent = customerId;
    document.getElementById('product-ids').textContent = productIds;
    document.getElementById('invoice-total').textContent = totalAmount;
    document.getElementById('number-of-items').textContent = numberOfItems;

    document.getElementById('invoice').style.display = 'block';
    showPopup("Transaction completed successfully.");
}
