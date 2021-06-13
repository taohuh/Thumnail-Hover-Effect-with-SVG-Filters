import { Cursor } from './cursor';
import { Item } from './item';

const cursor = new Cursor(document.querySelector('.cursor'));

[...document.querySelectorAll('.item')].forEach((item) => {
  return new Item(item);
});