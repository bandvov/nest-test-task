import * as fs from 'fs';
import * as path from 'path';
export const checkFileAlreadyAdded = (fileName: string) => {
  return fs.readdirSync(path.join(process.cwd(), 'uploads')).some((name) => {
    return name === fileName;
  });
};
