import * as fs from 'fs'
import * as path from 'path'
import {Storage} from './storage'

/** List all files by path */
export default async (storage: Storage): Promise<void> => {
  const stats = await fs.promises.stat(storage.at);
  await lookAt(stats, '', storage);
}

/** Walk over a directory */
const walkDir = async (dir: string, storage: Storage): Promise<void> => {
  const dirents = await fs.promises.readdir(
    storage.join(dir),
    {withFileTypes: true}
  );
  for (const ent of dirents) {
    const name = path.join(dir, ent.name);
    await lookAt(ent, name, storage);
  }
}

/** Route on entity */
const lookAt = async (ent: fs.Dirent | fs.Stats, name: string, storage: Storage): Promise<void> => {
  if (ent.isFile()) {
    await storage.onFile(name);
  }
  else if (ent.isDirectory()) {
    await walkDir(name, storage);
  }
  else {
    throw new Error(`Unknown object ${name}`);
  }
}