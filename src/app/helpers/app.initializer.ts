import { lastValueFrom } from 'rxjs';
import { AccountService } from './../services/account.service';

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>((resolve, reject) => {
        // attempt to refresh token on app start up to auto authenticate
        accountService.refreshToken().subscribe().add(() => {
            resolve();
        })


    });
}