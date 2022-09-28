import { MessagesService } from './movement.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto): Promise<any>;
    findAll(): any;
    joinRoom(name: string, client: Socket): any;
    typing(isTyping: boolean, client: Socket): Promise<void>;
}
