import path from 'path';
import KoaStatic from 'koa-static';
import { Server } from 'boardgame.io/server';
import Drop from './game';

const server = Server({ games: [Drop] });
server.app.use(KoaStatic(path.join(__dirname, '../build')));
server.run(8000, () => {
  console.log("Serving at: http://localhost:8000/");
});
