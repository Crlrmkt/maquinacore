// Sonido del dispensador
const sonidoDispensador = new Audio("sounds/dispensador.mp3");

// Lista de imágenes y nombres de bebidas
const productos = [
  { nombre: "AGUA", archivo: "img/agua.png" },
  { nombre: "AGUA2", archivo: "img/agua2.png" },
  { nombre: "CAFFE-B", archivo: "img/caffe-b.png" },
  { nombre: "CALPIS", archivo: "img/calips.png" },
  { nombre: "CHOCO", archivo: "img/choco.png" },
  { nombre: "CLB-CF", archivo: "img/CLB-CF.png" },
  { nombre: "COFFE", archivo: "img/coffe.png" },
  { nombre: "FRESA", archivo: "img/fresa.png" },
  { nombre: "GREEN", archivo: "img/green.png" },
  { nombre: "HZL-CF", archivo: "img/HZL-CF.png" },
  { nombre: "LATTE", archivo: "img/latte.png" },
  { nombre: "MATCHA", archivo: "img/MATCHA.png" },
  { nombre: "MELON", archivo: "img/melon.png" },
  { nombre: "MLK-CF", archivo: "img/MLK-CF.png" },
  { nombre: "NARANJADA", archivo: "img/naranjada.png" },
  { nombre: "SODA", archivo: "img/soda-rosa.png" },
  { nombre: "SOJA", archivo: "img/soja.png" },
  { nombre: "SPORT", archivo: "img/sport.png" },
  { nombre: "TÉ", archivo: "img/te.png" },
  { nombre: "UVA", archivo: "img/uva.png" }
];

// Referencias
let seleccionActual = 0;
let carritoBebidas = [];

const pantalla = document.getElementById("pantalla-seleccion");
const botonPush = document.getElementById("btn-dispensar");
const botonAgregar = document.getElementById("btn-agregar");
const zonaEntrega = document.getElementById("zona-entrega");

// Cargar pantalla inicial
pantalla.innerHTML = `
  <div class="contenido-pantalla">
    <span class="nombre-bebida">${productos[seleccionActual].nombre}</span>
  </div>
`;

// Botones de navegación
document.getElementById("btn-izq").addEventListener("click", () => {
  seleccionActual = (seleccionActual - 1 + productos.length) % productos.length;
  actualizarPantalla();
});

document.getElementById("btn-der").addEventListener("click", () => {
  seleccionActual = (seleccionActual + 1) % productos.length;
  actualizarPantalla();
});

// Botón AGREGAR bebida al carrito (sin mostrar check)
botonAgregar.addEventListener("click", () => {
  const bebidaSeleccionada = productos[seleccionActual];
  carritoBebidas.push(bebidaSeleccionada);

  // Efecto visual opcional al agregar
  pantalla.classList.add('parpadeo-agregado');
  setTimeout(() => pantalla.classList.remove('parpadeo-agregado'), 400);
});

// Botón PUSH (entrega bebidas)
botonPush.addEventListener("click", () => {
  if (carritoBebidas.length === 0) {
    zonaEntrega.innerHTML = "<p>Inserta una bebida primero 😉</p>";
    return;
  }

  // Animación PUSH
  botonPush.classList.add("animacion-push");
  setTimeout(() => botonPush.classList.remove("animacion-push"), 200);

  // Sonido
  sonidoDispensador.currentTime = 0;
  sonidoDispensador.play();

  // Mostrar mensaje de espera
  zonaEntrega.innerHTML = "<p>¡Ya casi!...</p>";
  zonaEntrega.classList.add("zona-entrega-activa");

  // Después de 5 segundos, mostrar bebidas
  setTimeout(() => {
    zonaEntrega.innerHTML = "";

    carritoBebidas.forEach(bebida => {
      const img = document.createElement("img");
      img.src = bebida.archivo;
      img.alt = bebida.nombre;
      img.classList.add("producto-animado");
      zonaEntrega.appendChild(img);
    });

    carritoBebidas = []; // Limpiar carrito
    zonaEntrega.classList.remove("zona-entrega-activa");
  }, 5000);

  // Reflejo animado en vitrina
  const vitrina = document.querySelector('.vitrina');
  vitrina.classList.add("reflejo-activo");
  setTimeout(() => vitrina.classList.remove("reflejo-activo"), 1300);
});

// Función para actualizar la pantalla con el nombre de la bebida
function actualizarPantalla() {
  const bebida = productos[seleccionActual];
  pantalla.innerHTML = `
    <div class="contenido-pantalla">
      <span class="nombre-bebida">${bebida.nombre}</span>
    </div>
  `;
}
