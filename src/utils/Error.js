exports.MongoError = (userId, operation, message) => {
    throw {
        user: userId,
        timestamp: Date.now(),
        operation: operation,
        error_code: message.code,                
        error_message: message.errmsg
    }
};