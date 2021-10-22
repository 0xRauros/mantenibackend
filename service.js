var Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
var svc = new Service({
    name: 'API MANTENIMIENTO',
    description: 'API MANNTENIMIENTO 3011',
    script: "./build/index.js",
    env: {
        name: "HOME",
        value: process.env["USERPROFILE"] // service is now able to access the user who created its' home directory
    },
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
});
svc.on('install',function(){
  svc.start();
});
svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });

// Listen for the "install" event, which indicates the
// process is available as a service.

svc.install();

//svc.uninstall();