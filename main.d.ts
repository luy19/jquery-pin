export interface JQueryPinOption {
    minWidth?: number;
    activeClass?: string;
    containerSelector?: string;
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
}
export declare type JQueryPinPlugin = (this: JQuery, options?: JQueryPinOption) => JQuery;
declare global {
    interface JQuery {
        pin: JQueryPinPlugin;
    }
}
export declare const pin: JQueryPinPlugin;
