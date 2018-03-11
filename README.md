MakeLove
A NodeJS script to backup, create a ".love" file of your game and obfuscate your code using luajit for Mac

Required packages:

Make sure to install the child_process use this script.
Run: npm install child_process
https://www.npmjs.com/package/child_process/tutorial

For code obfuscation be sure to install Luajit.
http://luajit.org/install.html


Creating/formatting the build.JSON:
 
Be sure to create a JSON file with all the lua files you'd like to obfuscate.

NOTE: Do not add non-lua files or the conf.lua as it will cause luajit to fail.

The file should look like:
{
	"main":"main.lua",
	"controls":"inc/controls.lua"
}


Executing the script:

Make sure that the MakeLove.js file is in the same directory as your "main.lua"

Using this script with and without arguments for added features:

To just create a SuperGame.love file run:  node MakeLove.js

To create a zipped backup before processing to create a SuperGame.love file run:  node MakeLove.js -b

To obfuscate your code and create a SuperGame.love file run:  node MakeLove.js -o

To backup, obfuscate code and create a SuperGame.love file run:  node MakeLove.js -o -b


Created for public use by Jas.
http://www.realjas.com