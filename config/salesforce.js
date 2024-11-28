const jsforce = require('jsforce');

const conn = new jsforce.Connection({
    loginUrl: 'https://gmbarchsales--partialsb.sandbox.my.salesforce.com'
});

const loginToSalesforce = async () => {
    try {
        const userInfo = await conn.login('srinivas.g@nettlescs.com.partialsb', 'Srinivas91$hZFfro0uGkkaFZMQBf1VK8R4W');
        console.log("User ID:", userInfo.id);
        console.log("Org ID:", userInfo.organizationId);
    } catch (error) {
        console.error("Salesforce login failed:", error);
    }
};

module.exports = { conn, loginToSalesforce };