import assert from "assert";
import { Comment, Thought } from "../src/index.js";
import { Sleeper, topics } from "./commons.js";
import { getMewClient } from "./my-client.js";

const topicId = topics["🍄"];
const sleeper = new Sleeper();

// TODO 长文、图片、视频、链接 想法
// TODO 添加情绪 删除情绪 删除想法 删除评论

describe('Thought and comment💭', function () {
    let thought: Thought;
    it('should post a thought with only status💭', async function () {
        const client = await getMewClient();
        const result = await client?.postThought(topicId, { status: '🍄🍄🍄🍄🍄🍄' });
        if (result?.data) {
            thought = result.data;
            assert.ok('🍄');
        } else {
            assert.fail();
        }
    });
    let comment: Comment;
    it('should post a comment💬', async function () {
        if (!thought)
            assert.fail();
        await sleeper.sleep();
        const client = await getMewClient();
        const result = await client?.postComment(thought.id, '🌰🌰🌰🌰🌰🌰🌰🌰🌰');
        if (result?.data) {
            comment = result.data;
            assert.ok('🌰');
        } else {
            assert.fail();
        }
    });
    it('should post a reply with image to that comment🖼💬', async function () {
        if (!comment)
            assert.fail();
        this.timeout(0);
        await sleeper.sleep();
        const client = await getMewClient();
        const filePath = './test/images/cat.jpg';
        const result = await client?.postComment(thought.id, '🐹🐹', filePath, comment.id);
        if (result?.data) {
            comment = result.data;
            assert.ok('🐹');
        } else {
            assert.fail();
        }  
    });

});
