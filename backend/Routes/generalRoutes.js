const express = require("express");
const connection = require("../mysql"); // Assuming your MySQL connection is in the parent directory
const router = express.Router();

router.get("/getinfo/:regno", (req, res) => {
  connection.query(
    `SELECT 
         VEHICLE.reg_no,
         VEHICLE.make,
         VEHICLE.model,
         VEHICLE.year,
         VEHICLE.color,
         OWNER.name AS owner_name,
         OWNER.address AS owner_address,
         INSURANCE.coverage_end_date AS insurance_end,
         INSURANCE.provider AS insurance_provider
      FROM VEHICLE
      LEFT JOIN OWNER ON VEHICLE.owner_id = OWNER.owner_id
      LEFT JOIN PUC ON VEHICLE.reg_no = PUC.vehicle_id
      LEFT JOIN INSURANCE ON VEHICLE.reg_no = INSURANCE.vehicle_id
      WHERE VEHICLE.reg_no = "${req.params.regno}";`,
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).send("Database query error");
        return;
      }
      res.json(results);
    }
  );
});

module.exports = router;
