### Environment Variables

```
# Database
MongoDB_Url=mongodb://localhost:27017
MongoDB_Name=StackerUsers

# RabbitMQ
AMPQ_Url=amqp://localhost
AMPQ_Queue_Req_AccountCreation=@request/accountCreation
AMPQ_Queue_Res_AccountCreation=@response/accountCreation
AMPQ_Queue_Req_FreeTokens=@request/freeTokens
AMPQ_Queue_Res_FreeTokens=@response/freeTokens
AMPQ_Queue_Req_AuthFacebook=@request/authUser_Facebook
AMPQ_Queue_Res_AuthFacebook=@response/authUser_Facebook
AMPQ_Queue_SendEmail=@sendEmail/registerUser
AMPQ_Queue_Req_Balance=@request/balance
AMPQ_Queue_Res_Balance=@response/balance

# General
Privacy_Version=1.0
Terms_Version=1.0
PORT=7000
```