const express = require('express');
const router = express.Router();
const controller = require('../controllers/logTypesController');

//#region log
router.get('/getall', controller.getAllLogTypes);
router.get('/getallused', controller.getAllLogTypesUsed);
router.get('/getalldeleted', controller.getAllLogTypesDeleted);
router.get('/getlogtypebyid/:id', controller.getLogTypeById);  
//#endregion
//#region POST
router.post('/createLogType', controller.createLogType);

//#endregion
//#region PUT
router.put('/editlogType', controller.EditLogType);

//#endregion
//#region 
router.delete('/removelogtype/:id', controller.removeLogType);

//#endregion
module.exports = router;
