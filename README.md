## Run:

To run the project run the command **npm run dev**.This command will automatically compile typscript code to javascript and will run index.js present in **_dist_** directory the following command will also prompt nodemon to keep watchin the changes in the directory so, you don't have run **node index.js** again and again.

## Build:

If you just want to compile typscript code then run command **npm run build**.

## Start:

**npm run start will** compile the typescript code and will run index.js present in **_dist_** directory.

**<mark>Note:</mark>** you can change index.js to your desired file name by changing **_package.json_** file as:

```json
  "compile": "tsc && node dist/app.js"
```


