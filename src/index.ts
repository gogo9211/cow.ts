import { vm } from './vm';
import { compile } from './compile';

export {};

declare global {
    interface Window {
        cowlang: any[];
    }
}

window.cowlang = { vm, compile } as any;