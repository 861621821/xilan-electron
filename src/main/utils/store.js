import fs from 'fs';

export const getStore = async (key, def) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./build/main/static/store.json`, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        fs.writeFile(`./build/main/static/store.json`, '{}', (err) => { })
      }
      const store = JSON.parse(data || '{}');
      resolve(store[key] || def);
    });
  })
}

export const setStore = async (key, value) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./build/main/static/store.json`, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      const store = JSON.parse(data) || {};
      store[key] = value;
      fs.writeFile(`./build/main/static/store.json`, JSON.stringify(store), (err) => {
        if (err) {
          reject()
        }
        resolve(true);
      });
    });
  })
}