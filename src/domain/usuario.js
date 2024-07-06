export class Usuario {
    #nombre;
    #email;
    #telefono;
    #tipo;
    constructor(nombre, email, telefono, tipo) {
        this.#nombre = nombre;
        this.#email = email;
        this.#telefono = telefono;
        this.#tipo = tipo;
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

    getEmail() {
        return this.#email;
    }

    setEmail(nuevoEmail) {
        nuevoEmail = nuevoEmail.trim();
        if (nuevoEmail.length === 0) {
          throw new Error("El mail no puede estar vacío.");
        }
        this.#email = nuevoEmail;
    }

    getTelefono() {
        return this.#telefono;
    }

    setTelefono(nuevoTelefono) {
        if (typeof (nuevoTelefono) !== 'number' || isNaN(nuevoTelefono)) {
            throw new Error("El telefono debe ser un número.");
          }
        
        this.#telefono = nuevoTelefono;
    }

    getTipo() {
        return this.#tipo;
    }

    setTipo(nuevoTipo) {
        nuevoTipo = nuevoTipo.trim();
        
        if (nuevoTipo.length === 0) {
            throw new Error("El tipo no puede estar vacío.");
          }
        const tiposPermitidos = ["Veterinaria", "Perrera", "Refugio", "Individual", "Adoptante"];
        if (!tiposPermitidos.includes(nuevoTipo)) {
            throw new Error(`Tipo inválido. Los tipos permitidos son: Veterinaria, Perrera, Refugio, Individual o Adoptante`);
        }
        this.#tipo = nuevoTipo;
    }
    toString() {
        return `Usuario: ${this.#nombre}, Tipo: ${this.#tipo}`;
    }
}