import got from "got";

export class Util {

    static dateFormat(fmt: string, date: Date) {
        let ret;
        const opt: any = {
            "Y+": date.getFullYear().toString(),
            "m+": (date.getMonth() + 1).toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "M+": date.getMinutes().toString(),
            "S+": date.getSeconds().toString()
        };
        for (const k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
            }
        }
        return fmt;
    }

    static stringFormat(str: string, ...args: any): string | undefined {
        if (args.length == 0)
            return;
        for (let i = 0; i < args.length; i++) {
            const re = new RegExp('\\{' + i + '\\}', 'gm');
            str = str.replace(re, args[i]);
        }
        return str;
    }


    static randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    /**
    * 生成Number once
    * @returns nonce
    */
    static nonce(): string {
        // 70750674933161984
        let n = '';
        for (let i = 0; i < 17; i++) {
            n += Util.randomInt(0, 9);
        }
        return n;
    }

    static sleep(timeout: number) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    static async isUrlAlive(url: string, timeout = 1000, retry = 0) {
        return new Promise((resolve: (alive: boolean) => void) => {
            const p = got.get(url, {
                timeout: { request: timeout },
                retry: { limit: retry }
            });
            let isAlive = false;
            p.on('response', (r: any) => {
                if (r.statusCode == 200)
                    isAlive = true;
                p.cancel('Success');
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }).catch((err: any) => {
            }).finally(() => {
                resolve(isAlive);
            });
        });
    }

}
