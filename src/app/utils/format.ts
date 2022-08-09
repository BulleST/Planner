import { Injectable } from "@angular/core";
import { RangeValueAccessor } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})
export class Format {

    
}
export function stringToDecimal(value: string) {
    value = value.replace('R$', '').replace('%', '').replace(' ', '').replace('.', '').replace(',', '.')
    return parseFloat(value);
}

export function arrowUp(value: number) {
    return value + 1;
}

export function arrowDown(value: number, allowNegative: boolean = false) {
    value = value - 1;
    if (value < 0 && !allowNegative) 
        return 0
    return value;
}
