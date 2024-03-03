const { Router } = require("express");
const client = require("../db");
const getPutFields = require("../utils/getPutFields");

const router = Router();

router.get('/', (req, res) => {
    try {
        client.query('SELECT * FROM contact_persons', (err, data) => {
            res.send(e ?? data);
        });
    } catch (e) {
        res.send(e);
    }
});

router.post('/', (req, res) => {
    const { contact_id, sponsor_id, name, email, phone } = req.body;
    try {
        client.query('INSERT INTO contacts(contact_id, sponsor_id, name, email, phone) VALUES ($1, $2, $3, $4, $5)', [contact_id, sponsor_id, name, email, phone], (err, data) => {
            res.send(e ?? data.rows);
        });
    } catch (e) {
        res.send(e);
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { fields, setClause, values } = getPutFields(req.body);
    try {

        client.query(`UPDATE contacts SET ${setClause} WHERE contact_id=$${fields.length + 1}`, [...values, +id], (err, data) => {
            res.send(err ?? data.rows)
        })
    } catch (e) {
        res.send(err);
    }
});


router.delete(':/id', (req, res) => {
    const { id } = req.params();
    try {
        client.query('DELETE FROM contacts WHERE contact_id=$1', [id], (err, data) => {
            res.send(err ?? data.rows)
        });
    } catch (e) {
        res.send(e);
    }
});