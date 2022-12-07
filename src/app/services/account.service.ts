import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, Login, Register } from '../models/account.model';
import { Crypto } from '../utils/crypto';
import { Loading } from '../utils/loading';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    url = environment.url;

    private accountSubject: BehaviorSubject<Account | undefined>;
    public account: Observable<Account | undefined>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private loadingHelper: Loading,
        private crypto: Crypto,
    ) {
        this.accountSubject = new BehaviorSubject<Account | undefined>(undefined);
        this.account = this.accountSubject.asObservable();
    }

    setAccount(value?: Account) {
        if (value) {
            value.role = value.perfilAcesso_Id;
        }
        this.accountSubject.next(value)
        let encrypted = this.crypto.encrypt(value);
        localStorage.setItem('account', encrypted ?? '')
    }

    public get accountValue(): Account | undefined {
        var account = localStorage.getItem('account') as string;
        if (this.accountSubject.value == undefined && account != undefined && account.trim() != '') {
            var accountObj = this.crypto.decrypt(account) as Account;
            this.accountSubject.next(accountObj);
        }
        return this.accountSubject.value;
    }

    login(model: Login) {
        return this.http.post<Account>(`${this.url}/accounts/authenticate`, model).pipe(
            tap((res) => {
                console.log(res)
                this.loadingHelper.loading.next(false);
                this.setAccount(res);
                const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
                return of(res);
            }),
            catchError((err => {
                console.error(err)
                this.setAccount(undefined);
                this.loadingHelper.loading.next(false);
                // return throwError(() => new Error(err));
                return throwError(err);
            }))
        );
    }

    logout() {
        this.http.post<any>(`${this.url}/accounts/revoke-token`, { token: this.accountValue?.refreshToken })
            .subscribe({
                next: res => {
                    this.setAccount(undefined)
                    this.router.navigate(['account', 'login']);
                    localStorage.clear();
                },
                error: error => {
                    return throwError(() => new Error(error));
                    localStorage.clear();

                }
            });
    }

    register(model: Register) {
        return this.http.post(`${this.url}/accounts/register`, model);
    }

    resetPassword(token: string, senha: string) {

    }

    forgotPassword(email: string) {

    }

    verifyEmail(token: string) {
        return this.http.post(`${this.url}/accounts/verify-email`, { token: token });
    }



}
