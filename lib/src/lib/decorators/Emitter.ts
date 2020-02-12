import { WebsocketService } from '../services/websocket.service';
import { WebsocketInjectorAccessor } from '../services/websocket-injector-accessor.service';
import { WebsocketEmittable } from '../models';

export function WebsocketEmitter(eventName: string): PropertyDecorator {
    return (target: WebsocketService, propertyKey: string): void => {
        const newValue: WebsocketEmittable<any> = {
            emit: (data): void => {
                const item = WebsocketInjectorAccessor.getSocketService(
                    target.constructor
                );
                item['_sendNewEvent'](eventName, data);
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: (): any => newValue
        });
    };
}
