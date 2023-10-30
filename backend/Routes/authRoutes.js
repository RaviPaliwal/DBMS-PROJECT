const express = require("express");
const connection = require("../mysql"); // Assuming your MySQL connection is in the parent directory
const router = express.Router();

router.get("/data", (req, res) => {
  connection.query("SELECT * FROM VEHICLE", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

router.post("/signup", (req, res) => {
  const { name, address, email_id, contact_no, password } = req.body;

  // Check if an owner with the same email or name already exists
  const checkExistingOwnerQuery =
    "SELECT owner_id FROM OWNER WHERE email_id = ? OR name = ?";
  connection.query(
    checkExistingOwnerQuery,
    [email_id, name],
    (err, results) => {
      if (err) {
        console.error("Error checking for existing owner:", err);
        res.status(500).json({ success: false, message: "Error checking for existing owner" });
        return;
      }
      if (results.length > 0) {
        res.status(400).json({ success: false, message: "An owner with the same email or name already exists" });
      } else {
        // Insert the owner data into the OWNER table
        const insertOwnerQuery =
          "INSERT INTO OWNER (name, address, email_id, contact_no, password) VALUES (?, ?, ?, ?, ?)";
        connection.query(
          insertOwnerQuery,
          [name, address, email_id, contact_no, password],
          (err, result) => {
            if (err) {
              console.error("Error signing up:", err);
              res.status(500).json({ success: false, message: "Error signing up" });
              return;
            }
            res.status(201).json({ success: true, message: "Owner signed up successfully" });
          }
        );
      }
    }
  );
});


// Route to log in
router.post("/login", (req, res) => {
  const { email_id, password } = req.body;

  // Query the OWNER table to check if the login credentials are valid
  const checkLoginQuery =
    "SELECT * FROM OWNER WHERE email_id = ? AND password = ?";
  connection.query(checkLoginQuery, [email_id, password], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ success: false, message: "Error logging in" });
      return;
    }
    if (results.length === 0) {
      res
        .status(401)
        .json({ success: false, message: "Invalid login credentials" });
    } else {
      res.status(200).json({ success: true, message: "Login successful",user: results});
    }
  });
});

router.get("/getallvehicles/:email", (req, res) => {
  connection.query(`select  reg_no,make,model,year,color,chasis_number,engine_no from vehicle v left join owner o on v.owner_id=o.owner_id where o.email_id ="${req.params.email}"`, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

router.get("/getpucinfo/:email", (req, res) => {
  connection.query(`SELECT v.reg_no, v.make, v.model, v.year, p.emission_level, p.expiry_date FROM vehicle v LEFT JOIN owner o ON v.owner_id = o.owner_id LEFT JOIN puc p ON p.vehicle_id = v.reg_no WHERE o.email_id ="${req.params.email}"`, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

router.get("/getinsuranceinfo/:email", (req, res) => {
  connection.query(`SELECT v.reg_no, v.make, v.model,coverage_start_date,coverage_end_date,provider,policy_no
  FROM vehicle v
  LEFT JOIN owner o ON v.owner_id = o.owner_id
  LEFT JOIN insurance i ON i.vehicle_id = v.reg_no
  WHERE o.email_id = "${req.params.email}"`, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

router.post("/ownership-transfer", (req, res) => {
  const { req_date, reason, vehicle_id, current_owner_id, new_owner_id } = req.body;

  // Insert the ownership transfer request into the OTR table
  const insertTransferRequestQuery = "INSERT INTO OTR (req_date, reason, status, vehicle_id, current_owner_id, new_owner_id) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    insertTransferRequestQuery,
    [req_date, reason, "pending", vehicle_id, current_owner_id, new_owner_id],
    (err, result) => {
      if (err) {
        console.error("Error creating ownership transfer request:", err);
        res.status(500).json({ success: false, message: "Error creating ownership transfer request" });
        return;
      }
      res.status(201).json({ success: true, message: "Ownership transfer request created successfully" });
    }
  );
});



module.exports = router;
