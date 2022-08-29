import { AxiosPromise, AxiosResponse } from "axios";

// La interfaz tambien puede hacerse generica
interface ModelAttribute<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id:number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttribute<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  // la sintaxis reducida para el metodo get on()... solo puede hacerse si en el constructor se pasa el parametro events.
  // si no se lo pasa de esta forma, la sintaxis reducida se toma antes de lo que pongamos dentro de las llaves del constructor
  // por lo que se llamaria a un events antes de ser definido
  // get on() {
  //   return this.events.on;
  // }
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse):void => {
      this.set(response.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((response: AxiosResponse):void => {
      this.trigger('save');
    })
    .catch(() => { this.trigger('error')})
  }
}
