require("dotenv").config();
const registerUser = require("../../src/database");

(async () => {
    await registerUser.connect(process.env.MongoDB_Url, process.env.MongoDB_Name);

    const result = await registerUser.addUser({
        account: "account",
        accountType: "type",
        email: "email",
        mnemonic: "mnemonic",
        name: "name",
        userId: "userId"
    });

    console.log(result);
})();