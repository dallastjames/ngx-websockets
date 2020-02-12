import { NgModule, Self, ModuleWithProviders } from '@angular/core';
import { WebsocketInjectorAccessor } from './services/websocket-injector-accessor.service';

@NgModule()
export class NgxWebsocketsModule {
    constructor(
        @Self() private socketInjectorAccessor: WebsocketInjectorAccessor
    ) {}

    public static forRoot(): ModuleWithProviders<NgxWebsocketsModule> {
        return {
            ngModule: NgxWebsocketsModule,
            providers: [WebsocketInjectorAccessor]
        };
    }
}
