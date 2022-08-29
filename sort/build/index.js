"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = require("./LinkedList");
// const numberCollection = new NumbersCollection([10, -20, -5, 0])
// numberCollection.sort();
// console.log(numberCollection.data);
// const characterCollection = new CharactersCollection('Marcos Oscar Frigerio')
// characterCollection.sort();
// console.log(characterCollection.data);
var linkedList = new LinkedList_1.LinkedList();
linkedList.add(10);
linkedList.add(20);
linkedList.add(5);
linkedList.add(-6);
linkedList.print();
linkedList.sort();
linkedList.print();
