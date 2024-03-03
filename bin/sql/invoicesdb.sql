CREATE TABLE sponsors (
    sponsor_id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
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
    identifier uuid DEFAULT gen_random_uuid(),
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    invoice_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL
);

INSERT INTO sponsors (name, street, city, phone) VALUES ('Sponsor A', '7 Etive AvenueBearsden', 'Glasgow', '111-222-3333');

INSERT INTO contact_persons (sponsor_id, name, email, phone) VALUES (1, 'John Doe', 'john@example.com', '111-222-3333');

INSERT INTO invoices (sponsor_id, invoice_date, total_amount) VALUES (1, '2024-02-16', 79.98);

