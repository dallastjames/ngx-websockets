export interface WebsocketEmittable<T = any> {
    emit: (data: T) => void;
}
