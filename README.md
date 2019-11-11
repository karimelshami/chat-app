Read this to understand the APP flow:

This App consists of Three screens

1.Login Page
-The login screen has an input feild which accepts USER ID which simulates user authantication,however this could have been implemented differently by only selecting the desired user to accses his conversation.
-After the user writes down the user ID and clickes login the user id is passed as a query string in the URL,this was implemented to make the URL dynamic to have different URLs for different users
-The user id is taken from the URL and set in the containers state to be able to call all the APIs which require the user Id.

2.Inbox Page 
-The inbox page is intialized by calling Get user conversations using user ID which renders all the user Conversations in a table.
-User can click on Create personal Conversation/Create Group Conversation to create a new Conversation.
-User can click on any conversation to open it in the conversation page.
-Conversation Id and user Id are passed in the URL to differentiate between users.

3.Conversation Page 
-Once the conversation is opened the last seen API is called to put a new timestamp
-User can send messages and refresh to check if he recived a message

---------------------------------------------------------------------------------------------------------------



Chat app API documentation 

List of APIs 

1. Get All users *used*

    /users
    GET
    Can be used to create a group chat.
    returns an Array of users,each user has a name and an Id

2. Get a single user by id *used*

    /user/:id
    GET
    returns one users with name and Id


3. Poll all new messages after last MessageId *used*

   /conversation/:conversationId/new/:last MessageId
   GET
    return the array of messages objects that come after the id given.
    Example response :
    {“id":"1",
    "senderId":"5",
    "message":"The first message",
    "timestamp":"2014-10-1608:14:55”,
    "conversationid":"2","status":"0"}

4. Get a limited amount of messages *used* 


  /conversation/:conversationId/message/limited
  GET
 used by sending offset zero to get all the latest user messages,couldn't find any use case for using offset
  Takes limit and offset as query params and returns an array of messages objects
  Example response :
  {"id":"30",
  "senderId":"1",
  "message":"Bang bang",
  "timestamp":"2014-10-2411:42:27",
  "conversationid":"1","status":"0"}

5. Get the last seen timestamp for the given user *used but no use case* 

    /conversation/:conversationId/lastseen/:userId
    GET
    Takes userId and ConversationId and returns lastseen time stamp
    Example response :
    {"lastseen":"2014-10-16 07:08:27"}

6. Get the conversation details for one conversation *no use case yet so not used*

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
    
7. Get all conversations for one user *used*

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

8. Send a message *used*

    /conversation/:conversationid/message/send
    POST
    Sends a massage to a conversation and returns a message Id
    Example body:
        {"message":"sample",
        "senderId":5}

9. Create a new personal conversation *used*

    /conversation/personal
    POST
    Creates a personal conversation,accepts a string of users and returns conversation id.
    Example body:
        {“users”:"1,2,3"}

10. Create a new group conversation *used*

    /conversation/group
    POST
    Creates a group conversation,accepts a string of users and a group name and returns a conversation id.
    Example body:
        {“users”:”1,2,3”,
        ”name”:”Group chat !”}


11. Edit Lastseen timestamp *used*

    /conversation/:conversationId/seen/:userId
    PUT
    User timestamp with input of conversationId and userId and returns timestamp
    Example response :
        {"lastseen":"2014-10-16 07:08:27"}


    
            


