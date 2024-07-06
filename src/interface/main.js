import { Mascota } from "../domain/mascotas.js";
import { Usuario } from "../domain/usuario.js";
import { UsuarioList } from "../domain/usuariolist.js";
import { MascotaList } from "../domain/mascotalist.js";

const listaMascota = new MascotaList();
const listaUsuario = new UsuarioList();

listaUsuario.setUsuario(new Usuario('Lucas', 'lucas@gmail.com', 123456789, 'Individual'));
listaUsuario.setUsuario(new Usuario('Maria', 'maria@gmail.com', 987654321, 'Veterinaria'));
listaUsuario.setUsuario(new Usuario('Juan', 'juan@gmail.com', 456789123, 'Refugio'));

const mascotasPrecargadas = [
  new Mascota('Jose', 3, 'Mediano', 'Perro', 'Golden', 'Muy juguetón y cariñoso','Perrito1.jpg',listaUsuario.getUsuarios()[0]),
  new Mascota('Juancho', 2, 'Pequeño', 'Perro', 'Rottwailer', 'Le encanta dormir y jugar con pelotas','Perrito2.jpg', listaUsuario.getUsuarios()[1]),
  new Mascota('Alfredo', 1, 'Mediano', 'Perro', 'Doberman', 'Rescatado de la calle, necesita mucho amor','Perrito3.jpg', listaUsuario.getUsuarios()[2]),
  new Mascota('Lucas', 2, 'Pequeño', 'Gato', 'Callejero', 'Es muy curioso y le gusta estar con personas',  'Gatito1.jpg',listaUsuario.getUsuarios()[0])
];


mascotasPrecargadas.forEach(mascota => listaMascota.setMascota(mascota));

function cargarUsuarios() {
  const usuarios = listaUsuario.getUsuarios();
  const selectUsuario = document.getElementById('usuario');
  selectUsuario.innerHTML = '<option value="">Selecciona el usuario</option>';

  usuarios.forEach((usuario, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = usuario.getNombre();
    selectUsuario.appendChild(option);
  });
}

function loadMascotas() {
  const edad = parseInt(document.getElementById('filtroEdad').value);
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  const tamaño = document.querySelector('input[name="tamano"]:checked')?.value;

  const mascotas = listaMascota.obtenerMascotasFiltradas(edad, tipo, tamaño);
  let secMascotas = document.getElementById('secMascotas');
  secMascotas.innerHTML = '';

  mascotas.forEach(mascota => {
    let col = document.createElement('div');
    col.classList.add('col-md-3', 'mb-3');

    let card = document.createElement('div');
    card.classList.add('card');
    card.style.cursor = 'pointer'; 
    card.addEventListener('click', function() {
      handleClickMascota(mascota); 
    });

    let img = document.createElement('img');
    img.src = `../img/${mascota.getFoto()}`;
    img.alt = ""+ mascota.getNombre() + "" + mascota.getTipo();
    img.classList.add('card-img-top');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.textContent = mascota.getNombre();

    let texto = document.createElement('p');
    texto.classList.add('card-text');
    texto.textContent = `Edad: ${mascota.getEdad()} años`;

    cardBody.appendChild(titulo);
    cardBody.appendChild(texto);

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);
    secMascotas.appendChild(col);
  });
}

function cargarDetalleMascota(mascota) {
  const detalleNombre = document.getElementById('detalle-nombre');
  const detalleEdad = document.getElementById('detalle-edad');
  const detalleTipo = document.getElementById('detalle-tipo');
  const detalleTamaño = document.getElementById('detalle-tamaño');
  const detalleHistoria = document.getElementById('detalle-historia');
  const detalleImagen = document.getElementById('detalle-imagen');

  detalleNombre.textContent = mascota.getNombre();
  detalleEdad.textContent = `Edad: ${mascota.getEdad()} años`;
  detalleTipo.textContent = `Raza: ${mascota.getRaza()}`;
  detalleTamaño.textContent = `Tamaño: ${mascota.getTamaño()}`;
  detalleImagen.src = `../img/${mascota.getFoto()}`;
  detalleHistoria.innerHTML = `<strong>Historia:</strong><br>${mascota.getHistoria()}`;


  const detalleMascota = document.getElementById('detalle-mascota');
  detalleMascota.classList.remove('d-none');
  detalleMascota.classList.add('d-block');

  const listaMascotas = document.getElementById('lista-mascotas');
    listaMascotas.classList.remove('d-block');
    listaMascotas.classList.add('d-none');
}

function handleClickMascota(mascota) {
  cargarDetalleMascota(mascota);
}

document.getElementById('boton-adoptar').addEventListener('click', function() {
  const nombreMascota = document.getElementById('detalle-nombre').textContent.trim();
  adoptarMascota(nombreMascota); 
});

document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  loadMascotas();

  const formularioMascotas = document.getElementById('formularioMascotas');
formularioMascotas.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nombreMascota = document.getElementById('nombreMascota').value;
    const tipoMascota = document.getElementById('tipoMascota').value;
    const edadMascota = parseInt(document.getElementById('edadMascota').value);
    const usuarioIndex = parseInt(document.getElementById('usuario').value);
    const tamañoMascota = document.getElementById('tamañoMascota').value;
    const historiaMascota = document.getElementById('historiaMascota').value;
    const razaMascota = document.getElementById('razaMascota').value; 
    const fotoMascotaInput = document.getElementById('fotoMascota');

    if (isNaN(usuarioIndex) || usuarioIndex < 0 || usuarioIndex >= listaUsuario.getUsuarios().length) {
        alert("Selecciona un usuario válido.");
        return;
    }

    const usuario = listaUsuario.getUsuarios()[usuarioIndex];

    if (!fotoMascotaInput.files || fotoMascotaInput.files.length === 0) {
        alert("Selecciona una foto para la mascota.");
        return;
    }

    const fotoMascotaFile = fotoMascotaInput.files[0];
    const fotoMascotaNombre = fotoMascotaFile.name;

    try {
        const nuevaMascota = new Mascota(nombreMascota, edadMascota, tamañoMascota, tipoMascota, razaMascota, historiaMascota, fotoMascotaNombre, usuario);
        listaMascota.setMascota(nuevaMascota);

        formularioMascotas.reset();
        loadMascotas();
        cargarUsuarios();
    } catch (error) {
        alert(error.message);
    }
});

  const formularioRegistro = document.getElementById('registro-entidades');
  formularioRegistro.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreEntidad = document.getElementById('nombreEntidad').value;
    const tipoEntidad = document.getElementById('tipoEntidad').value;
    const direccionEntidad = document.getElementById('direccionEntidad').value;
    const telefonoEntidad = document.getElementById('telefonoEntidad').value;
    const emailEntidad = document.getElementById('emailEntidad').value;

    let nuevoUsuario;
    switch (tipoEntidad) {
      case 'Refugio':
        nuevoUsuario = new Usuario(nombreEntidad, emailEntidad, telefonoEntidad, 'Refugio', direccionEntidad);
        break;
      case 'Perrera':
        nuevoUsuario = new Usuario(nombreEntidad, emailEntidad, telefonoEntidad, 'Perrera', direccionEntidad);
        break;
      case 'Veterinaria':
        nuevoUsuario = new Usuario(nombreEntidad, emailEntidad, telefonoEntidad, 'Veterinaria', direccionEntidad);
        break;
      case 'Individual':
        nuevoUsuario = new Usuario(nombreEntidad, emailEntidad, telefonoEntidad, 'Individual', direccionEntidad);
      break;
      default:
        alert("Tipo de entidad inválido");
        return;
    }

    listaUsuario.setUsuario(nuevoUsuario);
    formularioRegistro.reset();
    cargarUsuarios();
  });
});

function añadirMensaje(mensaje, side) {
  const chat = document.getElementById('chat');
  const nuevoMensaje = document.createElement('div');
  nuevoMensaje.textContent = mensaje;
  nuevoMensaje.className = `mensaje ${side.toLowerCase()}`;
  chat.appendChild(nuevoMensaje);
  chat.scrollTop = chat.scrollHeight;
}

function mostrarMensajesPrecargados() {
  const precargados = [
      'Hola, ¿cómo estás?',
      '¿Te podríamos hacer un par de preguntas para poder verificar que seas la pareja perfecta para nuestro amigo?.',
  ];

  precargados.forEach(msg => añadirMensaje(msg, 'izquierda'));
}


document.getElementById('mensajeBoton').addEventListener('click', function() {
  const mensajeInput = document.getElementById('mensajeInput');
  const mensaje = mensajeInput.value;
  if (mensaje.trim() !== "") {
      añadirMensaje(mensaje, 'derecha');
      mensajeInput.value = '';
  }
});

document.getElementById('mensajeInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      document.getElementById('mensajeBoton').click();
  }
});

function adoptarMascota(nombreMascota) {
  const mascotaSeleccionada = listaMascota.getMascota().find(mascota => mascota.getNombre() === nombreMascota);
  if (!mascotaSeleccionada) {
    console.error('No se encontró la mascota seleccionada en la lista.');
    return;
  }
  
  const nombreUsuario = mascotaSeleccionada.getUsuario().getNombre();
  
  showSection('proceso-adopcion'); 
  document.getElementById('nombreUsuarioAdopta').textContent = nombreUsuario;
  añadirMensaje(`Hola, estoy interesado en adoptar a ${nombreMascota}. ¿Podemos comenzar el proceso de adopción?`, 'derecha');
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(function(section) {
      section.classList.add('d-none');
      section.classList.remove('d-block');
  });
  document.getElementById(sectionId).classList.remove('d-none');
  document.getElementById(sectionId).classList.add('d-block');
}

document.addEventListener('DOMContentLoaded', function() {
  const nombreMascotaInicial = document.getElementById('detalle-nombre').textContent.trim();
  mostrarMensajesPrecargados(nombreMascotaInicial);
});
var btnFiltrar = document.getElementById('filtrarBtn');

  btnFiltrar.addEventListener('click', function() {
        filtrarMascotas();
    });

document.getElementById('limpiarFiltrosBtn').addEventListener('click', function() {
  limpiarFiltros();
});
function limpiarFiltros() {
  document.getElementById('formularioFiltroMascotas').reset(); 
  showSection('lista-mascotas');
  loadMascotas();
}

function filtrarMascotas() {
  const edad = parseInt(document.getElementById('filtroEdad').value);
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  const tamaño = document.querySelector('input[name="tamano"]:checked')?.value;

  const mascotasFiltradas = listaMascota.obtenerMascotasFiltradas(edad, tipo, tamaño);
  mostrarResultados(mascotasFiltradas);
  showSection('lista-mascotas');
  loadMascotas();
}

function mostrarResultados(mascotas) {
  let secMascotas = document.getElementById('secMascotas');
  secMascotas.innerHTML = '';

  mascotas.forEach(mascota => {
    let col = document.createElement('div');
    col.classList.add('col-md-3', 'mb-3');

    let card = document.createElement('div');
    card.classList.add('card', 'h-100');
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      handleClickMascota(mascota);
    });

    let img = document.createElement('img.alt');
    img.src = `../img/${mascota.getFoto()}`;
    img.alt = `${mascota.getNombre()} - ${mascota.getTipo()} - ${mascota.getRaza()} - Edad: ${mascota.getEdad()} años`;
    img.classList.add('card-img-top');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.textContent = mascota.getNombre();

    let texto = document.createElement('p');
    texto.classList.add('card-text');
    texto.textContent = `Edad: ${mascota.getEdad()} años`;

    cardBody.appendChild(titulo);
    cardBody.appendChild(texto);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    secMascotas.appendChild(col);
  });
}