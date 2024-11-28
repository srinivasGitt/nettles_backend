const express = require('express');
const { getOpportunities, getContacts, updateContactHandler, getAllContacts, getAllProject, getOpportunitiesByProjectName, getProjectInfo } = require('../controllers/salesforceController');
const { loginToSalesforce } = require('../../config/salesforce');
const router = express.Router();

loginToSalesforce();
router.get('/opportunities', getOpportunities);
router.get('/contacts', getContacts);

router.put('/contacts/:id', updateContactHandler);
router.get('/allContact', getAllContacts);
router.get('/allProjects', getAllProject);
router.get('/projects/:Id/opportunities', getOpportunitiesByProjectName);
router.get('/projectInfo', getProjectInfo)

module.exports = router;
