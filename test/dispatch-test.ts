import { logger, LogLevel } from "../src/index.js";
import { nodes } from "./commons.js";
import { getMewClient } from "./my-client.js";

(async () => {
    logger.logLevel = LogLevel.Verbose;
    const client = await getMewClient();
    if(!client) return;

    client.on('open', () => {
        logger.debug('Connection open');
    });

    client.on('close', () => {
        logger.debug('Connection close');
    });

    client.on('dispatch', (dispatch) => {
        logger.debug('================');
        logger.debug(dispatch.event);
        // logger.dir(dispatch.data);
    });

    client.on('user_typing', (data) => {
        logger.debug(`user_typing: ${data.user.name}`);
    });

    client.on('message_create', (data) => {
        let str = data._user?.name + ': ';
        if (data.content)
            str += data.content;
        else if (data.stamp)
            str += 'stamp';
        else if (data.media)
            str += 'media';
        logger.debug(str);
    });

    client.on('message_engagement', (data) => {
        logger.debug('message_engagement: ' + data.message_id);
    });

    client.on('thought_engagement', (data) => {
        logger.debug('thought_engagement: ' + data.thought_id);
    });

    client.on('comment_engagement', (data) => {
        logger.debug('comment_engagement: ' + data.comment_id);
    });

    client.on('node_member_add', (data) => {
        logger.debug('comment_engagement: ' + data.user_id);
    });

    client.connect({
        subcriptionNodes: [nodes['🦴']],
        handshakeTimeout: 5000,
    });

})();
