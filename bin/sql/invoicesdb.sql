CREATE TABLE sponsors (
    sponsor_id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    date_created DATE NOT NULL
);

CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    is_primary BOOLEAN DEFAULT false
);

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    identifier uuid DEFAULT gen_random_uuid(),
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    subject VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    due_at DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL
);

INSERT INTO sponsors (name, street, city, date_created) VALUES ('Sponsor A', '7 Etive AvenueBearsden', 'Glasgow', '2024-02-16');

INSERT INTO contacts (sponsor_id, name, email, phone) VALUES (1, 'John Doe', 'john@example.com', '111-222-3333');

INSERT INTO contacts (sponsor_id, name, email, phone) VALUES (1, 'Mary James', 'mary@example.com', '111-222-3344');

INSERT INTO invoices (sponsor_id, subject, created_at, due_at, total_amount) VALUES (1, 'Invoice 1', '2024-02-16','2025-02-16', 79.98);

