const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "weather",
});

app.get("/users", (req, res) => {
  const user = req.query.username;
  const pass = req.query.passwords;
 
  db.query("SELECT * FROM users WHERE username = ? AND password = ? ", [user, pass], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/add", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.email;
  db.query(
    "INSERT INTO users (email_id,password,username) VALUES (?,?,?)",
    [email,password,username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Added successfully");
      }
    }
  );
});

app.get("/favorite", (req, res) => {
    const user = req.query.email_id;
   
    db.query("SELECT * FROM favorites WHERE email_id = ?", [user], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })

app.post("/favorite", (req, res)  => {
    const email = req.body.email;
    const city = req.body.city;
    db.query(
      "INSERT INTO favorites (email_id,city) VALUES (?,?)",
      [email,city],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Added successfully");
        }
      }
    );
  });




app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});