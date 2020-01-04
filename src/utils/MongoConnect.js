const { MongoClient } = require("mongodb");
const env = require("../config/env_variables").getEnv();

class StackerMongoConnect {    

    async connect(connectionString, dbName){
        const connection = await MongoClient.connect(connectionString, { useNewUrlParser: true });
        const database = connection.db(dbName);

        this.collections()
            .map(colName => database.collection(colName))
            .forEach(col => {
                let name = col.collectionName;
                let modCollectionName = name.slice(0, 1).toLowerCase() + name.slice(1, name.length);            
                this[modCollectionName] = col;
            });
    }

}

module.exports = StackerMongoConnect;
