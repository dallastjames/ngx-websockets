import { Injectable, Injector } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable()
export class WebsocketInjectorAccessor {
    private static injector: Injector = null;

    constructor(injector: Injector) {
        WebsocketInjectorAccessor.injector = injector;
    }

    public static getSocketService(serviceRef: any): never | WebsocketService {
        if (!this.injector) {
            throw new Error('ngx-websocket module is not imported!');
        }
        return this.injector.get<WebsocketService>(serviceRef);
    }
}
