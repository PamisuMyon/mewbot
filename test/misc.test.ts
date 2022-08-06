import assert from "assert";
import { Sleeper } from "./commons.js";
import { getMewClient } from "./my-client.js";

const sleeper = new Sleeper();

describe('Get some info📄', function () {
    describe('Get user info🙈', function () {
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
