import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
export declare class MessagesService {
    messages: Message[];
    clientToUser: {};
    create(createMessageDto: CreateMessageDto): {
        name: string;
        text: string;
    };
    findAll(): Message[];
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
}
