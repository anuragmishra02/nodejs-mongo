const getType = val => Object.prototype.toString.call(val);

const Type = {
    NUMBER: "[object Number]",
    STRING: "[object String]"
};

const api = {
    registerUser: {
        name: Type.STRING,
        email: Type.STRING
    }
};

const paramsTypeCheck = (check, data) => {
    const keys = Object.keys(check);
    const passed = keys.every((key) => {
        const typeToCheck = check[key];
        const value = data[key];

        if(getType(value) !== typeToCheck){
            return false;
        }

        return true;
    });

    return passed;
};

module.exports = (req, res, next) =>{
    const method = req.url.split("/").join("");

    if(method === "registerUser"){        
        const checkParameters = paramsTypeCheck(api.registerUser, req.body);
        if(checkParameters){
            next();
        }
    }    
};