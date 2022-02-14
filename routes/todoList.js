const router = require('express').Router();
const { 
    createNote,
    updateNote,
    deleteNotes,
    getNote,
    listTitle,
    getNoteByID
} = require('../controllers/todoList');
/**
* @swagger
* /todo/create-note:
*  post:
*    summary: Add a note
*    requestBody:
*      required: true
*      content:
*       application/json:
*        schema:
*         type: object
*    responses:
*           200:
*               description: ok
*/

router.post('/create-note',(req, res)=>{
    createNote(req, res)
    .then((response) => {
        return res.send(response);
    })
    .catch((error) => {
        return res.send({
            success: false,
            message: error.message,
        });
    })
});

/**
* @swagger
* /todo/update-note:
*  put:
*    summary: update note
*    parameters:
*      - name: id
*        in: query
*        description: note id
*        required: true
*    requestBody:
*      required: true
*      content:
*       application/json:
*        schema:
*         type: object
*    responses:
*      200:
*        description: OK
*/

router.put('/update-note',(req, res)=>{
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Id is Mandatory",
        });
    }
    updateNote(req, res)
    .then((response) => {
        return res.send(response);
    })
    .catch((error) => {
        return res.send({
            success: false,
            message: error.message,
        });
    })
});

/**
*@swagger
* /todo/delete-notes:
*  delete:
*    summary: delete one or more Notes
*    parameters:
*      - name: id
*        in: query
*        description: note id
*        required: true
*    responses:
*      200:
*        description: OK
*/

router.delete('/delete-notes',(req, res)=>{
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Id is Mandatory",
        });
    }
    deleteNotes(req, res)
    .then((response) => {
        return res.send(response);
    })
    .catch((error) => {
        return res.send({
            success: false,
            message: error.message,
        });
    })
});

/**
* @swagger
* /todo/get-notes:
*   get:
*       summary: This should return all todo notes
*       responses:
*           200:
*               description: all notes
*/

router.get('/get-notes',(req, res)=>{
    getNote(req, res)
    .then((response) => {
        return res.send(response);
    })
    .catch((error) => {
        return res.send({
            success: false,
            message: error.message,
        });
    })
});

/**
* @swagger
* /todo/list-title:
*   get:
*       summary: This should return all to do title
*       responses:
*           200:
*               description: to do title
*/

router.get('/list-title',(req, res)=>{
    listTitle(req, res)
    .then((response) => {
        return res.send(response);
    })
    .catch((error) => {
        return res.send({
            success: false,
            message: error.message,
        });
    })
});

/**
* @swagger
* /todo/get-note-by-id:
*  get:
*    summary: single note
*    parameters:
*      - name: id
*        in: query
*        description: note id
*        required: true
*    responses:
*      200:
*        description: OK
*/
router.get('/get-note-by-id',(req, res)=>{
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Id is Mandatory",
        });
    }
    getNoteByID(req, res)
    .then((response) => {
        return res.send(response);
    })
    .catch((error) => {
        return res.send({
            success: false,
            message: error.message,
        });
    })
});


module.exports = router;
