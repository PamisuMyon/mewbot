import { Sleeper, topics } from "./commons.js";
import { getMewClient } from "./my-client.js";

const topicId = topics["🍄"];
const sleeper = new Sleeper();

describe('Post thought', function () {
    describe('Post status', function () {
        it('should send a status thought', async function () {
            this.timeout(0);
            await sleeper.sleep();
            const client = await getMewClient();
            client?.postThought(topicId, { status: '🍄🍄🍄🍄🍄🍄',  });
            
        });
    });
});