const connection = require("../mysql");
// Define SQL queries to create the tables
const createTablesQueries = [
  `CREATE TABLE IF NOT EXISTS OWNER (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    email_id VARCHAR(100),
    contact_no VARCHAR(15),
    password VARCHAR(100)
  )`,
  `CREATE TABLE IF NOT EXISTS VEHICLE (
    reg_no VARCHAR(20) PRIMARY KEY,  -- Change primary key to reg_no
    owner_id INT,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    color VARCHAR(20),
    chasis_number VARCHAR(50),
    engine_no VARCHAR(50),
    FOREIGN KEY (owner_id) REFERENCES OWNER(owner_id)
  )`,
  `CREATE TABLE IF NOT EXISTS OTR (
    req_id INT AUTO_INCREMENT PRIMARY KEY,
    req_date DATE,
    reason VARCHAR(200),
    status VARCHAR(20),
    vehicle_id VARCHAR(20),
    current_owner_id INT,
    new_owner_id INT,
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(reg_no),
    FOREIGN KEY (current_owner_id) REFERENCES OWNER(owner_id),
    FOREIGN KEY (new_owner_id) REFERENCES OWNER(owner_id)
  )`,
  `CREATE TABLE IF NOT EXISTS INSURANCE (
    insurance_id INT AUTO_INCREMENT PRIMARY KEY,
    coverage_start_date DATE,
    coverage_end_date DATE,
    provider VARCHAR(100),
    policy_no VARCHAR(50),
    vehicle_id VARCHAR(20),
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(reg_no)
  )`,
  `CREATE TABLE IF NOT EXISTS PUC (
    puc_id INT AUTO_INCREMENT PRIMARY KEY,
    expiry_date DATE,
    emission_level VARCHAR(20),
    vehicle_id VARCHAR(20),
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(reg_no)
  )`,
];

// Rest of your code...

createTablesQueries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created successfully");
    }
  });
});

module.exports = createTablesQueries;


// -- Insert more data into OWNER table
// INSERT INTO OWNER (name, address, email_id, contact_no, password)
// VALUES 
//     ('Alice Johnson', '456 Elm St', 'alice.j@example.com', '987-654-3210', 'pass123'),
//     ('Bob Smith', '789 Oak Ave', 'bob.smith@example.com', '555-123-4567', 'secret321'),
//     ('Eva Green', '321 Pine Rd', 'eva.g@example.com', '333-777-1111', 'secure567'),
//     ('Michael Brown', '111 Birch Ln', 'michael.b@example.com', '111-222-3333', 'p@ssw0rd'),
//     ('Sara Davis', '222 Cedar St', 'sara.d@example.com', '444-555-6666', 'sara123');

// -- Insert more data into VEHICLE table
// INSERT INTO VEHICLE (reg_no, owner_id, make, model, year, color, chasis_number, engine_no)
// VALUES 
//     ('XYZ789', 1, 'Honda', 'Civic', 2020, 'Red', '9876543210', '1234567890'),
//     ('LMN456', 2, 'Ford', 'F-150', 2019, 'Silver', '5678901234', '0987654321'),
//     ('PQR123', 3, 'Chevrolet', 'Malibu', 2021, 'White', '1234509876', '6789012345'),
//     ('JKL567', 4, 'Nissan', 'Altima', 2018, 'Black', '5678123450', '3456789012'),
//     ('UVW234', 5, 'Volkswagen', 'Jetta', 2023, 'Blue', '2345678901', '9012345678');

// -- Insert more data into OTR table
// INSERT INTO OTR (req_date, reason, status, vehicle_id, current_owner_id, new_owner_id)
// VALUES 
//     ('2023-02-10', 'Ownership Transfer', 'Approved', 'XYZ789', 1, 2),
//     ('2023-03-20', 'Ownership Transfer', 'Pending', 'LMN456', 2, 3),
//     ('2023-04-05', 'Ownership Transfer', 'Approved', 'PQR123', 3, 4),
//     ('2023-05-15', 'Ownership Transfer', 'Pending', 'JKL567', 4, 5),
//     ('2023-06-25', 'Ownership Transfer', 'Approved', 'UVW234', 5, 1);

// -- Insert more data into INSURANCE table
// INSERT INTO INSURANCE (coverage_start_date, coverage_end_date, provider, policy_no, vehicle_id)
// VALUES 
//     ('2023-02-01', '2023-12-31', 'Insurance Co.', 'POL789', 'XYZ789'),
//     ('2023-03-01', '2023-12-31', 'Insurance Co.', 'POL456', 'LMN456'),
//     ('2023-04-01', '2023-12-31', 'Insurance Co.', 'POL234', 'PQR123'),
//     ('2023-05-01', '2023-12-31', 'Insurance Co.', 'POL567', 'JKL567'),
//     ('2023-06-01', '2023-12-31', 'Insurance Co.', 'POL123', 'UVW234');

// -- Insert more data into PUC table
// INSERT INTO PUC (expiry_date, emission_level, vehicle_id)
// VALUES 
//     ('2023-07-15', 'Low', 'XYZ789'),
//     ('2023-08-30', 'Low', 'LMN456'),
//     ('2023-09-10', 'Medium', 'PQR123'),
//     ('2023-10-05', 'Low', 'JKL567'),
//     ('2023-11-20', 'Medium', 'UVW234');
