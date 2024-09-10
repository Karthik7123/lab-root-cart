function updateSubtotal(product) {
  const priceElement = product.querySelector('.price span');
  const quantityElement = product.querySelector('.quantity input');

  const price = parseFloat(priceElement.textContent);
  const quantity = parseInt(quantityElement.value);

  const subtotal = price * quantity;

  const subtotalElement = product.querySelector('.subtotal span');
  subtotalElement.textContent = subtotal.toFixed(2);

  return subtotal;
}

function calculateAll() {
  const products = document.querySelectorAll('.product');
  let total = 0;

  products.forEach(product => {
    total += updateSubtotal(product);
  });

  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total.toFixed(2);
}

function removeProduct(event) {
  const productRow = event.target.parentNode.parentNode;
  productRow.parentNode.removeChild(productRow);
  calculateAll();
}

function createProduct() {
  const nameInput = document.querySelector('.create-product input[placeholder="Product Name"]');
  const priceInput = document.querySelector('.create-product input[placeholder="Product Price"]');

  const name = nameInput.value;
  const price = parseFloat(priceInput.value);

  const newProductRow = document.createElement('tr');
  newProductRow.className = 'product';
  newProductRow.innerHTML = `
    <td><span>${name}</span></td>
    <td>$<span>${price.toFixed(2)}</span></td>
    <td><input type="number" value="0" min="0" placeholder="Quantity"></td>
    <td>$<span>0</span></td>
    <td><button class="btn btn-remove">Remove</button></td>
  `;

  document.querySelector('#cart tbody').appendChild(newProductRow);
  nameInput.value = '';
  priceInput.value = '';
  calculateAll();
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeProduct);
  });

  const createButton = document.getElementById('create');
  createButton.addEventListener('click', createProduct);
});