
document.addEventListener('DOMContentLoaded', function () {
    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    const modal3 = document.getElementById('modal3');
    const modal4 = document.getElementById('modal4');
    const modal5 = document.getElementById('modal5');
    const modal6 = document.getElementById('modal6');
    const modal7 = document.getElementById('modal7');
    const modal8 = document.getElementById('modal8');
    if (modal1) {
        modal1.addEventListener('hidden.bs.modal', function () {
        const iframe = modal1.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal2) {
        modal2.addEventListener('hidden.bs.modal', function () {
        const iframe = modal2.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal3) {
        modal3.addEventListener('hidden.bs.modal', function () {
        const iframe = modal3.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal4) {
        modal4.addEventListener('hidden.bs.modal', function () {
        const iframe = modal4.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal5) {
        modal5.addEventListener('hidden.bs.modal', function () {
        const iframe = modal5.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal6) {
        modal6.addEventListener('hidden.bs.modal', function () {
        const iframe = modal6.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal7) {
        modal7.addEventListener('hidden.bs.modal', function () {
        const iframe = modal7.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
    if (modal8) {
        modal8.addEventListener('hidden.bs.modal', function () {
        const iframe = modal8.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    });
    }
});

let totalAmount = 0;
let resumen = "";

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todas las tarjetas (cards)
    if (!window.location.pathname.includes('dulceria.html')) return;

    const cards = document.querySelectorAll('.card');
    const quantities = Array.from({ length: cards.length }, () => 0); // Inicializa un array con ceros
    const prices = [10, 15, 20, 8, 12, 18, 25, 30,20,12,13,20]; // Precios de los productos (en el mismo orden que las tarjetas)
     // Total del resumen de la compra

    // Selecciona el elemento donde se mostrará el total y la lista de productos
    const totalElement = document.getElementById('total-amount');
    const productList = document.querySelector('.list-unstyled');

    cards.forEach((card, index) => {
        const decrementButton = card.querySelector('.btn-outline-danger.me-2'); // Botón de restar
        const incrementButton = card.querySelector('.btn-outline-danger.ms-2'); // Botón de sumar
        const quantitySpan = card.querySelector('.fw-bold'); // Elemento que muestra la cantidad
        const productName = card.querySelector('.card-title').textContent; // Nombre del producto
        
            const priceElement = document.createElement('p'); // Crea un elemento <p> para el precio
            priceElement.classList.add('text-muted'); // Agrega una clase para estilizar el precio
            priceElement.textContent = `Precio: $${prices[index].toFixed(2)}`; // Asigna el precio del array
            card.querySelector('.card-body').appendChild(priceElement); // Agrega el precio al cuerpo de la tarjeta

        
        // Evento para disminuir la cantidad
        decrementButton.addEventListener('click', () => {
            if (quantities[index] > 0) {
                quantities[index]--;
                quantitySpan.textContent = quantities[index];
                totalAmount -= prices[index];
                updateProductList();
                updateTotal();
            }
        });

        // Evento para aumentar la cantidad
        incrementButton.addEventListener('click', () => {
            quantities[index]++;
            quantitySpan.textContent = quantities[index];
            totalAmount += prices[index];
            updateProductList();
            updateTotal();
        });

        // Función para actualizar la lista de productos seleccionados
        function updateProductList() {
            productList.innerHTML = ''; // Limpia la lista actual
            resumen = ""; // Reinicia el resumen
            quantities.forEach((quantity, i) => {
                if (quantity > 0) {
                    const listItem = document.createElement('li');
                    const productTotal = (quantity * prices[i]).toFixed(2); // Calcula el total por producto
                    listItem.textContent = `${cards[i].querySelector('.card-title').textContent} x${quantity} - $${productTotal}`;
                    resumen = resumen + `${cards[i].querySelector('.card-title').textContent} x${quantity} - $${productTotal}<br>`;
                    productList.appendChild(listItem);
                }
            });
        }
    });

    // Función para actualizar el total en el resumen de la compra
    function updateTotal() {
        totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }
});

document.querySelectorAll('.toggle-collapse').forEach(button => {
button.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target-id');
    const allCollapses = document.querySelectorAll('.collapse');

    allCollapses.forEach(collapse => {
    if (collapse.id === targetId) {
        const bsCollapse = new bootstrap.Collapse(collapse, {
        toggle: true
        });
    } else {
        bootstrap.Collapse.getInstance(collapse)?.hide();
    }
    });
});
});

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el botón "Comprar"
    const buyButton = document.querySelector('.btn-danger');

    // Agrega el evento al botón
    buyButton.addEventListener('click', function () {
        if (totalAmount > 0) {
            // Si el total es mayor a 0, redirige a formato.html
            localStorage.setItem('resumen', resumen);
            localStorage.setItem('totalAmount', totalAmount.toFixed(2));
            window.location.href = 'formato.html';
        } else {
            // Si no, muestra el modal de advertencia
            const warningModal = new bootstrap.Modal(document.getElementById('warningModal'));
            warningModal.show();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('formato.html')) {
        const resumenCardBody = document.querySelector('.card-body');

        // Recupera el resumen y el monto total de localStorage
        const resumen = localStorage.getItem('resumen');
        const totalAmount = localStorage.getItem('totalAmount');

        if (resumen && totalAmount) {
            // Crea un elemento <p> para el resumen
            const resumenElement = document.createElement('p');
            resumenElement.textContent = resumen;
            resumenElement.classList.add('text-muted', 'mb-3');

            // Crea un elemento <p> para el monto total
            const totalElement = document.createElement('p');
            totalElement.textContent = `Total a pagar: $${totalAmount}`;
            totalElement.classList.add('fw-bold');

            // Agrega los elementos al contenedor
            resumenCardBody.appendChild(resumenElement);
            resumenCardBody.appendChild(totalElement);
        } else {
            // Si no hay datos, muestra un mensaje
            resumenCardBody.textContent = 'No hay productos seleccionados.';
        }
    }
});

document.getElementById('metodoPago').addEventListener('change', function () {
    const datosTarjeta = document.getElementById('datosTarjeta');
    if (this.value === 'Tarjeta de crédito/débito') {
        datosTarjeta.style.display = 'block';
    } else {
        datosTarjeta.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('formato.html')) {
        const confirmButton = document.getElementById('confirmPurchaseButton');
        const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));

        confirmButton.addEventListener('click', function () {
            // Obtener los valores de los campos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const metodoPago = document.getElementById('metodoPago').value;
            const terminos = document.getElementById('terminos').checked;

            let isValid = true;
            let errorMessage = '';

            // Validar campos obligatorios
            if (!nombre) {
                isValid = false;
                errorMessage += 'El campo "Nombre completo" es obligatorio.\n';
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                errorMessage += 'El campo "Correo electrónico" es obligatorio y debe tener un formato válido.\n';
            }

            if (!metodoPago || metodoPago === 'Selecciona un método de pago') {
                isValid = false;
                errorMessage += 'Debe seleccionar un método de pago.\n';
            }

            if (!terminos) {
                isValid = false;
                errorMessage += 'Debe aceptar los términos y condiciones.\n';
            }

            // Validar campos adicionales si el método de pago es tarjeta
            if (metodoPago === 'Tarjeta de crédito/débito') {
                const numeroTarjeta = document.getElementById('numeroTarjeta').value.trim();
                const vencimiento = document.getElementById('vencimiento').value.trim();
                const cvv = document.getElementById('cvv').value.trim();

                if (!numeroTarjeta || numeroTarjeta.length !== 16 || isNaN(numeroTarjeta)) {
                    isValid = false;
                    errorMessage += 'El número de tarjeta debe tener 16 dígitos.\n';
                }

                if (!vencimiento || !/^\d{2}\/\d{2}$/.test(vencimiento)) {
                    isValid = false;
                    errorMessage += 'La fecha de vencimiento debe tener el formato MM/AA.\n';
                }

                if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
                    isValid = false;
                    errorMessage += 'El CVV debe tener 3 dígitos.\n';
                }
            }

            // Mostrar mensaje de error o el modal
            if (!isValid) {
                alert(errorMessage); // Mostrar errores al usuario
            } else {
                thankYouModal.show(); // Mostrar el modal de agradecimiento
            }
        });
    }
});