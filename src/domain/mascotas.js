import { Usuario } from '../domain/usuario.js';

export class Mascota {
    #nombre;
    #edad;
    #tamaño;
    #raza;
    #historia;
    #usuario;
    #foto;
    #tipo;

    constructor(nombre, edad, tamaño, tipo, raza, historia, foto, usuario) {
        this.setNombre(nombre);
        this.setEdad(edad);
        this.setTamaño(tamaño);
        this.setTipo(tipo);
        this.setRaza(raza);
        this.setHistoria(historia);
        this.setFoto(foto);
        this.setUsuario(usuario);
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nuevoNombre) {
        nuevoNombre = nuevoNombre.trim();
        if (nuevoNombre.length === 0) {
            throw new Error("El nombre no puede estar vacío.");
        }
        this.#nombre = nuevoNombre;
    }

    getEdad() {
        return this.#edad;
    }

    setEdad(nuevaEdad) {
        if (typeof nuevaEdad !== 'number' || isNaN(nuevaEdad)) {
            throw new Error("La edad debe ser un número.");
        }
        if (nuevaEdad < 1) {
            throw new Error("La edad no puede ser negativa ni menor a uno.");
        }
        this.#edad = nuevaEdad;
    }    

    getTamaño() {
        return this.#tamaño;
    }

    setTamaño(nuevoTamaño) {
        nuevoTamaño = nuevoTamaño.trim();
        if (nuevoTamaño.length === 0) {
            throw new Error("El tamaño no puede estar vacío.");
        }
        const tiposPermitidos = ["Pequeño", "Mediano", "Grande"];
        if (!tiposPermitidos.includes(nuevoTamaño)) {
            throw new Error(`Tamaño inválido. Los tamaños permitidos son: Pequeño, Mediano o Grande.`);
        }
        this.#tamaño = nuevoTamaño;
    }

    getTipo() {
        return this.#tipo;
    }

    setTipo(nuevoTipo) {
        nuevoTipo = nuevoTipo.trim();
        if (nuevoTipo.length === 0) {
            throw new Error("El tipo no puede estar vacío.");
        }
        const tiposPermitidos = ["Perro", "Gato"];
        if (!tiposPermitidos.includes(nuevoTipo)) {
            throw new Error(`Tipo inválido. Los tipos permitidos son: Perro o Gato.`);
        }
        this.#tipo = nuevoTipo;
    }

    getRaza() {
        return this.#raza;
    }

    setRaza(nuevaRaza) {
        if (typeof nuevaRaza !== 'string') {
            throw new Error("La raza no debe ser un número.");
        }
        if (nuevaRaza.length === 0) {
            throw new Error("La raza no puede estar vacía.");
        }
        this.#raza = nuevaRaza;
    }

    getHistoria() {
        return this.#historia;
    }

    setHistoria(nuevaHistoria) {
        if (typeof nuevaHistoria !== 'string') {
            throw new Error("La historia debe ser un texto.");
        }
        if (nuevaHistoria.trim().length === 0) {
            throw new Error("La historia no puede estar vacía.");
        }
        this.#historia = nuevaHistoria;
    }

    getUsuario() {
        return this.#usuario;
    }

    setUsuario(nuevoUsuario) {
        if (!(nuevoUsuario instanceof Usuario)) {
            throw new Error("El usuario debe ser una instancia de Usuario.");
        }
        this.#usuario = nuevoUsuario;
    }

    getFoto() {
        return this.#foto;
    }
    setFoto(nuevaFoto) {
        if (typeof nuevaFoto !== 'string') {
            throw new Error("El nombre de la foto debe ser un texto.");
        }
        if (nuevaFoto.trim().length === 0) {
            throw new Error("El nombre de la foto no puede estar vacío.");
        }
        this.#foto = nuevaFoto;
    }
    toString() {
        return `Mascota: ${this.#nombre}, Edad: ${this.#edad} años, Tamaño: ${this.#tamaño}, Raza: ${this.#raza}, Historia: ${this.#historia}, Tipo: ${this.#tipo}, Usuario: ${this.#usuario.getNombre()}`;
    }
}
