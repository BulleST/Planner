import { Injectable } from "@angular/core";
import { MaxValidator, RangeValueAccessor } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})
export class Format {


}
export function stringToDecimal(value: string) {
    value = value.replace('R$', '').replace('%', '').replace(' ', '').replace('.', '').replace(',', '.')
    return parseFloat(value);
}

export function arrowUp(value: any = 0, maxNumber?: number) {
    console.log('before: ', value)
    // value = parseFloat(value.toString()
    //     .replace('R$', '')
    //     .replace('%', ''))
    value = ++value;
    if (maxNumber != null && maxNumber != undefined && value > maxNumber) {
        value = maxNumber;
    }
    console.log('after: ', value)
    return value;
}

export function arrowDown(value: any = 0, allowNegative: boolean = false) {
    console.log('before: ', value)
    // value = parseFloat(value.toString()
    //     .replace('R$', '')
    //     .replace('%', ''))
    value = --value;
    if (value < 0 && !allowNegative)
        value = 0
    console.log('after: ', value)
    return value;
}
