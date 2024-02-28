const getPutFields = (body) => {

    const fields = Object.keys(body).filter(Boolean);

    const setClause = fields
        .map((field, index) => `${field}=$${index + 1}`)
        .join(', ');

    const values = Object.values(body);

    return { fields, setClause, values }
}

module.exports = getPutFields;