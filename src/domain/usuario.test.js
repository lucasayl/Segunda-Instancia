import { describe, it, expect, beforeEach } from '@jest/globals';
import {Usuario} from './usuario.js';

describe('Usuario', () => {
  let miUsuario;

  beforeEach(() => {
    miUsuario = new Usuario('Lucas', 'lucas@gmail.com', 123456789, 'Individual');
  });

  it('devuelve el nombre correcto', () => {
    expect(miUsuario.getNombre()).toBe('Lucas');
  });

  it('establece y devuelve el nombre correcto', () => {
    miUsuario.setNombre('Mateo');
    expect(miUsuario.getNombre()).toBe('Mateo');
  });

  it('nombre no puede estar vacío', () => {
    expect(() => miUsuario.setNombre('')).toThrow('El nombre no puede estar vacío.');
  });

  it('devuelve el email correcto', () => {
    expect(miUsuario.getEmail()).toBe('lucas@gmail.com');
  });

  it('establece y devuelve el email correcto', () => {
    miUsuario.setEmail('Mateo@gmail.com');
    expect(miUsuario.getEmail()).toBe('Mateo@gmail.com');
  });

  it('email no puede estar vacío', () => {
    expect(() => miUsuario.setEmail('')).toThrow('El mail no puede estar vacío.');
  });

  it('devuelve el teléfono correcto', () => {
    expect(miUsuario.getTelefono()).toBe(123456789);
  });

  it('establece y devuelve el teléfono correcto', () => {
    miUsuario.setTelefono(987654321);
    expect(miUsuario.getTelefono()).toBe(987654321);
  });

  it('teléfono debe ser un número', () => {
    expect(() => miUsuario.setTelefono('hola')).toThrow('El telefono debe ser un número.');
  });

  it('devuelve el tipo correcto', () => {
    expect(miUsuario.getTipo()).toBe('Individual');
  });

  it('establece y devuelve el tipo correcto', () => {
    miUsuario.setTipo('Adoptante');
    expect(miUsuario.getTipo()).toBe('Adoptante');
  });

  it('tipo no puede estar vacío', () => {
    expect(() => miUsuario.setTipo('')).toThrow('El tipo no puede estar vacío.');
  });

  it('tipo debe ser permitido', () => {
    expect(() => miUsuario.setTipo('Algo')).toThrow('Tipo inválido. Los tipos permitidos son: Veterinaria, Perrera, Refugio, Individual o Adoptante');
  });

  it('toString()', () => {
    expect(miUsuario.toString()).toBe('Usuario: Lucas, Tipo: Individual');
  });
});