// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const tableData = require('../data/tableData');
const waitListData = require('../data/waitinglistData');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/tables', (req, res) => res.json(tableData));

  app.get('/api/waitlist', (req, res) => res.json(waitListData));

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/tables', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (tableData.length < 5) {
      tableData.push(req.body);
      res.json(true);
    } else {
      waitListData.push(req.body);
      res.json(false);
    }
  });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
 27  
routes/htmlRoutes.js
@@ -0,0 +1,27 @@
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
const path = require('path');

// ROUTING

module.exports = (app) => {
    // => HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content

    app.get('/api/notes', (req, res) => {
        res.json(allNotes.slice(1));
    })

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });
}; 