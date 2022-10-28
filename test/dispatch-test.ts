import { logger, LogLevel } from "../src/index.js";
import { nodes, topics } from "./commons.js";
import { getMewClient } from "./my-client.js";

(async () => {
    // const listeningTopics = [ topics["🍄"], topics["🦴"] ];
    const listeningTopics = [ topics["🤖"] ];

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
        logger.dir(dispatch.data);
    });

    // /*

    client.on('user_typing', (data) => {
        if (listeningTopics.indexOf(data.topic_id) == -1) return;

        logger.debug(`user_typing: ${data.user.name}`);
    });

    client.on('message_create', (data) => {
        if (listeningTopics.indexOf(data.topic_id) == -1) return;

        let str = data._author?.name + ': ';
        if (data.content)
            str += data.content;
        else if (data.stamp)
            str += 'stamp';
        else if (data.media)
            str += 'media';
        logger.debug(str);
    });

    client.on('message_delete', (data) => {
        let str = data._author?.name + ': ';
        if (data.content)
            str += data.content;
        else if (data.stamp)
            str += 'stamp';
        else if (data.media)
            str += 'media';
        logger.debug(str);
    });

    client.on('message_engagement', (data) => {
        logger.debug('message_engagement: ');
        logger.dir(data);
    });

    client.on('thought_create', (data) => {
        logger.debug('thought_create: ');
        logger.dir(data);
    });

    client.on('thought_update', (data) => {
        logger.debug('thought_update: ');
        logger.dir(data);
    });

    client.on('thought_delete', (data) => {
        logger.debug('thought_delete: ');
        logger.dir(data);
    });

    client.on('thought_engagement', (data) => {
        logger.debug('thought_engagement: ');
        logger.dir(data);
    });

    client.on('comment_create', (data) => {
        logger.debug('comment_create: ');
        logger.dir(data);
    });

    client.on('comment_engagement', (data) => {
        logger.debug('comment_engagement: ');
        logger.dir(data);
    });

    client.on('node_member_add', (data) => {
        logger.debug('node_member_add: ' + data.user_id);
    });

    client.on('node_member_remove', (data) => {
        logger.debug('node_member_remove: ' + data.user_id);
    });

    client.on('node_member_ban', (data) => {
        logger.debug('node_member_ban: ' + data.user_id);
    });

    client.on('node_member_activity_change', (data) => {
        logger.debug('node_member_activity_change: ' + data.entries.length);
    });

    // */

    client.connect({
        // subcriptionNodes: [nodes['🦴']],
        subcriptionNodes: [nodes["🤖"]],
        handshakeTimeout: 5000,
    });

})();
