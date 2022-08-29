import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

// const numberCollection = new NumbersCollection([10, -20, -5, 0])
// numberCollection.sort();
// console.log(numberCollection.data);

// const characterCollection = new CharactersCollection('Marcos Oscar Frigerio')
// characterCollection.sort();
// console.log(characterCollection.data);

const linkedList = new LinkedList();
linkedList.add(10);
linkedList.add(20);
linkedList.add(5);
linkedList.add(-6);
linkedList.print();
linkedList.sort();
linkedList.print();