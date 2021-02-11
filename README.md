# organicProject
#Need to access the backend using port no: 3001
#Go to src folder then start the server by using the command: node api.js

#Following are API description

#User Module
 #Register API
   #End Point: http://localhost:3001/api/user/register
   #Method: POST
   #Parameters: name,status,email,password (if status is not passed the default will be Inactive)
 #Login API  
   #End Point: http://localhost:3001/api/user/login
   #Method: POST
   #Parameters: email,password
   #Description: It will return the token which will be used to access api after login

 #User Update API
   #End Point: http://localhost:3001/api/user/update/:userId
   #Method: PUT
   #Parameters: name,status
   #Description: Only name & status can be updated from update api
   #Note: Need to pass token in header to access this api

 #User Delete API
   #End Point: http://localhost:3001/api/user/delete/:userId
   #Method: DELETE
   #Note: Need to pass token in header to access this api

 #User Retrieve API     
   #End Point: http://localhost:3001/api/user/retrieve?userId=1&name=test
   #Method: GET
   #Desc: Need to pass paramters in query string
   #Note: Need to pass token in header to access this api

#Page Module
 #Page Create API
   #End Point: http://localhost:3001/api/page/add
   #Method: POST
   #Parameters: title,content,keywords
   #Note: Need to pass token in header to access this api

 #Page Update API
   #End Point: http://localhost:3001/api/page/update/:pageId
   #Method: PUT
   #Parameters: name,status
   #Description: Only name & status can be updated from update api
   #Note: Need to pass token in header to access this api

 #Page Delete API
   #End Point: http://localhost:3001/api/page/delete/:pageId
   #Method: DELETE
   #Note: Need to pass token in header to access this api

 #Page Retrieve API     
   #End Point: http://localhost:3001/api/page/retrieve?page=1&title=test
   #Method: GET
   #Desc: Need to pass paramters in query string
   #Note: Need to pass token in header to access this api


   
