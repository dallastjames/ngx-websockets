import { WebsocketService } from '../services/websocket.service';
import { Observable, Subject } from 'rxjs';

export function WebsocketReceiver(eventName: string): PropertyDecorator {
    return (target: WebsocketService, propertyKey: string): void => {
        if (!target['eventsToRegister']) {
            target['eventsToRegister'] = [];
        }
        Object.defineProperty(target, propertyKey, {
            get: (): Observable<any> => {
                const subj = new Subject<any>();
                target['eventsToRegister'].push({
                    eventName,
                    cb: (eventData): void => {
                        subj.next(eventData);
                    }
                });
                return subj.asObservable();
            }
        });
    };
}
