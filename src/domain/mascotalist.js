export class MascotaList {
    #mascotas;
  
    constructor() {
        this.#mascotas = [];
    }
  
    setMascota(mascota) {
        const mascotaAgregada = this.#mascotas.some(
            (p) => p.getNombre() === mascota.getNombre()
        );
        if (!mascotaAgregada) {
            this.#mascotas.push(mascota);
        } else {
            throw new Error(`No se pudo agregar. ${mascota.getNombre()} ya está en la lista.`);
        }
    }
  
    getMascota() {
        return this.#mascotas;
    }
    obtenerMascotasFiltradas(edad, tipo, tamaño) {
      return this.#mascotas.filter(mascota => {
          const cumpleEdad = !edad || mascota.getEdad() === edad;
          const cumpleTipo = !tipo || mascota.getTipo() === tipo;
          const cumpleTamaño = !tamaño || mascota.getTamaño() === tamaño;
          
          return cumpleEdad && cumpleTipo && cumpleTamaño;
      });
  }
  }