import { Util } from "../src/commons/utils.js";

export const nodes = {
    not_a_robot: '100554577263091712',
};

export const topics = {
    '🍄': '219353468583456768',      // 不是机器人 > 🍄
};

export class Sleeper {
    sleepTime = 0;

    async sleepAcc(next = 500) {
        Util.sleep(this.sleepTime);
        this.sleepTime += next;
    }

    async sleep(interval = 500) {
        Util.sleep(interval);
    }

}
