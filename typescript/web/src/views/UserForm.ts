import { User, UserProps } from '../models/User';
import { View } from '../views/View';

export class UserForm extends View<User, UserProps> {
  // EventMap se define como una funcion que devuelve un objeto con los eventos en formato string ('accion:elemento')
  // como keys del objeto y la funcion asociada a este evento en formato Function
  eventsMap(): { [key: string] : () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    }
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;

      this.model.set({ name })
    }
  }

  onSaveClick = (): void  => {
    this.model.save();
  }
  template(): string {
    return `
      <div>
        <h1>UserFrom</h1>
        <input placeholder="NAME"/>
        <button class="set-name">Change name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save user</button>
      </div>
    `
  }
}