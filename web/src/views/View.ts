import { Model } from '../models/Model';

// En este caso, View tiene parametros del tipo Model, que necesita un atributo del tipo K para saber cuales son esos parametros.
// El problema de hacer una generalizacion de otra generalizacion es que se necesita saber cuales parametros usa cada una.
// Pero esto lo define la clase hija en este caso
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element} = {};

  constructor(public parent: Element, public model: T) {
    // Para poder captar los cambios realizados en set-age (o cualquier otro eventos)
    // Se toma del modelo el evento 'change' y se lanza el render, que va a mostrar todos los cambios realizados
    this.bindModel(); 
  };

  abstract template(): string;


  regionsMap(): { [key: string]: string } {
    return {};
  };

  eventsMap(): { [key: string]: () => void } {
    return {};
  };

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    })
  }

  bindEvents(fragment: DocumentFragment): void {
    // tomo la referencia al eventMap
    const eventsMap = this.eventsMap();

    // Separo el evento en nombre y elemento asociado
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      // busco todos los elementos del fragmento y le asocio el evento correspondiente al eventKey.
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      })
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for( let key in regionsMap ) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender():void {}

  // render() transforma el string que tenemos en template y lo transforma en un elemento nuevo de parent,
  // cuyo contenido es un html definido en template como un string.
  render(): void {
    // borro el HTML para que no se vayan sumando elementos hijos
    this.parent.innerHTML = '';

    // Agrego un nuevo elemento hijo
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    
    this.onRender();

    this.parent.appendChild(templateElement.content);
  }
}