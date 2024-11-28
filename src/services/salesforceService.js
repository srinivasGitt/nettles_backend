const { conn } = require('../../config/salesforce');

const fetchOpportunities = async () => {
    const records = []
    const query = "SELECT Id, Name, Project__c, Amount, Project_Scope__c, Opportunity_Unique_ID__c,  Company__c FROM Opportunity LIMIT 100";
    return new Promise((resolve, reject) => {
        conn.query(query)
            .on("record", (record) => records.push(record))
            .on("end", () => resolve(records))
            .on("error", (error) => reject(error))
            .run({ autoFetch: true, maxFetch: 50 });
    });
};

// const fetchProjectInfo = async () => {

// }

const fetchContacts = async () => {
    // Query to fetch contacts
    const records = [];
    const query = "SELECT Id, FirstName, LastName, Phone, Email FROM Contact";
    return new Promise((resolve, reject) => {
        conn.query(query)
            .on("record", (record) => records.push(record))
            .on("end", () => resolve(records))
            .on("error", (error) => reject(error))
            .run({ autoFetch: true, maxFetch: 50 });
    });
}

const fetchAllContact = async () => {
    const records = [];
    const describeResult = await conn.sobject("Contact").describe(); // Describe the Contact object
    const fields = describeResult.fields.map(field => field.name); // Get all field names

    // Build the SOQL query dynamically
    const query = `SELECT ${fields.join(", ")} FROM Contact`;

    return new Promise((resolve, reject) => {
        conn.query(query)
            .on("record", (record) => records.push(record))
            .on("end", () => resolve(records))
            .on("error", (error) => reject(error))
            .run({ autoFetch: true });
    });
};

/**
 * Update a contact in Salesforce by its Id.
 * @param {String} contactId - The Id of the contact to update.
 * @param {Object} updateData - The fields and their new values for the update.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const updateContact = async (contactId, updateData) => {
    try {
        const result = await conn.sobject("Contact").update({
            Id: contactId,
            ...updateData
        });

        if (result.success) {
            console.log("Contact updated successfully:", result.id);
        } else {
            console.error("Failed to update contact:", result.errors);
        }

        return result;
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
};


const fetchProject = async () => {
    const records = [];
    const describeResult = await conn.sobject("GMB_Project__c").describe(); // Describe the Contact object
    const fields = describeResult.fields.map(field => field.name); // Get all field names

    // Build the SOQL query dynamically
    const query = `SELECT ${fields.join(", ")} FROM GMB_Project__c`;

    return new Promise((resolve, reject) => {
        conn.query(query)
            .on("record", (record) => records.push(record))
            .on("end", () => resolve(records))
            .on("error", (error) => reject(error))
            .run({ autoFetch: true });
    });
};

const fetchOpportunitiesByProjectName = async (projectId) => {
    const records = [];
    const query = `SELECT Id, Name, Project__c, Amount, Project_Scope__c, Opportunity_Unique_ID__c, Company__c 
                   FROM Opportunity WHERE Project_18_Digit_ID__c = '${projectId}'`;
    return new Promise((resolve, reject) => {
        conn.query(query)
            .on("record", (record) => records.push(record))
            .on("end", () => resolve(records))
            .on("error", (error) => reject(error))
            .run({ autoFetch: true });
    });
};


/**
 * Fetches project information with selected fields from Salesforce.
 * @returns {Promise<Array>} Filtered project details.
 */
const fetchProjectInfo = async () => {
    const records = [];
    const fields = [
        "Project_Status__c",
        "gmb_Earliest_Bid_Date__c",
        "Contract_With__c",
        "gmb_Project_State__c",
        "gmb_City__c",
        "gmb_Project_Location__c",
        "Street__c",
        "Zip_Code__c",
    ];

    const query = `SELECT ${fields.join(", ")} FROM GMB_Project__c`;

    try {
        const projects = await new Promise((resolve, reject) => {
            conn.query(query)
                .on("record", (record) => records.push(record))
                .on("end", () => resolve(records))
                .on("error", (error) => reject(error))
                .run({ autoFetch: true });
        });

        return projects.map((project) => ({
            Project_Status__c: project.Project_Status__c || null,
            gmb_Earliest_Bid_Date__c: project.gmb_Earliest_Bid_Date__c || null,
            Contract_With__c: project.Contract_With__c || null,
            Address: {
                State: project.gmb_Project_State__c || null,
                City: project.gmb_City__c || null,
                Location: project.gmb_Project_Location__c || null,
                Street: project.Street__c || null,
                ZipCode: project.Zip_Code__c || null,
            },
        }));
    } catch (error) {
        throw new Error(`Error fetching project info: ${error.message}`);
    }
};

const fetchOpportunitiesWithProjectDetails = async (projectId) => {
    const records = [];
    const query = `SELECT 
                    Opportunity.Name, 
                    Opportunity.Delivery_Method__c, 
                    Opportunity.dv_Type__c, 
                    Opportunity.Project_Scope__c, 
                    Opportunity.Opportunity_UUID__c, 
                    Opportunity.Company__c, 
                    (SELECT Name, Project_UUID__c FROM GMB_Project__r WHERE Id = '${projectId}')
                   FROM Opportunity 
                   WHERE Project_18_Digit_ID__c = '${projectId}'`;
    return new Promise((resolve, reject) => {
        conn.query(query)
            .on("record", (record) => records.push(record))
            .on("end", () => resolve(records))
            .on("error", (error) => reject(error))
            .run({ autoFetch: true });
    });
};


module.exports = {
    fetchOpportunities,
    fetchContacts,
    updateContact,
    fetchAllContact,
    fetchProject,
    fetchOpportunitiesByProjectName,
    fetchProjectInfo,
    fetchOpportunitiesWithProjectDetails
};
