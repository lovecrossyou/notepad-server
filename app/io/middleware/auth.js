const PREFIX = 'room';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;

    // 用户信息
    const { room, userId } = query;
    const rooms = [ room ];

    console.log('#user_info', id, room, userId);

    // 用户加入
    console.log('#join', room);
    console.log('#userId', userId);

    socket.join(room);

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      console.log('#online_join', clients);

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `User(${id}) joined.`,
      });
    });

    await next();

    // 用户离开
    console.log('#leave', room);

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      console.log('#online_leave', clients);
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'leave',
        target: 'participator',
        message: `User(${id}) leaved.`,
      });
    });

  };
};