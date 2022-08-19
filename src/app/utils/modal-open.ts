import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ModalOpen {
    openSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private location: Location
    ) {

    }
    getOpen(): BehaviorSubject<boolean> {
        let value = this.openSubject.value ?? localStorage.getItem('modal') === 'true' ? true : false;
        if(this.openSubject.value != undefined) {
            return this.openSubject;
        } else {
            this.openSubject.next(value)
        }
        return this.openSubject;
    }
    setOpen(value: boolean) {
        this.openSubject.next(value);
        localStorage.setItem('modal', value.toString())
    }

    voltar() {
        this.setOpen(false);
        setTimeout(() => {
            this.location.back();
        }, 200);
    }
}
