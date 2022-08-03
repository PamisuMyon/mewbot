import { Util } from "../src/commons/utils";

export const nodes = {
    not_a_robot: '100554577263091712',
};

export const topics = {
    '🍄': '219353468583456768',      // 不是机器人 > 🍄
};

export class Sleeper {
    sleepTime = 0;

    async sleep() {
        Util.sleep(this.sleepTime);
        this.sleepTime += 500;
    }

}
