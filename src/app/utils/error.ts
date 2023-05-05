export function getError(res: any) {
    var msg = "Ocorreu um erro, mas não foi possível localizar a causa.";
    if (res) {
        console.log('res')
        if (res.error) {
            console.log('res.error')
            if (res.error.message) {
                console.log('res.error.message')
                msg = res.error.message;
            }
            else if (res.error.InnerException) {
                console.log('res.error.InnerException')
                if (res.error.InnerException.InnerException) {
                    console.log('res.error.InnerException.InnerException')
                    msg = res.error.InnerException.InnerException;
                } else if (res.error.InnerException.Message) {
                    console.log('res.error.InnerException.Message')
                    msg = res.error.InnerException.Message;
                } else {
                    console.log('res.error.InnerException else')
                    msg = res.error.InnerException;
                }
            } else {
                console.log('res.error.message else')
                msg = res.error;
            }
        } else if (res.message) {
            console.log('res.message')
            msg = res.message;
        }
    }
    console.log(res, msg)
    return msg
}