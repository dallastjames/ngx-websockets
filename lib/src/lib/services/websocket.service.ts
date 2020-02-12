import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import io from 'socket.io-client';
import { GatewayOptions } from '../models';
import { WebsocketConnectionStatus } from '../enums';

@Injectable()
export class WebsocketService {
    private host: string = '';
    private namespace: string = '';
    private socket: any;
    private eventsToRegister: { eventName: string; cb: (data: any) => void }[];
    private connectStatus: ReplaySubject<
        WebsocketConnectionStatus
    > = new ReplaySubject<WebsocketConnectionStatus>();

    // Exposed Observables
    public connectionStatus$: Observable<
        WebsocketConnectionStatus
    > = this.connectStatus.asObservable();

    // Exposed State
    public isConnected: boolean = false;

    constructor() {
        const options: GatewayOptions = !!this['gatewayOptions']
            ? this['gatewayOptions']
            : null;
        if (options === null) {
            throw new Error(
                'A service that extends WebsocketService must use the WebGateway Decorator'
            );
        }
        this.host = options.host;
        this.namespace = options.namespace;
        this.socket = io(`${this.host}${this.namespace}`, {
            autoConnect: false
        });
        this.socket.on('connect', data => {
            this.isConnected = true;
            this.connectStatus.next(WebsocketConnectionStatus.Connected);
        });
        this.socket.on('disconnect', data => {
            this.isConnected = false;
            this.connectStatus.next(WebsocketConnectionStatus.Disconnected);
        });
        this.registerEvents(this.eventsToRegister);
    }

    public connect(): void {
        this.socket.connect();
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    protected _sendNewEvent<T = any>(eventName: string, eventData: any): void {
        this.socket.emit(eventName, eventData);
    }

    private registerEvents(
        events: { eventName: string; cb: (data: any) => void }[]
    ): void {
        events.forEach(event => {
            this.socket.on(event.eventName, event.cb);
        });
    }
}
