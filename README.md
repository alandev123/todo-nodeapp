Postman: http://localhost:5000
Swagger: http://localhost:5000/api-docs/
APIS
-------------------------------------------
Create
POST: http://localhost:5000/todo/create-note 
Body:
{
"title":"test",
"dueDate":"2022-02-14",
"description":"test",
"priority":"low",
"status":"active"
}
--------------------------------------------
Update
PUT: http://localhost:5000/todo/update-note
Query Param: id
Body: 
{
"title":"test",
"dueDate":"2022-02-14",
"description":"test",
"priority":"low",
"status":"active"
}
--------------------------------------------
Delete
DELETE: http://localhost:5000/todo/delete-notes
Query Param: id
--------------------------------------------
Get all
GET: http://localhost:5000/todo/get-notes
--------------------------------------------
Get Title
GET: http://localhost:5000/todo/list-title
--------------------------------------------
Get By ID
GET: http://localhost:5000/todo/get-note-by-id
Query Param: id