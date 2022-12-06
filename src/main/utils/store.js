import fs from 'fs';

class Store {
  #data = {};
  constructor() {
    fs.readFile(`./build/main/static/store.json`, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      this.#data = JSON.parse(data);
    });
  };
  get(key, def) {
    return this.#data[key] || def
  };
  set(key, value) {
    this.#data[key] = value;
    fs.writeFile(`./build/main/static/store.json`, JSON.stringify(this.#data), (err) => { });
  };
}

export default Store;