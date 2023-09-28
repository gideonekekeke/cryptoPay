require("dotenv").config()
const express = require("express");
const coinbase = require("coinbase-commerce-node");
const cors = require("cors")
const port = 7000;
const app = express();
app.use(express.json());
app.use(cors())

var Client = coinbase.Client;
var resource = coinbase.resources;

Client.init(process.env.COINBASE_KEY);

app.post("/checkout", async (req, res) => {
	try {
		const { amount, currency } = req.body;

		const charges = await resource.Charge.create({
			name: "Test Charge",
			description: "crypto transaction test",
			pricing_type: "fixed_price",
			local_price: {
				amount: amount,
				currency: currency,
			},
		});

		res.status(201).json({
			charge: charges,
		});
	} catch (err) {
		console.log("err", err);
	}
});

app.listen(port, () => {
	console.log("listening on port");
});
