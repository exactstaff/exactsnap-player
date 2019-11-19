const Job = require("../models/job");
const {ipcMain} = require('electron');

async function fetchJobs() {
    const jobs = await Job.all();
    return jobs;
}

function initialize(mainWindow) {
   ipcMain.on("jobs-mounted",(event, args)=>{
    fetchJobs()
    .then(data => {
        mainWindow.webContents.send('jobs-loaded', {data: data.jobs.data.data });
    })
   });
}

module.exports = {initialize};