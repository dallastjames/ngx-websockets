# NgxWebsockets

## Usage

Import the NgxWebsocketsModule into your application

```Typescript
// App.module.ts
imports: [
    NgxWebsocketsModule.forRoot()
]
```

Create a service that extends the WebsocketService. This class will be the controller for your socket connection. You can create many socket connections by creating many services that extend the base socket service.

The class should be decorated with the `@WebsocketGateway()` decorator. The decorator is used to configure your socket connection for this class. Both host and namespace are optional.

```Typescript
@WebsocketGateway({
    host: 'http://localhost:3000',
    namespace: '/myNamespace'
})
export class MySocket extends WebsocketService {}
```

`@WebsocketReciever(eventName)` decorator is used to listen for events from the socket. It will provide an observable that can be subscribed to that will emit whenever an event is received

```Typescript
@WebsocketReceiver('newMessage')
public newMessage$: Observable<string>
```

`@WebsocketEmitter(eventName)` decorator is used to emit events into the socket connection. It creates the type of `WebsocketEmittable<T>` which is an object with an `emit(value)` method.

```Typescript
@WebsocketEmitter('createMessage')
public createMessage: WebsocketEmittable<string>;
```

## Example

```Typescript
import {
    WebsocketService,
    WebsocketReciever,
    WebsocketEmitter,
    WebsocketEmittable
} from 'ngx-websocket';

@Injectable({
    providedIn: 'root'
})
@WebsocketGateway({
    host: 'http://localhost:3000',
    namespace: '/myNamespace'
})
export class MySocket extends WebsocketService {
    @WebsocketReceiver('newMessage')
    public newMessage$: Observable<string>

    @WebsocketEmitter('createMessage')
    public createMessage: WebsocketEmittable<string>;
}
```

```Typescript
export class MyComponent {
    constructor(private socket: MySocket) {}

    ngOnInit() {
        this.socket.connect();
        this.socket.newMessage$.subscribe(newMessage => {...});
    }

    ngOnDestroy() {
        this.socket.disconnect();
    }

    sendMessage(message: string) {
        this.socket.createMessage.emit(message);
    } 
}
```