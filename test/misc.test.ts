import assert from "assert";
import { Sleeper } from "./commons.js";
import { getMewClient } from "./my-client.js";

const sleeper = new Sleeper();

describe('Get some info', function () {
    describe('Get node info', function () {
        it('should get info of node not_a_robot🤖', async function () {
            const client = await getMewClient();
            const result = await client?.getNodeInfo('not_a_robot');
            if (result?.data) {
                assert.notEqual(result.data.id, undefined);
            } else {
                assert.fail();
            }
        });
        it('should get info of node 212863117974745088🐱', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getNodeInfo('212863117974745088');
            if (result?.data) {
                assert.notEqual(result.data.id, undefined);
            } else {
                assert.fail();
            }
        });
        it('should get a not found error💢', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getNodeInfo('somenodethatnotexistsatall');
            if (result?.error) {
                assert.notEqual(result.error.name, undefined);
            } else {
                assert.fail();
            }
        });
    });
    describe('Get user info', function () {
        it('should get info of neko😻!', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getUserInfo('neko');
            if (result?.data) {
                assert.notEqual(result.data.id, undefined);
            } else {
                assert.fail();
            }
        });
        it('should get info of nana👧!', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getUserInfo('nana');
            if (result?.data) {
                assert.notEqual(result.data.id, undefined);
            } else {
                assert.fail();
            }
        });
        it('should get info of me🎅!', async function () {
            await sleeper.sleep();
            const client = await getMewClient();
            const result = await client?.getMeInfo();
            if (result?.data) {
                assert.notEqual(result.data.id, undefined);
            } else {
                assert.fail();
            }
        });
    });
});
