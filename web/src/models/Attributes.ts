
export class Attributes<T> {
  constructor(private data: T) {}
  
    // Para evitar tener que agregarle tipos distintos a la respuesta del metodo se usa un generico.
    // En este caso se lee de la siguiente forma:
    // Cuando se llama al metodo get, se le debe pasar el tipo de dato K que se va a usar como key que proviene del dato generico T
    // pasado como parametro a la clase.
    // En este caso T es el tipo de dato definido por UserProp={ id: number, name: string, age: number,} 
    // y K es uno de las claves usadas en T (id, name o age).
    // La respuesta de este metodo es del tipo T[K], esto es, la respuesta toma el tipo de dato de lo que le correspondería
    // a la clave K dentro de T (number, string o number)
    get = <K extends keyof T>(key: K): T[K] => {
      return this.data[key];
    }
  /**
   * Modifica alguna de las propiedades del usuario
   * @param update 
   */
    set(update: T): void {
      Object.assign(this.data, update); // copia los datos de update en this.data
    }

    getAll(): T {
      return this.data;
    }
}