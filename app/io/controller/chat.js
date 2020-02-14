module.exports = app => {
    return function* () {
        const message = this.args[0];
        const socket = this.socket;
        const client = socket.id;
        console.log('chat 控制器打印', message);
        console.log('chat client', client);
        this.socket.emit('res', `Hi! I've got your message: ${message}`);
    };
};

// module.exports = app => {
//     class Controller extends app.Controller {
//         async ping() {
//             const { ctx, app } = this;
//             const nsp = app.io.of('/');
//             const message = ctx.args[0] || {};
//             const socket = ctx.socket;
//             const client = socket.id;
//             console.log('message #. ', message);

//             try {
//                 const { target, payload } = message;
//                 if (!target) return;
//                 console.log('message # ', JSON.stringify(message));
//                 const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
//                 nsp.emit(target, msg);
//             } catch (error) {
//                 app.logger.error(error);
//             }
//         }
//     }
//     return Controller
// };