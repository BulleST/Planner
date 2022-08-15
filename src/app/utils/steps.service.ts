import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Crypto } from "./crypto";

@Injectable({
    providedIn: 'root'
})
export class Steps {
    indexActive: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    object: BehaviorSubject<any> = new BehaviorSubject<any>({});
    totalIndex: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    constructor(private crypto: Crypto) {
    }

    getIndexActive() {
        var index = localStorage.getItem('step-index-active');
        if (index) {
            this.indexActive.next(parseInt(this.crypto.decrypt(index)));
        }
        return this.indexActive;
    }

    setIndexActive(index: number) {
        var i = this.crypto.encrypt(index);
        localStorage.setItem('step-index-active', i ?? '1');
        this.indexActive.next(index);
    }


}