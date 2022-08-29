import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  // Interaccion con la db
  // el metodo fetch busca un dato en la db y lo escribe en nuestro user
  fetch(id: number): AxiosPromise {

    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      //actualiza el usuario mediante un PUT
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      //crea un usuario mediante un POST
      return axios.post(this.rootUrl, data);
    }
  }
}