#!/usr/bin/env node

// each object in the array consists of a key which refers to the source and
// the value which is the destination.
const filestocopy = [
  {
      "./google-services.json": [
          "./platforms/android/app/google-services.json"
      ],
      "./build.gradle": [
          "./platforms/android/build.gradle",
      ]
  },
];

const fs = require('fs');
const path = require('path');

filestocopy.forEach((obj) => {
  Object.keys(obj).forEach((key) => {
      const srcfile = key;
      for(const val of obj[key]){
          const destfile = val;
          console.log("copying "+srcfile+" to "+destfile);
          const destdir = path.dirname(destfile);
          if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
              fs.createReadStream(srcfile).pipe(
                  fs.createWriteStream(destfile));
          }
      }
  });
});
