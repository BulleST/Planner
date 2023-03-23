import { AccountService } from './../services/account.service';

export function appInitializer(
    accountService: AccountService
) {
    return () => new Promise<void>((resolve, reject) => {
        accountService.refreshToken().subscribe().add(() => {
            resolve();
        })
        resolve();
    });
}