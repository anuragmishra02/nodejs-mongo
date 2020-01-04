const registerUser = require("../database").registerUser;

module.exports = async (req, res) => {
    try{
        const user = await registerUser.findUser(req.params.authId);
        
        let response = {};
    
        if(user.length === 0){
            response.status = true;
            response.data = "User ";    
        }    
        else{
            response.status = true;
            response.data = user[0];
        }

        res.json(response);
    }    
    catch(ex){
        console.log(ex);
        res.json({
            status: false,
            message: "Internal Server Error"
        });
    }
};
