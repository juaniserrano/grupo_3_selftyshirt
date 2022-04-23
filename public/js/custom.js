const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Mobile Menu Toggle Button JavaScript
function myFunction() {
	var x = document.getElementById('mobile-menu');
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
}

// Funcion para agregar o bajar cantidad de productos
function incrementValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	document.getElementById('number').value = value;
}
function decrementValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	if (value > 1) {
		value--;
		document.getElementById('number').value = value;
	}
}

//Test sumar valor + cantidad productos
function multiplicar() {
	m1 = document.getElementById('multiplicando').value;
	m2 = document.getElementById('multiplicador').value;
	r = m1 * m2;
	document.getElementById('resultado').value = r;
}

//Validacion

function validate() {
	let product = document.newProduct;
	if (product.name.value == '') {
		alert('Por favor ingrese un nombre');
		product.name.focus();
		return false;
	}
	if (product.price.value == '' || isNaN(product.price.value)) {
		alert('Por favor ingrese un precio');
		product.price.focus();
		return false;
	}
	if (product.stockquantity.value == '' || isNaN(product.stockquantity.value)) {
		alert('Por favor ingrese la cantidad de productos');
		product.stockquantity.focus();
		return false;
	}
	if (product.stockquantity.value == '' || isNaN(product.stockquantity.value)) {
		alert('Por favor ingrese la cantidad de productos');
		product.stockquantity.focus();
		return false;
	}
	if (product.category.value == '') {
		alert('Por favor ingrese el tipo de producto');
		product.category.focus();
		return false;
	}
	if (product.description.value == '' || product.description.value.parseInt < 10) {
		alert('Por favor ingrese una descripcion');
		product.description.focus();
		return false;
	}

	return true;
}
