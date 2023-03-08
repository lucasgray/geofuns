import { promises as fs } from 'fs';

/**
 * Dao that is backed by a file. Doesn't support mutation.
 */
export default class FilebasedDao<T> {
  private readonly relToScripts = './../../scripts/datagen/';
  private readonly path: string;

  public constructor(pathInsideDatagen: string) {
    this.path = this.relToScripts + pathInsideDatagen;

    var currentPath = process.cwd();
    console.log(currentPath);
  }

  /**
   * Risky-but-easy - read from a file assumed to be structured as a
   * json array with the exact fieldset given in T
   *
   * @return the data, typed and wrapped in a Promise
   */
  public async get(): Promise<T[]> {
    const data = await fs.readFile(this.path);
    return JSON.parse(data.toString()) as unknown as T[];
  }
}
