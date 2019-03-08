const express = require('express')
const app = express()
const port = 8080
const customers = {};

app.use(express.json());

customers["abc"] = {
  "name":    "Neil Kolban",
  "id":      "abc",
  "loyalty": "gold"
};

app.get('/customer/:customerId', (req, res) => {
  console.log(`Log: GET /customer ${JSON.stringify(req.params)}`);
  const customerId = req.params.customerId;
  if (!customers.hasOwnProperty(customerId)) {
    res.status(404).send("No such customer");
    return;
  }
  res.status(200).send(JSON.stringify(customers[customerId]));
});

app.post("/customer", (req, res) => {
  console.log(`Request: POST/customer ${JSON.stringify(req.body)}`);
  customers[req.body.id] = req.body;
  res.status(200).send("Customer added.");
});

app.delete("/customer/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  console.log(`DELETE /customer/${customerId}`);
  delete customers[customerId];
  res.status(200).send("Customer deleted.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  console.log("Enter CTRL+C to cancel");
})
