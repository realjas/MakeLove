/** Required packages **/
/*
Make sure to install the child_process use this script.

Run: npm install child_process

https://www.npmjs.com/package/child_process/tutorial

For code obfuscation be sure to install Luajit.

http://luajit.org/install.html
*/

/** Creating/formatting the build.JSON **/
/*
Be sure to create a JSON file with all the lua files you'd like to obfuscate.
NOTE: Do not add non-lua files or the conf.lua as it will cause luajit to fail.

The file should look like:
{
	"main":"main.lua",
	"controls":"inc/controls.lua"
}
*/

/** Executing the script **/
/*
Make sure that the MakeLove.js file is in the same directory as your "main.lua"

Using this script with and without arguments for added features:

To just create a SuperGame.love file run:  node MakeLove.js

To create a zipped backup before processing to create a SuperGame.love file run:  node MakeLove.js -b

To obfuscate your code and create a SuperGame.love file run:  node MakeLove.js -o

To backup, obfuscate code and create a SuperGame.love file run:  node MakeLove.js -o -b
*/

const fs = require('fs');
const { exec } = require('child_process');

var build = fs.readFileSync(__dirname + "/build.json");
var obj = JSON.parse(build);

var arg1 = process.argv[2];
var arg2 = process.argv[3];

//Create a SuperGame folder since obfuscating is irreversible when committed to the same file
	
//Make SuperGame folder and copy game contents to SuperGame
exec('mkdir SuperGame; rsync -aP --exclude=SuperGame --exclude=MakeLove.js --exclude=build.json --exclude=.DS_Store * SuperGame/', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  if (stdout) {
  	console.log(`stdout: ${stdout}`);
  }
  if (stderr) {
  	console.log(`stderr: ${stderr}`);
  }
});

//Backup files for safety
if (arg1 == "-b" || arg2 == "-b") {
	exec('zip -9 -r backup.zip .', (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
	    return;
	  }
	
	  // the *entire* stdout and stderr (buffered)
	if (stdout) {
		console.log(`stdout: ${stdout}`);
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
	}
	});
}

//Obfuscate code
if (arg1 == "-o" || arg2 == "-o") {
	for(var attributename in obj){
    	//console.log(attributename+": "+obj[attributename]);
    
	    console.log("Obfuscated: " + __dirname+"/SuperGame/"+obj[attributename]);
	    console.log('...........'+'luajit -b SuperGame/' + obj[attributename] + ' SuperGame/' + obj[attributename]);
	    exec('luajit -b SuperGame/' + obj[attributename] + ' SuperGame/' + obj[attributename], (err, stdout, stderr) => {
	      if (err) {
	        // node couldn't execute the command
	        return;
	      }
	    
	      // the *entire* stdout and stderr (buffered)
			if (stdout) {
				console.log(`stdout: ${stdout}`);
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
	    });
	}
}

//Create SuperGame.love with all the files in the game's directory
exec('cd SuperGame/; zip -9 -r SuperGame.love .; cd ..; mv SuperGame.love ../SuperGame.love', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
	if (stdout) {
		console.log(`stdout: ${stdout}`);
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
	}
});