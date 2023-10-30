const express = require('express');
const createTablesQueries = require('./Models/CreateDatabase');
const app = express();
const port = 5001;
const authrouter = require('./Routes/authRoutes');
const generalrouter = require('./Routes/generalRoutes');
const cors = require('cors');
const bodyParser = require("body-parser");

// Use the route modules  
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authrouter);
app.use('/api/', generalrouter);


// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
