import assert from "assert";
import { Util } from "../src/commons/utils.js";
import { Stamps } from "../src/index.js";
import { Sleeper, topics } from "./commons.js";
import { getMewClient } from "./my-client.js";

const topicId = topics["🍄"];
const sleeper = new Sleeper();

describe('Send message💬', function () {
    describe('Text message💬', function () {
        it('should send a text message💬', async function () {
            const client = await getMewClient();
            const result = await client?.sendTextMessage(topicId, '🍄');
            if (result?.data) {
                assert.notEqual(result.data.id, undefined);
            } else {
                assert.fail();
            }
        });
    });
    describe('Image message🖼', function () {
        it('should send a image message🖼💬', async function () {
            this.timeout(0);
            await sleeper.sleep();
            const client = await getMewClient();
            const filePath = './test/images/cat.jpg';
            const result = await client?.sendImageMessage(topicId, filePath);
            if (result?.data) {
                assert.notEqual(result.data, undefined);
            } else {
                assert.fail();
            }
        });
    });
});

describe('Delete message🚮', function () {
    describe('Send and delete a text message🚮', function () {
        it('should send a text message and delete🚮', async function () {
            this.timeout(0);
            await sleeper.sleep();
            const client = await getMewClient();
            const message = await client?.sendTextMessage(topicId, '🍄要被吃掉了!');
            if (message?.data?.id) {
                await Util.sleep(2000);
                const result = await client?.deleteMessage(message.data.id);
                assert.ok(result);
            } else {
                assert.fail();
            }
        });
    });
});

describe('Stamps and Reaction👍', function() {
    let stamps: Stamps;
    it('should get stamps👍', async function () {
        await sleeper.sleep();
        const client = await getMewClient();
        const result = await client?.getStamps();
        if (result?.data) {
            stamps = result.data;
            assert.ok(result.data);
        } else {
            assert.fail();
        }
    });
    it('should send a message and give it some reactions🤜💬', async function () {
        if (!stamps || stamps.stamps.length == 0) {
            assert.fail();
        }
        this.timeout(0);
        await sleeper.sleep();
        const client = await getMewClient();
        const result = await client?.sendTextMessage(topicId, '|←樹海| ┗(^ε^ )┓┗(^ε^ )┓～♪三!');
        if (result?.data) {
            for (const stamp of stamps.stamps) {
                await sleeper.sleep();
                const r = await client?.addMessageReaction(result.data.id, stamp.id);
                console.log('react result: ', r?.data);
            }
            assert.ok('ok');
        } else {
            assert.fail();
        }
    });
});

describe('Get topic messages💬', function () {
    describe('With default limit💬', function () {
        it('should get messages of the topic💬', async function () {
            await sleeper.sleep();
            const client = await getMewClient(false);
            const result = await client?.getTopicMessages(topicId);
            if (result?.data?.objects && result?.data?.entries) {
                assert.ok;
            } else {
                assert.fail();
            }
        });
    });
});
