import {productos} from './data.js';

function mostrarProductos() {
  const catalogo = document.getElementById('catalogo');
  productos.forEach(producto => {
      var precio = aumentarPrecio(producto.precio);
      // var precio = producto.precio;
      const elementoProducto = document.createElement('div');
      elementoProducto.className = 'producto';
      elementoProducto.innerHTML = `
          <p>${producto.nombre}</p>
          <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
          <span>Precio: ${precio}</span>
      `;
      catalogo.appendChild(elementoProducto);
  });
}

function aumentarPrecio(precio) {
  // Aumentar el precio en un 20%
  const nuevoPrecio = precio * 1.2;

  // Redondear a la cifra más cercana en cienes
  const precioRedondeado = Math.round(nuevoPrecio / 100) * 100;

  // Formatear el precio como una cantidad en pesos colombianos
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precioRedondeado);


  return precioFormateado;
}

function cargarMasProductos() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  // Simulación de carga de más productos (puedes cargar datos reales desde una API)
  setTimeout(() => {
      pagina++;
      mostrarProductos();
      loader.style.display = 'none';
  }, 1000);
}

function filtrarCatalogo() {
  // Lógica para aplicar filtros según los valores de los selectores
  // Puedes adaptar esta función según tus necesidades
  const categoria = document.getElementById('categoria').value;
  const precio = document.getElementById('precio').value;

  // Limpia el catálogo actual y carga productos filtrados
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';
  mostrarProductos();

  // Puedes agregar más lógica de filtrado según tus necesidades
}

// Event listener para cargar más productos al hacer scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      cargarMasProductos();
  }
});

// Mostrar productos al cargar la página
mostrarProductos();