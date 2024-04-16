import { Router } from 'express';
import client from '../db';
import getPutFields from '../utils/getPutFields';

const router = Router();

router.get('/', (request, response) => {
    const { includeContacts } = request.query;
    try {
        client.query(`SELECT
                        s.sponsor_id as id,
                        s.street,
                        s.city,
                        s.name,
                        s.is_active,
                        s.date_created
                        ${includeContacts ? ", json_agg(json_build_object('name', c.name, 'email', c.email)) AS contacts" : ''} 
                    FROM
                        sponsors s
                    ${includeContacts ? 'LEFT JOIN contacts c ON s.sponsor_id = c.sponsor_id' : ''}
                    GROUP BY
                        s.sponsor_id;
      `, (err, data) => {
            if (err) return response.send(err);
            response.send(data.rows);
        });
    } catch (err) {
        response.send(err);
    }
});

router.post('/', (request, response) => {
    const { name, street, city } = request.body;
    try {
        client.query('INSERT INTO sponsors(name, street, city, date_created) VALUES ($1, $2, $3, current_timestamp) RETURNING *',
            [name, street, city],
            (err, data) => {
                if (err) return response.status(500).send(err);
                response.send(data.rows[0]);
            });
    } catch (err) {
        response.send(err);
    }
});

router.get('/contacts', (_, response) => {
    try {
        client.query('SELECT * FROM contacts', (err, data) => {
            if (err) return response.send(err);
            response.send(data.rows);
        });
    } catch (err) {
        response.send(err);
    }

});


router.post('/activate', (request, response) => {
    const { id, is_active } = request.body;
    try {
        client.query(`UPDATE sponsors SET is_active=$1 WHERE sponsor_id=$2`, [is_active, +id], (err, data) => {
            if (err) return response.send(err);
            if (data) {
                response.send(data.rows)
            }
        });

    } catch (err) {
        response.send(err)
    }
});

router.get('/:id', (request, response) => {
    const { id } = request.params;
    try {
        client.query(

            `SELECT a.*,
            b.contact_id, b.name as contact_name, b.email, b.phone, b.is_primary
            from sponsors a
            LEFT JOIN contacts b ON a.sponsor_id = b.sponsor_id
            where a.sponsor_id = $1`
            ,
            [id], (err, data) => {
                if (err) return response.status(500).send(err);


                const res = data.rowCount === 0 ? {} : {
                    sponsor_id: data.rows[0].sponsor_id,
                    name: data.rows[0].name,
                    street: data.rows[0].street,
                    city: data.rows[0].city,
                    contacts: data.rows[0]?.contact_id ? data.rows.map(row => {
                        return {
                            name: row.contact_name,
                            email: row.email,
                            phone: row.phone,
                            is_primary: row.is_primary
                        }
                    }) : []
                }
                response.send(res);
            })

    } catch (err) {
        response.status(500).send(err);
    }
})


router.put('/:id', (request, response) => {
    const { id } = request.params;

    const { setClause, fields, values } = getPutFields(request.body);

    try {
        client.query(`UPDATE sponsors SET ${setClause} WHERE sponsor_id = $${fields.length + 1}`, [...values, +id], (err, data) => {
            if (err) return response.send(err);
            if (data) {
                response.send(data.rows)
            }
        });

    } catch (err) {
        response.send(err)
    }
});

router.delete('/:id', (request, response) => {
    const { id } = request.params;
    try {
        client.query('DELETE FROM sponsors WHERE sponsor_id=$1', [+id], (err, data) => {
            response.send(data);
        })
    } catch (err) {
        response.send(err);
    }
});


router.post('/:id/contacts', (request, response) => {
    const { id: sponsor_id } = request.params;
    const { name, email, phone, is_primary } = request.body;

    try {
        client.query('INSERT INTO contacts(sponsor_id, name, email, phone, is_primary) VALUES ($1, $2, $3, $4, $5)',
            [sponsor_id, name, email, phone, is_primary],
            (err, data) => {
                if (err) return response.send(err);
                response.send('success');
            });
    } catch (err) {
        response.send(err);
    }

});

export default router;