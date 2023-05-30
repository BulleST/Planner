export function getError(res: any) {
    var msg = "Ocorreu um erro, mas não foi possível localizar a causa.";

    if (res) {
        if (res.error && res.error.message)
            msg = res.error.message;
        
        else if (res.error && res.error.InnerException && res.error.InnerException.InnerException)
            msg = res.error.InnerException.InnerException;
        
        else if (res.error && res.error.InnerException && res.error.InnerException.Message)
            msg = res.error.InnerException.Message;
        
        else if (res.message)
            msg = res.message;
        
        else if (res.error && res.error.InnerException)
            msg = res.error.InnerException;
        
        else if (res.error.error)
            msg = res.error.error;
    
        else if (res.error)
            msg = res.error;
        
        else
            msg = "Ocorreu um erro no processamento da requisição.";
        
        
    }

    console.log(res, msg)
    return msg
}