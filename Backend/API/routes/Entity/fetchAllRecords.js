// In routes/Entity/fetchAllRecords.js
const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.get('/fetchAllRecords', async (req, res) => {
  const { entityid } = req.query;

  if (!entityid) {
    return res.status(400).json({ message: 'entityid parameter is required' });
  }

  try {
    // Step 1: Check if the given entity has masterentityid set to '1111'
    const [masterCheck] = await pool.query(`
      SELECT masterentityid 
      FROM EntityMaster 
      WHERE entityid = ?
    `, [entityid]);

    if (masterCheck.length === 0) {
      return res.status(404).json({ message: 'Entity not found' });
    }

    const masterEntityId = masterCheck[0].masterentityid;

    let query;
    let params;

    // Step 2: Determine the query based on masterEntityId
    if (masterEntityId === '1111') {
      // If masterentityid is '1111', get all records that start with entityid prefix
      query = `
        SELECT 
          entityid AS id,
          entityname AS "Entity Name",
          contactfirstname AS "First Name",
          contactlastname AS "Last Name",
          email AS "Email Id",
          mobile AS "Mobile Number",
          namespace AS "Namespace",
          country AS "Country",
          state AS "State",
          district AS "District",
          pincode AS "Pincode"
        FROM EntityMaster
        WHERE entityid LIKE CONCAT(?, '%') AND mark_deletion = 0
      `;
      params = [entityid];
    } else {
      // If masterentityid is not '1111', only get the specified record
      query = `
        SELECT 
          entityid AS id,
          entityname AS "Entity Name",
          contactfirstname AS "First Name",
          contactlastname AS "Last Name",
          email AS "Email Id",
          mobile AS "Mobile Number",
          namespace AS "Namespace",
          country AS "Country",
          state AS "State",
          district AS "District",
          pincode AS "Pincode"
        FROM EntityMaster
        WHERE entityid = ? AND mark_deletion = 0
      `;
      params = [entityid];
    }

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
});

module.exports = router;
