import "dotenv/config";
import express from "express";
import * as paypal from "./paypal-api.js"
import cors from "cors";
const {PORT = 8888} = process.env;

const app =  express();

// app.use(express.static("public"));
app.use(cors())

// parse post params sent in body in json format
app.use(express.json());

// Route to create a PayPal order
app.post("/my-server/create-paypal-order", async (req,res) =>
{
    try{
        const order = await paypal.createOrder(req.body);
        res.json(order);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
})

// Route to ccapture payment of a PayPal order
app.post("/my-server/capture-paypal-order", async (req,res) =>
{
    try{
        const captureData = await paypal.capturePayment(req.body);
        res.json(captureData);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
})


app.listen(PORT, () =>
{
    console.log(`Server listening at http://localhost:${PORT}/`);
})