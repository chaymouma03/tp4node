const express = require('express');
const productCollection = require('./config');
const connect = require('./config/connectDB');
const { model } = require('mongoose');

const app = express();
//convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//use ejs as view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

connect();

//routes
app.get('/', (req, res) => {
    res.render("home");
});


app.route("/addProduct")
.get((req, res) => {
    res.render("addProduct");
})
.post(async (req, res) => {    
    try{
        const newProduct = new productCollection ({...req.body})
        await newProduct.save();
        res.send("Product quantity updated successfully!");
    }catch(err){
        console.log(err);
    }
});


app.get("/listOfProduct", async (req, res) => {
    try{
        const listProducts = await productCollection.find({}, {"__v": false});
        res.render('listOfProduct', {listProducts});
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
});


app.route("/findProduct")
.get(async (req, res) => {
    //res.render("findProduct");
    //const x = req.query.model;
    //console.log(x);
    try{
        const x = req.query.model;
        if(x == undefined){
            res.render("findProduct");
        }else{
            const item = await productCollection.findOne({ model: x });
            if (!item) {
                return res.status(404).send('item not found');
            }else{
                res.send(`
                    <html>
                        <head>
                            <title>Search Results</title>
                        </head>
                        <body>
                            <h2>Search Results : </h2>
                            <p>Model: ${item.model}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </body>
                    </html>
                `);
            }
        }
    }catch(err){
        console.log(err);
    }
})


const port = 5000;
app.listen(port, () => {
    console.log(`The server is running on port : ${port}`);
});