import assert from "assert";
import { nodes, Sleeper } from "./commons.js";
import { getMewClient } from "./my-client.js";

const sleeper = new Sleeper();
const testNode = nodes['🦴'];
const dummyUser = '69694031441575936';

describe.skip('Node management🏘', function () {
    describe('Get info📑', function () {
        it('should get a page of restricted node members 🙅', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getNodeMembers('not_a_robot', undefined);
            if (result?.data) {
                assert.notEqual(result.data.entries, undefined);
            } else {
                assert.fail();
            }
        });
        
        it('should get banned node members🚫', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getNodeBans(testNode);
            if (result?.data) {
                console.dir(result);
                assert.notEqual(result.data.entries, undefined);
            } else {
                assert.fail();
            }
        });
    });

    describe('Member 🙅‍', function () {
        it.skip('should ban node member🚫', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.banNodeMember(testNode, dummyUser);
            if (result && result.data === '') {
                assert.ok('ok');
            } else {
                assert.fail();
            }
        });

        it.skip('should unban node member⭕', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.unbanNodeMember(testNode, dummyUser);
            if (result && result.data === '') {
                assert.ok('ok');
            } else {
                assert.fail();
            }
        });

        it.skip('should remove node member⛔', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.deleteNodeMember(testNode, dummyUser);
            if (result && result.data === '') {
                assert.ok('ok');
            } else {
                assert.fail();
            }
        });

    });
});

describe.skip('Thought management💭', function () {
    it('should get a thought and sink it ⬇', async function () {
        await sleeper.sleep();
        const client = await getMewClient();
        const thoughts = await client?.getNodeThoutghts(testNode);
        if (thoughts?.data && thoughts.data.entries.length > 0) {
            const thought = thoughts.data.entries[0];
            const result = await client?.sinkThought(thought.id);
            if (result && result.data === '') {
                assert.ok('ok');
            } else {
                assert.fail();
            }
        } else {
            assert.fail();
        }
    });

    it('should get a thought and unsink it ⬆', async function () {
        await sleeper.sleep();
        const client = await getMewClient();
        const thoughts = await client?.getNodeThoutghts(testNode);
        if (thoughts?.data && thoughts.data.entries.length > 0) {
            const thought = thoughts.data.entries[0];
            const result = await client?.unsinkThought(thought.id);
            if (result && result.data === '') {
                assert.ok('ok');
            } else {
                assert.fail();
            }
        } else {
            assert.fail();
        }
    });
});
