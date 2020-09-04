const Job = require("../models/job");
const { ipcMain } = require("electron");

async function fetchJobs() {
  const jobs = await Job.all();
  console.log(jobs);
  return jobs;
}

function initialize(mainWindow) {
  ipcMain.on("jobs-mounted", (event, args) => {
    fetchJobs()
      .then((data) => {
        mainWindow.webContents.send("jobs-loaded", data);
      })
      .catch((err) => {
        mainWindow.webContents.send("jobs-load-failed", { err });
      });
  });
}

module.exports = { initialize };
