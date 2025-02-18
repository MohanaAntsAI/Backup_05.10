const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');  // Use the DB connection from db folder
const loginRoutes = require('./routes/loginRoutesVp');
const installationRoutes = require('./routes/installationRoutes');
const plantRoutes = require('./routes/PlantCountForm');
const profile = require('./routes/profile');
const sync = require('./routes/sync');
const signup = require('./routes/signup');
const verifyToken = require('./middleware/auth');  // JWT middleware
const sendOtp = require('./routes/sendOtp');
const verifyOtp = require('./routes/verifyOtp');
const forgot = require('./routes/forgot-pass');
const checkEmailRoute = require('./routes/checkemail');
const states = require('./routes/States');
const Dis = require('./routes/District');
const getCountry = require('./routes/getCountry');
const getRegion = require('./routes/getRegion');
const getState = require('./routes/getState');
const getDistrict = require('./routes/getDistrict');
//Entity routes
const getEntityDetailsRoute = require('./routes/Entity/getEntityDetails');
const getCategories = require('./routes/Entity/category');
const generateentityid = require('./routes/Entity/generateEntityId')
const disable=require('./routes/Entity/markEntityAsDeleted');
const addNewEntityRoute = require('./routes/Entity/addNewEntity');
const fetchEntitiesRoute = require('./routes/Entity/fetchEntities');
const fetchEntityByIdRoute = require('./routes/Entity/fetchEntityById');
const fetchEntityIdsRoute = require('./routes/Entity/fetchEntityIds');
const fetchEntityNamesRoute = require('./routes/Entity/fetchEntityNames');
const fetchAllRecordsRoute = require('./routes/Entity/fetchAllRecords');
const editentity = require('./routes/Entity/editEntity')
//plant routes
const generateplantid = require('./routes/Plant/generatePlantId');
const entitynames = require('./routes/Plant/fetchEntityNames');
const getEntityDetails = require('./routes/Plant/getEntityDetails')








require('dotenv').config();  // Load environment variables

const app = express();
const port = 3001;  // Define the port number to listen on

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route to check if the server is responding
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route is working' });
});

// Use JWT middleware for specific routes that require authentication
app.use('/profile', verifyToken, profile);  // Example: profile route is protected
app.use('/sync', sync);  // Example: public route without JWT

// Mount routes
app.use('/login', loginRoutes);
app.use('/', installationRoutes);
app.use('/', plantRoutes);
app.use('/', signup);
app.use('/send-otp', sendOtp);  // Uncomment OTP routes
app.use('/verify-otp', verifyOtp);
app.use('/forgot-pass',forgot);
app.use('/', checkEmailRoute);
app.use('/',states);
app.use('/',Dis);
app.use('/api', getCategories);
app.use('/api', getCountry);
app.use('/api', getRegion);
app.use('/api', getState);
app.use('/api', getDistrict);
//Entity
app.use('/api/entity', addNewEntityRoute);
app.use('/add-entity',addNewEntityRoute);
app.use('/api/entity', fetchEntitiesRoute);
app.use('/api/entity', fetchEntityByIdRoute);
app.use('/api/entity', fetchEntityIdsRoute);
app.use('/api/entity', fetchEntityNamesRoute);
app.use('/api/entity', fetchAllRecordsRoute);
app.use('/api/entity',editentity);
app.use('/api/entity', getEntityDetailsRoute);
app.use('/api/entity', generateentityid);
app.use('/api/entity', disable);
//PLant
app.use('/api/plant',generateplantid);
app.use('/api/plant',entitynames);
app.use('/api/plant',getEntityDetails);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
