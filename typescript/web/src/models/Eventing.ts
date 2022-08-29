type Callback = () => void; // Si ponemos {} se esperaria un objeto

export class Eventing {
    //Creo una propiedad events la cual va a almacenar todos los eventos que generemos con sus nombres y la funcion callback asociada
    events: { [key: string]: Callback[] } = {};
  // Eventos

  // Observacion: el metodo on se cambia de on(eventName: string, callback: Callback): void {} a una arrow function
  // porque el this tiene que hacer referencia a Eventing. si se lo dejaba como estaba, al llamar al evento desde afuera
  // el evento puede no haber sido inicializado por lo que daria un error del tipo "on no pertenece a undefined"
  on = (eventName: string, callback: Callback): void => {
    const handler = this.events[eventName] || []; //el evento puede ser undefined, en ese caso se devuelve un array vacio
    handler.push(callback); // se agrega el callback al array
    this.events[eventName] = handler; // se agrega a la lista de eventos el nuevo evento con su callback asociada
  }

  trigger(eventName: string): void {
    const handler = this.events[eventName];

    if (!handler || handler.length === 0) {
      return;
    }
    handler.forEach(callback => callback())
  }
}