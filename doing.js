module.exports = function(app, connection) {
    app.get('/doing', function(req, res) {
        connection.query('SELECT * FROM doing', function(err, rows) {
            if (err) {
                console.log('Error reading doing');
                return sendStatus(500);
            }
            res.json(rows);
        });
    });
    app.post('/doing', function(req, res) {
        var query = `INSERT INTO doing (description, status) VALUES ('${req.body.description}', '${req.body.status}')`;
        connection.query(query, function(err, result) {
            if (err) {
                console.log("Error writing flash card:" + err.toString());
                return res.sendStatus(500);
            }
            res.json(result);
        })
    });

    app.put('/doing', function(req, res) {
        var query = `UPDATE doing set description = '${req.body.description}', status = '${req.body.status}' WHERE id = ${req.body.id}`;
        connection.query(query, function(err, result) {
            if (err) {
                console.log("Error updating doing with id:" + req.body.id);
                console.log(err.toString());
                return res.sendStatus(500);
            }
            res.json(result);
        });
    })
}
