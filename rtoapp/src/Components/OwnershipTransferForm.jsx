import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const OwnershipTransferForm = ({ user }) => {
  const [formData, setFormData] = useState({
    reason: "",
    vehicle_id: "",
    new_owner_id: "",
    current_owner_id: user.owner_id, // Set the current owner ID from props
    status: "pending", // Set the default status to "pending"
    req_date: new Date().toISOString().split('T')[0], // Set the date using Date.now()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/ownership-transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        alert("OTR Added Successfully")
        // Handle the success response here
      } else {
        throw new Error("Error creating ownership transfer request");
      }
    } catch (error) {
      console.error(error);
      // Handle errors here
    }

  };

  return (
    <form>
      <TextField
        style={{ marginBottom: "8px" }}
        name="reason"
        label="Reason"
        value={formData.reason}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        style={{ marginBottom: "8px" }}
        name="vehicle_id"
        label="Vehicle ID"
        value={formData.vehicle_id}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        style={{ marginBottom: "8px" }}
        name="new_owner_id"
        label="New Owner ID"
        value={formData.new_owner_id}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        style={{ textAlign: "center" }}
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default OwnershipTransferForm;
