import assert from "assert";
import { Comment, Thought } from "../src/index.js";
import { Sleeper, topics } from "./commons.js";
import { getMewClient } from "./my-client.js";

const topicId = topics["๐"];
const sleeper = new Sleeper();

// TODO ้ฟๆใๅพ็ใ่ง้ขใ้พๆฅ ๆณๆณ
// TODO ๆทปๅ ๆ็ปช ๅ ้คๆ็ปช ๅ ้คๆณๆณ ๅ ้ค่ฏ่ฎบ

describe('Thought and comment๐ญ', function () {
    let thought: Thought;
    it('should post a thought with only status๐ญ', async function () {
        const client = await getMewClient();
        const result = await client?.postThought(topicId, { status: '๐๐๐๐๐๐' });
        if (result?.data) {
            thought = result.data;
            assert.ok('๐');
        } else {
            assert.fail();
        }
    });
    let comment: Comment;
    it('should post a comment๐ฌ', async function () {
        if (!thought)
            assert.fail();
        await sleeper.sleep();
        const client = await getMewClient();
        const result = await client?.postComment(thought.id, '๐ฐ๐ฐ๐ฐ๐ฐ๐ฐ๐ฐ๐ฐ๐ฐ๐ฐ');
        if (result?.data) {
            comment = result.data;
            assert.ok('๐ฐ');
        } else {
            assert.fail();
        }
    });
    it('should post a reply with image to that comment๐ผ๐ฌ', async function () {
        if (!comment)
            assert.fail();
        this.timeout(0);
        await sleeper.sleep();
        const client = await getMewClient();
        const filePath = './test/images/cat.jpg';
        const result = await client?.postComment(thought.id, '๐น๐น', filePath, comment.id);
        if (result?.data) {
            comment = result.data;
            assert.ok('๐น');
        } else {
            assert.fail();
        }  
    });

});
