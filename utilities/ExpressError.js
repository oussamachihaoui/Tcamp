class ExpressError extends Error {
    constructor(message , status){
        super();
        this.message;
        this.status;
    }
}

module.exports = ExpressError;