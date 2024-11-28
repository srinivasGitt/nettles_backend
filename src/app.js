const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger');
const salesforceRoutes = require('./routes/salesforceRoutes'); // Import routes
const { conn } = require('../config/salesforce');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use Salesforce routes under /api/salesforce
app.use('/api/salesforce', salesforceRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log(JSON.stringify(swaggerSpec, null, 2));

app.get("/api/salesforce/allOpportunities", async (req, res) => {
  try {
    // Get metadata for Opportunity object
    const meta = await conn.sobject("Opportunity").describe();

    // Get all field names
    const fields = meta.fields.map((field) => field.name);
    const query = `SELECT ${fields.join(", ")} FROM Opportunity`;

    // Query Salesforce
    const records = [];
    conn.query(query)
      .on("record", (record) => records.push(record))
      .on("end", () => res.json(records))
      .on("error", (error) => {
        console.error("Error querying Salesforce:", error);
        res.status(500).send("Error retrieving data");
      })
      .run({ autoFetch: true, maxFetch: 1000 });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/salesforce/allContacts", async (req, res) => {
  try {
    // Get metadata for Opportunity object
    const meta = await conn.sobject("Contact").describe();

    // Get all field names
    const fields = meta.fields.map((field) => field.name);
    const query = `SELECT ${fields.join(", ")} FROM Contact`;

    // Query Salesforce
    const records = [];
    conn.query(query)
      .on("record", (record) => records.push(record))
      .on("end", () => res.json(records))
      .on("error", (error) => {
        console.error("Error querying Salesforce:", error);
        res.status(500).send("Error retrieving data");
      })
      .run({ autoFetch: true, maxFetch: 100 });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get a specific opportunity by Id
app.get("/api/salesforce/opportunities/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query Salesforce to get the opportunity by Id
    const opportunity = await conn.sobject("Opportunity").retrieve(id);

    // Check if an opportunity was found
    if (!opportunity || !opportunity.Id) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    // Respond with the opportunity data
    res.json(opportunity);
  } catch (error) {
    console.error("Error querying Salesforce:", error);
    res.status(500).send("Internal Server Error");
  }
});


// app.get("/api/salesforce/projects", async (req, res) => {
//   try {
//     // Get metadata for Project object
//     const meta = await conn.sobject("GMB_Project__c").describe(); // Use "Project__c" if it's a custom object

//     // Get all field names
//     const fields = meta.fields.map((field) => field.name);
//     const query = `SELECT ${fields.join(", ")} FROM GMB_Project__c`;

//     // Query Salesforce
//     const records = [];
//     conn.query(query)
//       .on("record", (record) => records.push(record))
//       .on("end", () => res.json(records))
//       .on("error", (error) => {
//         console.error("Error querying Salesforce:", error);
//         res.status(500).send("Error retrieving data");
//       })
//       .run({ autoFetch: true, maxFetch: 100 });
//   } catch (error) {
//     console.error("API error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


app.get("/api/salesforce/match", async (req, res) => {
  const opportunityQuery = "SELECT Id, Name, OwnerId, AccountId FROM Opportunity LIMIT 100";
  const projectQuery = "SELECT Id, Name, OwnerId, gmb_Designer__c, gmb_GCCM__c FROM GMB_Project__c LIMIT 100";

  try {
    // Query Opportunity records
    const oppsResult = await new Promise((resolve, reject) => {
      conn.query(opportunityQuery, (err, result) => {
        if (err) return reject(err);
        resolve(result.records);
      });
    });

    // Query Project records
    const projectsResult = await new Promise((resolve, reject) => {
      conn.query(projectQuery, (err, result) => {
        if (err) return reject(err);
        resolve(result.records);
      });
    });

    // Find matching records
    const matches = oppsResult.filter((opp) =>
      projectsResult.some((proj) =>
        proj.OwnerId === opp.OwnerId
      )
    );

    // Return only the first 1000 matches
    res.json({ matches: matches.slice(0, 100) });
  } catch (error) {
    console.error("Error fetching Salesforce data:", error);
    res.status(500).json({ error: "Failed to fetch Salesforce data" });
  }
});

module.exports = app; // Export app for server.js
