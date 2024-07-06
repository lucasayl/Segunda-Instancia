import { describe, it, expect, beforeEach } from '@jest/globals';
import { Mascota } from './mascotas.js';
import { Usuario } from './usuario.js';

describe('Mascota', () => {
  let miUsuario;
  let miMascota;

  beforeEach(() => {
    miUsuario = new Usuario('Lucas', 'lucas@gmail.com', 123456789, 'Individual');
    miMascota = new Mascota('Firulais', 3, 'Mediano', 'Perro', 'Labrador', 'Una historia interesante', 'foto.jpg', miUsuario);});

  it('devuelve el nombre correcto', () => {
    expect(miMascota.getNombre()).toBe('Firulais');
  });

  it('establece y devuelve el nombre correcto', () => {
    miMascota.setNombre('Max');
    expect(miMascota.getNombre()).toBe('Max');
  });

  it('nombre no puede estar vacío', () => {
    expect(() => miMascota.setNombre('')).toThrow('El nombre no puede estar vacío.');
  });

  it('devuelve la edad correcta', () => {
    expect(miMascota.getEdad()).toBe(3);
  });

  it('establece y devuelve la edad correcta', () => {
    miMascota.setEdad(5);
    expect(miMascota.getEdad()).toBe(5);
  });

  it('edad debe ser un número', () => {
    expect(() => miMascota.setEdad('cinco')).toThrow('La edad debe ser un número.');
  });

  it('lanza un error si la edad es negativa o menor a uno', () => {
    const mascota = new Mascota('Firulais', 3, 'Mediano', 'Perro', 'Labrador', 'Una historia interesante', 'foto.jpg', miUsuario);
    expect(() => mascota.setEdad(0)).toThrow('La edad no puede ser negativa ni menor a uno.');
    expect(() => mascota.setEdad(-1)).toThrow('La edad no puede ser negativa ni menor a uno.');
});

  it('devuelve el tamaño correcto', () => {
    expect(miMascota.getTamaño()).toBe('Mediano');
  });

  it('establece y devuelve el tamaño correcto', () => {
    miMascota.setTamaño('Grande');
    expect(miMascota.getTamaño()).toBe('Grande');
  });

  it('tamaño no puede estar vacío', () => {
    expect(() => miMascota.setTamaño('')).toThrow('El tamaño no puede estar vacío.');
  });

  it('tamaño debe ser permitido', () => {
    expect(() => miMascota.setTamaño('Gigante')).toThrow('Tamaño inválido. Los tamaños permitidos son: Pequeño, Mediano o Grande');
  });

  it('devuelve la raza correcta', () => {
    expect(miMascota.getRaza()).toBe('Labrador');
  });

  it('establece y devuelve la raza correcta', () => {
    miMascota.setRaza('Golden Retriever');
    expect(miMascota.getRaza()).toBe('Golden Retriever');
  });

  it('raza no puede estar vacía', () => {
    expect(() => miMascota.setRaza('')).toThrow('La raza no puede estar vacía.');
  });

  it('raza debe ser una cadena de texto', () => {
    expect(() => miMascota.setRaza(123)).toThrow('La raza no debe ser un número.');
  });

  it('devuelve la historia correcta', () => {
    expect(miMascota.getHistoria()).toBe('Una historia interesante');
  });

  it('establece y devuelve la historia correcta', () => {
    miMascota.setHistoria('Una nueva historia');
    expect(miMascota.getHistoria()).toBe('Una nueva historia');
  });

  it('historia no puede estar vacía', () => {
    expect(() => miMascota.setHistoria('')).toThrow('La historia no puede estar vacía.');
  });

  it('historia debe ser una cadena de texto', () => {
    expect(() => miMascota.setHistoria(123)).toThrow('La historia debe ser un texto.');
  });

  it('devuelve el usuario correcto', () => {
    expect(miMascota.getUsuario()).toBe(miUsuario);
  });

  it('establece y devuelve el usuario correcto', () => {
    const nuevoCuidador = new Usuario('Rodrigo', 'rodrigo@gmail.com', 987654321, 'Veterinario');
    miMascota.setUsuario(nuevoCuidador);
    expect(miMascota.getUsuario()).toBe(nuevoCuidador);
  });

  it('lanza un error si se pasa un tipo de dato incorrecto como usuario', () => {
    expect(() => miMascota.setUsuario('no soy un objeto Usuario')).toThrow('El usuario debe ser una instancia de Usuario.');
    expect(() => miMascota.setUsuario(12345)).toThrow('El usuario debe ser una instancia de Usuario.');
    expect(() => miMascota.setUsuario(null)).toThrow('El usuario debe ser una instancia de Usuario.');
  });

  it('devuelve el tipo correcto', () => {
    expect(miMascota.getTipo()).toBe('Perro');
  });

  it('lanza un error si el nombre de la foto no es un texto', () => {
    expect(() => miMascota.setFoto(123)).toThrow('El nombre de la foto debe ser un texto.');
  });
  
  it('lanza un error si se intenta establecer un tipo vacío', () => {
    expect(() => miMascota.setTipo('')).toThrow('El tipo no puede estar vacío.');
  });

  it('lanza un error si se intenta establecer un tipo inválido', () => {
    expect(() => miMascota.setTipo('Gatito')).toThrow('Tipo inválido. Los tipos permitidos son: Perro o Gato.');
  });

  it('devuelve la foto correcta', () => {
    expect(miMascota.getFoto()).toBe('foto.jpg');
  });

  it('establece y devuelve la foto correcta', () => {
    miMascota.setFoto('nuevaFoto.jpg');
    expect(miMascota.getFoto()).toBe('nuevaFoto.jpg');
  });

  it('nombre de la foto no puede estar vacío', () => {
    expect(() => miMascota.setFoto('')).toThrow('El nombre de la foto no puede estar vacío.');
  });

  it('toString()', () => {
    expect(miMascota.toString()).toBe('Mascota: Firulais, Edad: 3 años, Tamaño: Mediano, Raza: Labrador, Historia: Una historia interesante, Tipo: Perro, Usuario: Lucas');
  });
});