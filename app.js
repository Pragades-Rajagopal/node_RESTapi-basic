const express = require ('express');
const bodyParser = require ('body-parser');
const db = require('./database/database');

const PORT = 9192;
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.send ("<H1>This is homepage</H2>");
});

app.get('/ticketapi/:id', (req, res) => {
    
    var id = req.params.id;
    const sql = "SELECT * FROM TICKETS WHERE TICKET_ID = ?";

    db.appDB.get(sql, [id], (err, row) => {
        if (err) {
            res.send(400).json({"error" : err.message});
            return;
        }

        else if (!row) {
            res.status(200).json({"oops": "no data"});
        }

        res.status(200).json(row);
    });
});

app.get("/ticketapi", (req, res) => {

    const sql = "SELECT * FROM TICKETS";

    db.appDB.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error" : err.message});
            return;
        }
        res.status(200).json(rows);
    });
});

app.post("/ticketapi", (req, res) => {
    
    var errors = [];
    if (!req.body.TICKET_ID) {
        errors.push("Ticket ID must be specified");
    }
    if (!req.body.RESOLUTION) {
        errors.push("RESOLUTION must be specified");
    }
    if (!req.body.CATEGORY) {
        errors.push("CATEGORY must be specified");
    }
    if (!req.body.USER_NM) {
        errors.push("User name must be specified");
    }
    if (!req.body.APP_NM) {
        errors.push("Application name must be specified");
    }
    if (!req.body.MON) {
        errors.push("MON must be specified");
    }

    if (errors.length) {
        res.status(400).json({"error" : errors});
        return;
    }

    var data = {
        TICKET_ID: req.body.TICKET_ID,
        RESOLUTION: req.body.RESOLUTION,
        CATEGORY: req.body.CATEGORY,
        USER_NM: req.body.USER_NM,
        APP_NM:req.body.APP_NM,
        MON: req.body.MON
    };

    const sql = "INSERT INTO TICKETS (TICKET_ID, RESOLUTION, CATEGORY, USER_NM, APP_NM, MON) VALUES (?, ?, ?, ?, ?, ?)";

    db.appDB.run(sql, [data.TICKET_ID, data.RESOLUTION, data.CATEGORY, data.USER_NM, data.APP_NM, data.MON], (err, result) => {

        if (err) {
            res.status(400).json({"error" : err.message});
            return;
        }

        res.status(201).json({"TICKET_ID" : data.TICKET_ID + " created successfully"});
    })
});

app.put("/ticketapi", (req, res) => {

    var errors = [];
    if (!req.body.TICKET_ID) {
        errors.push("Ticket ID must be specified");
    }
    if (!req.body.RESOLUTION) {
        errors.push("RESOLUTION must be specified");
    }
    if (!req.body.CATEGORY) {
        errors.push("CATEGORY must be specified");
    }
    if (!req.body.USER_NM) {
        errors.push("User name must be specified");
    }
    if (!req.body.APP_NM) {
        errors.push("Application name must be specified");
    }
    if (!req.body.MON) {
        errors.push("MON must be specified");
    }

    if (errors.length) {
        res.status(400).json({"error" : errors});
        return;
    }

    var data = {
        TICKET_ID: req.body.TICKET_ID,
        RESOLUTION: req.body.RESOLUTION,
        CATEGORY: req.body.CATEGORY,
        USER_NM: req.body.USER_NM,
        APP_NM:req.body.APP_NM,
        MON: req.body.MON
    };

    const sql = "UPDATE TICKETS SET RESOLUTION= ?, CATEGORY= ?, USER_NM= ?, APP_NM= ?, MON= ? WHERE TICKET_ID= ?";

    db.appDB.run(sql, [data.RESOLUTION, data.CATEGORY, data.USER_NM, data.APP_NM, data.MON, data.TICKET_ID], (err, result) => {
        if (err) {
            res.status(400).json({"error" : err.message});
        }

        res.status(200).json({"success" : data.TICKET_ID + " updated"});
    })

});

app.delete("/ticketapi/:id", (req, res) => {

    ticket_id = req.params.id;
    const sql = "DELETE FROM TICKETS WHERE TICKET_ID = ?";

    db.appDB.run(sql, [ticket_id], (err, result) => {
        if (err) {
            res.status(400).json({"error" : err.message});
        }

        res.status(200).json({"success" : ticket_id + " deleted"});
    })
});

app.listen(PORT, () => {
    console.log("Server is running in ", PORT);
});

