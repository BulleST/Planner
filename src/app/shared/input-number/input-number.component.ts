import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnChanges {

    @Input() valueInput: any;
    @Input() mask?: string;
    @Input() suffix?: string;
    @Input() prefix?: string;
    @Input() thousandSeparator = '.';
    @Input() decimalMarker: "." | "," | [".", ","] = ',';
    @Input() inputId: string = '';
    @Input() min?: number;
    @Input() max?: number;
    @Input() required: boolean = false;
    @Input() arrowControls: boolean = true;
    @Input() showErrorMessage: boolean = true;
    @Input() allowNegativeNumbers?: boolean = false;
    @Input() placeholder = '';

    @Output() valueChanges: EventEmitter<number> = new EventEmitter();

    @ViewChild('input') input?: NgModel;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['valueInput']) this.valueInput = changes['valueInput'].currentValue;
        if (changes['mask']) this.mask = changes['mask'].currentValue;
        if (changes['suffix']) this.suffix = changes['suffix'].currentValue;
        if (changes['prefix']) this.prefix = changes['prefix'].currentValue;
        if (changes['thousandSeparator']) this.thousandSeparator = changes['thousandSeparator'].currentValue;
        if (changes['decimalMarker']) this.decimalMarker = changes['decimalMarker'].currentValue;
        if (changes['inputId']) this.inputId = changes['inputId'].currentValue;
        if (changes['min']) this.min = changes['min'].currentValue;
        if (changes['max']) this.max = changes['max'].currentValue;
        if (changes['required']) this.required = changes['required'].currentValue;
        if (changes['arrowControls']) this.arrowControls = changes['arrowControls'].currentValue;
        if (changes['showErrorMessage']) this.showErrorMessage = changes['showErrorMessage'].currentValue;
        if (changes['placeholder']) this.placeholder = changes['placeholder'].currentValue;
        if (changes['allowNegativeNumbers']) this.allowNegativeNumbers = changes['allowNegativeNumbers'].currentValue;

        setTimeout(() => {
            this.validateNumber(this.input);
        }, 500);
    }

    validateNumber(input?: NgModel) {
        if (input) {
            console.log('tchau')
            var min = this.min;
            var max = this.max;
            var value = input.model;
            input.control.setErrors({
                max: max && (value > max),
                min: min && (value < min),
            });
        }
        return input
    }

    arrowUp(value: number, skip = 1, min = 0, max = 100000000, allowNegative = this.allowNegativeNumbers) {
        return arrowUp({
            value: value,
            skip: skip,
            min: min,
            max: max,
            allowNegative: allowNegative ?? false
        });
    }

    arrowDown(value: number, skip = 1, min = 0, max = 100000000, allowNegative = this.allowNegativeNumbers) {
        return arrowDown({
            value: value,
            skip: skip,
            min: min,
            max: max,
            allowNegative: allowNegative ?? false
        });
    }
}

function arrowUp(model: FormatNumber) {
    model.value += model.skip;
    if (model.max != null && model.max != undefined && model.value > model.max) {
        model.value = model.max;
    }
    return model.value;
}

function arrowDown(model: FormatNumber) {
    model.value -= model.skip;
    if (model.min != null && model.min != undefined && model.value > model.min) {
        model.value = model.min;
    } else if (!model.allowNegative && model.value < 1) {
        model.value = 0;
    }

    return model.value;
}

class FormatNumber {
    value: number = 0;
    min: number = 0;
    max: number = 0;
    skip: number = 0;
    allowNegative: boolean = true;
}