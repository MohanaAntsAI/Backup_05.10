// Import necessary modules
const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { 
    entityid, entityname, category, contactfirstname, contactlastname, 
    email, mobile, country, state, district, city, pincode, 
    masterentityid, user_id, address_line_1 = null, address_line_2 = null 
  } = req.body;

  const namespace = 'gsai.greentek';
  const mark_deletion = false;
  const creation_date = new Date();
  const last_update_date = new Date();
  const created_by_user_id = user_id;

  try {
    const [result] = await pool.query(
      `INSERT INTO EntityMaster (
         entityid, entityname, category, contactfirstname, contactlastname, email, mobile, 
         country, state, district, city, pincode, masterentityid, namespace, 
         creation_date, created_by_user_id, last_update_date, mark_deletion, 
         address_line_1, address_line_2
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [entityid, entityname, category, contactfirstname, contactlastname, email, mobile, 
       country, state, district, city, pincode, masterentityid, namespace, 
       creation_date, created_by_user_id, last_update_date, mark_deletion, 
       address_line_1, address_line_2]
    );

    res.status(201).json({ message: 'Entity added successfully', entityId: result.insertId });
  } catch (error) {
    console.error('Error adding entity:', error);
    res.status(500).json({ message: 'Error adding entity', error: error.message });
  }
});

module.exports = router;
