
// Import data from JSON files
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

// Initialize projects array
let projects = [];

// Initialize function to populate the projects array
const initialize = () => {
    return new Promise((resolve, reject) => {
        try {
            // Process projectData to include sector information
            projects = projectData.map(project => {
                const sector = sectorData.find(sector => sector.id === project.sector_id);
                return {
                    ...project,
                    sector: sector ? sector.sector_name : null
                };
            });
            resolve(); // Resolve the promise
        } catch (error) {
            reject("Error initializing projects: " + error.message); // Reject if error occurs
        }
    });
};

// Get all projects
const getAllProjects = () => {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects); // Resolve with the projects array
        } else {
            reject("No projects found."); // Reject if projects array is empty
        }
    });
};

// Get a project by ID
const getProjectById = (projectId) => {
    return new Promise((resolve, reject) => {
        const project = projects.find(proj => proj.id === projectId);
        if (project) {
            resolve(project); // Resolve with the found project
        } else {
            reject("Unable to find requested project."); // Reject if not found
        }
    });
};

// Get projects by sector
const getProjectsBySector = (sector) => {
    return new Promise((resolve, reject) => {
        const matchedProjects = projects.filter(proj => proj.sector && proj.sector.toLowerCase().includes(sector.toLowerCase()));
        if (matchedProjects.length > 0) {
            resolve(matchedProjects); // Resolve with matching projects
        } else {
            reject("Unable to find requested projects."); // Reject if none found
        }
    });
};

// Export the functions
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

// Testing the functions
initialize()
    .then(() => {
        return getAllProjects();
    })
    .then(projects => {
        console.log("All Projects:", projects);
    })
    .catch(error => {
        console.error(error);
    });
