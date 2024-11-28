const { fetchOpportunities, fetchContacts, updateContact, fetchAllContact, fetchProject, fetchOpportunitiesByProjectName, fetchProjectInfo } = require('../services/salesforceService');


// controllers/salesforceController.js

/**
 * @swagger
 * /salesforce/opportunities:
 *   get:
 *     summary: Get all opportunities
 *     description: Fetches the list of opportunities from Salesforce.
 *     responses:
 *       200:
 *         description: A list of opportunities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: The total number of opportunities.
 *                   example: 50
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: string
 *                         example: "0063100000YKbOLAA1"
 *                       Name:
 *                         type: string
 *                         example: "Docommun"
 *                       Project__c:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       Amount:
 *                         type: integer
 *                         example: 7480
 *                       Project_Scope__c:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       Opportunity_Unique_ID__c:
 *                         type: string
 *                         example: "OPP-2015-08-01285"
 *                       Company__c:
 *                         type: string
 *                         example: "WestPro"
 */

/**
 * @swagger
 * /salesforce/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Fetches a list of contacts from Salesforce.
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: The total number of contacts.
 *                   example: 50
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: string
 *                         example: "0036e00004FCYoKAAX"
 *                       FirstName:
 *                         type: string
 *                         example: "Brad"
 *                       LastName:
 *                         type: string
 *                         example: "Key"
 *                       Phone:
 *                         type: string
 *                         example: "+1234566"
 *                       Email:
 *                         type: string
 *                         example: "bradk@higginscommercial.com"
 */

/**
 * @swagger
 * /salesforce/contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Updates a contact's details using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: "Updated"
 *               LastName:
 *                 type: string
 *                 example: "User"
 *               Phone:
 *                 type: string
 *                 example: "+1234567890"
 *               Email:
 *                 type: string
 *                 example: "updated.email@example.com"
 *     responses:
 *       200:
 *         description: The contact was updated successfully.
 *       400:
 *         description: Bad request, invalid data.
 */


/**
 * @swagger
 * /salesforce/allProjects:
 *   get:
 *     summary: Get all projects
 *     description: Fetches the list of all projects from Salesforce.
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of projects.
 *                   example: 2003
 *                 records:
 *                   type: array
 *                   description: List of project records.
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: string
 *                         description: Unique ID of the project.
 *                         example: "a286e00000SISPKAA5"
 *                       Name:
 *                         type: string
 *                         description: Name of the project.
 *                         example: "Midtown Aggieville Mixed Use Tower"
 *                       OwnerId:
 *                         type: string
 *                         description: ID of the owner of the project.
 *                         example: "0055A00000BT2wyQAD"
 *                       IsDeleted:
 *                         type: boolean
 *                         description: Whether the project is deleted.
 *                         example: false
 *                       CreatedDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the project was created.
 *                         example: "2022-09-29T14:23:44.000+0000"
 *                       LastModifiedDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the project was last modified.
 *                         example: "2024-10-22T19:45:05.000+0000"
 *                       gmb_Project_State__c:
 *                         type: string
 *                         description: State where the project is located.
 *                         example: "KS"
 *                       gmb_Status__c:
 *                         type: string
 *                         description: Status of the project.
 *                         example: "Bid/Proposals"
 *                       gmb_TotalDVOppAmount__c:
 *                         type: number
 *                         description: Total amount for DVO opportunities.
 *                         example: 1372915
 *                       gmb_City__c:
 *                         type: string
 *                         description: City where the project is located.
 *                         example: "Manhattan"
 *                       gmb_Project_Location__c:
 *                         type: string
 *                         description: Full location of the project.
 *                         example: "Manhattan, KS"
 *                       Nettles_Estimating_Folder_Link__c:
 *                         type: string
 *                         description: Link to the project's estimating folder.
 *                         example: "https://westernfireproofing.sharepoint.com/sites/Estimating/Estimating/Midtown%20Aggieville%20Mixed%20Use%20Tower"
 *                       Project_Status__c:
 *                         type: string
 *                         description: Status of the project.
 *                         example: "Bid/Quote"
 *                       Project_Unique_ID__c:
 *                         type: string
 *                         description: Unique identifier for the project.
 *                         example: "PRJ-2022-09-00018"
 *                       Designer_Text__c:
 *                         type: string
 *                         description: Designer of the project.
 *                         example: "Anderson Knight Architects"
 *                       GC_CM_Text__c:
 *                         type: string
 *                         description: General contractor/construction manager for the project.
 *                         example: "BHS Construction, Inc."
 *                       Project_UUID__c:
 *                         type: string
 *                         description: Universally unique identifier for the project.
 *                         example: "100000"
 */

/**
 * @swagger
 * /salesforce/projectInfo:
 *   get:
 *     summary: Get filtered project details
 *     description: Fetches specific project details including status, bid date, contract details, and address fields.
 *     responses:
 *       200:
 *         description: Filtered project details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Project_Status__c:
 *                     type: string
 *                     description: Current status of the project.
 *                     example: "Bid/Quote"
 *                   gmb_Earliest_Bid_Date__c:
 *                     type: string
 *                     format: date
 *                     description: Earliest bid date of the project.
 *                     example: "2024-01-15"
 *                   Contract_With__c:
 *                     type: string
 *                     description: Details of the contract.
 *                     example: "Company ABC"
 *                   Address:
 *                     type: object
 *                     properties:
 *                       State:
 *                         type: string
 *                         description: State where the project is located.
 *                         example: "KS"
 *                       City:
 *                         type: string
 *                         description: City where the project is located.
 *                         example: "Manhattan"
 *                       Location:
 *                         type: string
 *                         description: Full textual description of the project location.
 *                         example: "Manhattan, KS"
 *                       Street:
 *                         type: string
 *                         description: Street address of the project.
 *                         example: "123 Main St."
 *                       ZipCode:
 *                         type: string
 *                         description: Zip code of the project location.
 *                         example: "66502"
 *       500:
 *         description: Server error
 */





const getOpportunities = async (req, res) => {
    try {
        const opportunities = await fetchOpportunities();
        res.json({ total: opportunities.length, records: opportunities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getContacts = async (req, res) => {
    try {
        const contacts = await fetchContacts();
        res.json({ total: contacts.length, records: contacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateContactHandler = async (req, res) => {
    const contactId = req.params.id;
    const updateData = req.body;

    try {
        const result = await updateContact(contactId, updateData);
        if (result.success) {
            res.json({ message: "Contact updated successfully", id: result.id });
        } else {
            res.status(400).json({ error: "Failed to update contact", details: result.errors });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the contact" });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const allContacts = await fetchAllContact();
        res.json({ total: allContacts.length, records: allContacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllProject = async (req, res) => {
    try {
        const allProject = await fetchProject();
        res.json({ total: allProject.length, records: allProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getOpportunitiesByProjectName = async (req, res) => {
    const projectId = req.params.Id;

    try {
        const opportunities = await fetchOpportunitiesByProjectName(projectId);
        res.json({ total: opportunities.length, records: opportunities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Controller to handle project details requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getProjectInfo = async (req, res) => {
    try {
        const projects = await fetchProjectInfo();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getOpportunities, getContacts, updateContactHandler, getAllContacts, getAllProject, getOpportunitiesByProjectName, getProjectInfo };
