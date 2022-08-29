import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    // Vacio el parent para no acumular elementos
    this.parent.innerHTML = '';

    // Creo un nuevo template
    const templateElement = document.createElement('template');

    // Itero dentro de los modelos de la colección
    for(let model of this.collection.models) {
      // creo un elemento nuevo por cada modelo
      const itemParent = document.createElement('div');
      // hago un render de ese modelo
      this.renderItem(model, itemParent);
      // Lo agrego a la lista de elementos renderizados de la colección
      templateElement.content.append(itemParent);
    }
    // Agrego la lista de elementos al template general
    this.parent.append(templateElement.content);
  }
}