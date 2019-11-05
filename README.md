Chat app API documentation 

List of APIs 

1. Get All users

    /users
    GET
    Can used to list all the users in the inbox
    returns an Array of users,each user has a name and an Id

2. Get a single user by id

    /user/:id
    GET
    Basicly the login,user choose which user to log in with,so user logs in with user Id
    returns one users with name and Id


3. Poll all new messages after lastMessageId

   /conversation/:conversationId/new/:lastMessageId
   GET
   *No use case yet*
    return the array of messages objects that come after the id given.
    Example response :
    {“id":"1",
    "senderId":"5",
    "message":"The first message",
    "timestamp":"2014-10-1608:14:55”,
    "conversationid":"2","status":"0"}

4. Get a limited amount of messages

  /conversation/:conversationId/message/limited
  GET
 *No use case yet*
  Takes limit and offset as query params and returns an array of messages objects
  Example response :
  {"id":"30",
  "senderId":"1",
  "message":"Bang bang",
  "timestamp":"2014-10-2411:42:27",
  "conversationid":"1","status":"0"}

5. Get the last seen timestamp for the given user

    /conversation/:conversationId/lastseen/:userId
    GET
    Takes userId and ConversationId and returns lastseen time stamp
    Example response :
    {"lastseen":"2014-10-16 07:08:27"}

6. Get the conversation details for one conversation

    /conversation/:id
    GET
    Take an a conversation Id and returns all the conversation with a conversation object and users object.
    Example response: 
    {"conversation":
        {"id":"2",
        "name":"Groupchat!",
        "status":"1",
        "type":"2"},
    "users":
        [{"id":"20",
        "conversationId":"2",
        "is_owner":"1",
        "userid":"5",
        "status":"0",
        "lastseen":"2014-10-16 07:08:27"},
        {"id":"21",
        "conversationId":"2",
        "is_owner":"0",
        "userid":"1",
        "status":"0",
        "lastseen":null}]
    }
    
7. Get all conversations for one user

    /conversation/user/:id
    GET
    Takes user id and returns an array of conversations of the user
    Example response: 
        [{"conversation":
            {"id":"1",
            "conversationId":"1",
            "is_owner":"0",
            "userid":"2",
            "status":"1",
            "lastseen":null,
            "name":null,
            "type":"1"},
        "users":
            [{"id":"16",
            "conversationId":"1",
            "is_owner":"1",
            "userid":"5",
            "status":"0",
            "lastseen":null},
            {"id":"19",
            "conversationId":"1",
            "is_owner":"0",
            "userid":"2",
            "status":"0",
            "lastseen":null}]}]

8. Send a message 

    /conversation/:conversationid/message/send
    POST
    Sends a massage to a conversation and returns a message Id
    Example body:
        {"message":"sample",
        "senderId":5}

9. Create a new personal conversation

    /conversation/personal
    POST
    Creates a personal conversation,accepts a string of users and returns conversation id.
    Example body:
        {“users”:"1,2,3"}

10. Create a new group conversation

    /conversation/group
    POST
    Creates a group conversation,accepts a string of users and a group name and returns a conversation id.
    Example body:
        {“users”:”1,2,3”,
        ”name”:”Group chat !”}


11. Edit Lastseen timestamp

    /conversation/:conversationId/seen/:userId
    PUT
    User timestamp with input of conversationId and userId and returns timestamp
    Example response :
        {"lastseen":"2014-10-16 07:08:27"}


    
            


