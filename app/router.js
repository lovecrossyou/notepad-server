'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  // io.of('/').route('chat', io.controller.chat.index);
  app.io.of('/').route('chat', app.io.controller.chat);
  // app.io.of('/').route('chat', app.io.controller.nps.exchange);
  // app.io.route('chat', app.io.controller.chat.ping);

};
