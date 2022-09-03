import got from "got";
import * as fs from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';
import { FileUtil } from "./file-util.js";
import { logger, LogLevel } from "./logger.js";

export class NetUtil {

    static pipeline = promisify(stream.pipeline);

    static async download(url: string, filePath: string, timeout = 360000) {
        try {
            FileUtil.create(filePath);
            logger.debug('Start downloading of file: ' + url);
            const options = { 
                timeout: { 
                    request: timeout 
                } 
            };
            await this.pipeline(got.stream(url, options), fs.createWriteStream(filePath));
            logger.debug('File downloaded: ' + filePath);
            return filePath;
        } catch (err) {
            logger.dir(err, LogLevel.Error);
        }
        return;
    }

}