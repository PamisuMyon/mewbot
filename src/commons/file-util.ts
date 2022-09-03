import * as fs from 'fs';
import { promisify } from 'util';
import { logger } from './logger.js';
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const access = promisify(fs.access);

export class FileUtil {

    static async create(path: string) {
        const arr = path.split('/');
        let dir = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (!(await this.exists(dir))) {
                await mkdir(dir);
            }
            dir = dir + '/' + arr[i];
        }
        await writeFile(path, '');
    }

    static async read(path: string) {
        if (await this.exists(path))
            return await readFile(path);
        return;
    }

    static async readJson(path: string, log = true) {
        if (!(await FileUtil.exists(path))) {
            if (log)
                logger.error(`${path} not found.`);
            return;
        }
        const raw = (await FileUtil.read(path))?.toString();
        try {
            return JSON.parse(raw!);
        } catch(err) {
            if (log)
                logger.error(`${path}: incorrect format.`);
        }
        return;
    }

    static async write(path: string, data: string) {
        if (!(await this.exists(path)))
            await this.create(path);
        await writeFile(path, data);
    }

    static async delete(path: string) {
        if (await this.exists(path))
            await unlink(path);
    }

    static async exists(path: string) {
        try {
            return await access(path) == null;
        } catch (error) {
            return false;
        }
    }

}
