export class UsuarioList {
  #usuarios;

  constructor() {
    this.#usuarios = [];
  }

  setUsuario(usuario) {
    const usuarioAgregado = this.#usuarios.some(
      (u) => u.getNombre() === usuario.getNombre()
    );
    if (!usuarioAgregado) {
      this.#usuarios.push(usuario);
    } else {
      throw new Error(`No se pudo agregar. ${usuario.getNombre()} ya está en la lista.`);
    }
  }

  getUsuarios() {
    return this.#usuarios;
  }
}