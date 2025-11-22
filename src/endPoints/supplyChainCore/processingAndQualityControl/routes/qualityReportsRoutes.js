const router = require('express');

const qualityRouter = router.Router();
const QualityReportController = require('../controllers/qualityReportController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const ROLES = require('../../../auth/middleware/roles');

qualityRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.QUALITY_CONTROLLER]), QualityReportController.getAllQualityReports);
qualityRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.QUALITY_CONTROLLER]), QualityReportController.getQualityReportById);
qualityRouter.post('/new-quality-report',limiter, verifyToken, verifyRole([ROLES.QUALITY_CONTROLLER]), QualityReportController.createQualityReport);
qualityRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.QUALITY_CONTROLLER]), QualityReportController.updateQualityReport);
qualityRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), QualityReportController.deleteQualityReport);

module.exports = qualityRouter;