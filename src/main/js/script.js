import fs from './fs';

export const getScript = async () => {
  const res = await fs.readFile('./build/renderer/data/script.json');
  return JSON.parse(res)
}