const getPutFields = (body: any) => {

    const fields = Object.keys(body).filter(Boolean);

    const setClause = fields
        .map((field, index) => `${field}=$${index + 1}`)
        .join(', ');

    const values = Object.values(body);

    return { fields, setClause, values }
}

export default getPutFields;