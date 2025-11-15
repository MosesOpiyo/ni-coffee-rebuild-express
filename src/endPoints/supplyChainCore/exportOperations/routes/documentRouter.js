const express = require('express');
const DocumentController = require('../controllers/documentController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');

const documentRouter = express.Router();

documentRouter.get('/', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN, ROLES.LOGISTICS_MANAGER]), DocumentController.getAllDocuments);
documentRouter.get('/export/:exportId', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN, ROLES.LOGISTICS_MANAGER]), DocumentController.getDocumentsByExportId);
documentRouter.get('/:id', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN, ROLES.LOGISTICS_MANAGER]), DocumentController.getDocumentById);
documentRouter.post('/new-document', verifyToken, verifyRole([ROLES.FARMER, ROLES.LOGISTICS_MANAGER]), DocumentController.createDocument);
documentRouter.put('/:id', verifyToken, verifyRole([ROLES.FARMER, ROLES.LOGISTICS_MANAGER]), DocumentController.updateDocument);

module.exports = documentRouter;