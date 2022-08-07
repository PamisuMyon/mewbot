import { Util } from "../src/commons/utils.js";

export const nodes = {
    not_a_robot: '100554577263091712',
    '🦴': '222154400563036160',
};

export const topics = {
    '🍄': '219353468583456768',      // 不是机器人 > 🍄
    '🦴': '222154400563036161',
};

export class Sleeper {
    sleepTime = 0;

    async sleepAcc(next = 500) {
        Util.sleep(this.sleepTime);
        this.sleepTime += next;
    }

    async sleep(interval = 500) {
        Util.sleep(interval);
    }

}

export const LoremIpsum = 
`
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Morbi tristique senectus et netus et malesuada fames ac turpis. Fermentum leo vel orci porta non pulvinar neque laoreet. Vel turpis nunc eget lorem dolor. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Volutpat consequat mauris nunc congue nisi vitae suscipit. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Purus ut faucibus pulvinar elementum integer. Nunc sed blandit libero volutpat sed cras ornare arcu. Velit dignissim sodales ut eu sem integer vitae justo. Ipsum suspendisse ultrices gravida dictum fusce ut placerat.

Sit amet venenatis urna cursus eget nunc scelerisque. Consectetur libero id faucibus nisl. Orci sagittis eu volutpat odio facilisis mauris. A diam maecenas sed enim ut sem viverra. Diam quam nulla porttitor massa id. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Eget felis eget nunc lobortis mattis aliquam faucibus purus in. Urna cursus eget nunc scelerisque. Tellus id interdum velit laoreet id. Quis varius quam quisque id diam vel quam elementum pulvinar. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Vel pharetra vel turpis nunc eget lorem. Eleifend donec pretium vulputate sapien nec. Nisi est sit amet facilisis magna etiam tempor orci eu. Habitant morbi tristique senectus et netus. Dui accumsan sit amet nulla facilisi morbi. Egestas diam in arcu cursus euismod quis.

Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Dictum varius duis at consectetur. Imperdiet sed euismod nisi porta. Mauris rhoncus aenean vel elit scelerisque. In iaculis nunc sed augue lacus viverra vitae congue. Duis ut diam quam nulla porttitor. Mauris pellentesque pulvinar pellentesque habitant. Varius duis at consectetur lorem. Commodo elit at imperdiet dui accumsan sit amet. Neque aliquam vestibulum morbi blandit cursus. Tortor consequat id porta nibh. Pretium nibh ipsum consequat nisl vel pretium lectus. A scelerisque purus semper eget duis. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Enim diam vulputate ut pharetra. Eget velit aliquet sagittis id consectetur. Sed odio morbi quis commodo odio.

Viverra nam libero justo laoreet sit amet cursus. Et malesuada fames ac turpis. Felis eget nunc lobortis mattis aliquam faucibus purus. Habitant morbi tristique senectus et. Lorem mollis aliquam ut porttitor leo a. Nullam eget felis eget nunc lobortis mattis. Pharetra convallis posuere morbi leo urna. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Nunc eget lorem dolor sed. Vitae auctor eu augue ut lectus arcu bibendum. Volutpat est velit egestas dui id ornare. Diam phasellus vestibulum lorem sed risus ultricies tristique. Leo urna molestie at elementum eu facilisis sed odio morbi. Quis risus sed vulputate odio ut enim. Vivamus arcu felis bibendum ut. Massa enim nec dui nunc mattis enim ut tellus elementum.

Eu consequat ac felis donec et odio pellentesque diam volutpat. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Eu augue ut lectus arcu bibendum. Duis tristique sollicitudin nibh sit. Porttitor rhoncus dolor purus non enim praesent elementum. Phasellus egestas tellus rutrum tellus pellentesque eu. Libero volutpat sed cras ornare. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Ac orci phasellus egestas tellus rutrum. Diam quam nulla porttitor massa id neque aliquam vestibulum. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Praesent tristique magna sit amet purus gravida quis blandit. Suscipit adipiscing bibendum est ultricies integer quis. Massa eget egestas purus viverra. Libero volutpat sed cras ornare arcu. Sed faucibus turpis in eu mi. Quam lacus suspendisse faucibus interdum posuere lorem. Eget duis at tellus at urna condimentum mattis. Risus at ultrices mi tempus.
`;