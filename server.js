/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ______________________ Student ID: ______________ Date: ______________
*
********************************************************************************/

// Import required modules
const express = require("express");
const projectData = require("./modules/projects");

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize projects data
projectData.initialize()
    .then(() => {
        // Set up routes
        app.get("/", (req, res) => {
            res.send("Assignment 2: Sujan Gautam - 171426224"); // Replace with your info
        });

        app.get("/solutions/projects", (req, res) => {
            projectData.getAllProjects()
                .then(projects => {
                    res.json(projects); // Respond with all projects
                })
                .catch(error => {
                    res.status(500).send(error); // Handle errors
                });
        });

        app.get("/solutions/projects/id-demo", (req, res) => {
            const projectId = 1; // Replace with a known project ID
            projectData.getProjectById(projectId)
                .then(project => {
                    res.json(project); // Respond with the project
                })
                .catch(error => {
                    res.status(404).send(error); // Handle not found error
                });
        });

        app.get("/solutions/projects/sector-demo", (req, res) => {
            const sector = "agriculture"; // Replace with a known sector
            projectData.getProjectsBySector(sector)
                .then(projects => {
                    res.json(projects); // Respond with matching projects
                })
                .catch(error => {
                    res.status(404).send(error); // Handle not found error
                });
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error initializing projects:", error);
    });
