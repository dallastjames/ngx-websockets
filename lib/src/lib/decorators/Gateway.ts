import { GatewayOptions, defaultGatewayOptions } from '../models';

export function WebsocketGateway(
    options?: Partial<GatewayOptions>
): ClassDecorator {
    const resolvedOptions = {
        ...defaultGatewayOptions,
        ...options
    };
    // tslint:disable-next-line: ban-types
    return (constructor: Function): void => {
        constructor.prototype.gatewayOptions = resolvedOptions;
    };
}
