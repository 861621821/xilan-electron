import fs from './fs';

export const getScript = async () => {
  const res = await fs.readFile('./build/main/static/script.json');
  return JSON.parse(res)
}