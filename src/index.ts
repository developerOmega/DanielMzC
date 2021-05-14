import { server } from './app';

server.start((port:number) => {
  console.log("Escuchando en puerto ", port);
});
