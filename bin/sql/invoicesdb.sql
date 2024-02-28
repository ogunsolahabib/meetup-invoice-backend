CREATE TABLE sponsors (
    sponsor_id SERIAL PRIMARY KEY,
    identifier uuid DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20)
);

CREATE TABLE contact_persons (
    person_id SERIAL PRIMARY KEY,
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    is_primary_contact BOOLEAN DEFAULT false
);

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    invoice_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL
);

INSERT INTO sponsors (name, email, phone) VALUES ('Sponsor A', 'sponsorA@example.com', '123-456-7890');

INSERT INTO contact_persons (sponsor_id, name, email, phone) VALUES (1, 'John Doe', 'john@example.com', '111-222-3333');

INSERT INTO invoices (sponsor_id, invoice_date, total_amount) VALUES (1, '2024-02-16', 79.98);

