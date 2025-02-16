import { Socket, Server } from 'socket.io';

interface ISocket {
	socket: Socket;
	io: Server;
}

const init = ({ socket, io }: ISocket) => {};

export default { init };
