// console.log(21);

const express = require('express')

const cors = require("cors")


const bodyParser = require('body-parser')

require('dotenv').config();

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// function rootCall(req,res){
//     res.send("thank you");
// }

//mongo database connection
const  pass = "nkJmdZBWoy90Ubm7"; 


const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://dbUser:nkJmdZBWoy90Ubm7@cluster0-skxyb.mongodb.net/test?retryWrites=true&w=majority";
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("onLineStore").collection("products");
//   // perform actions on the collection object
//   collection.insertOne({
//       name:"laptop",
//       price:30000,
//       stock:40
//   },(err,result)=>{
//       console.log("successfully inserted...")
//   })
  
//   console.log("database connected... ");
  
//   client.close();
// });




const user={
    name:"GaduMia",
    email:"gadu-mia@gamil.com",
    phone:0987654321
};

//static url
app.get('/users',(req,res)=>res.send(user));


const users =["aa", "bb", "cc", "dd","ee"];


//dynamic url
app.get('/users/:id',(req,res)=>{
    const userId =req.params.id;
    const name=users[userId];

    res.send({userId,name});
})

//root url
app.get('/',(req,res)=>res.send("thank u for calling me"));




//for shipment component
//data post to database
app.post("/placeOrder",(req,res)=>{

    const orderDetails = req.body;
    orderDetails.orderTime =new Date();

    console.log("from req body:",orderDetails);


    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onLineStore").collection("orders");
        // perform actions on the collection object
        
        collection.insertOne(orderDetails,(err,result)=>{    
            
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                //console.log("successfully inserted...",result);

                //res.send(result);  //return to client
                res.send(result.ops[0]); //return to client
            }
            

        });
        
        console.log("database connected... ");
        
        client.close();
    });
      

    // res.send(req.body);
})








//for productDetail component
//dynamic single data retrieve from database
app.get('/product/:key',(req,res)=>{
    const ProductKey =req.params.key;

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onLineStore").collection("products");
        // perform actions
        
        collection.find({key:ProductKey}).toArray((err,documents)=>{    //result=documents
            
            if(err){
                console.log(err);
                //res.status(500).send({message:err});  //return error massage to client
            }
            else{
                //console.log("successfully get data from database....",documents);

                res.send(documents[0]); //single product info //return to client  //result=documents
            }
            

        });
        
        console.log("database connected... ");
        
        client.close();
      });
    
})


//for order review component
//dynamic multiple data retrieve from database using post method instead of get method
app.post("/getProductsByKey",(req,res)=>{
    
    const productKeys = req.body;
    //console.log(productKeys);

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onLineStore").collection("products");
        // perform actions
        
        collection.find( {key:{$in:productKeys}} ).toArray((err,documents)=>{    //result=documents
            
            if(err){
                console.log(err);
                //res.status(500).send({message:err});  //return error massage to client
            }
            else{
                //console.log("successfully get data from database....",documents);

                res.send(documents); //return to client  //result=documents
            }
            

        });
        
        console.log("database connected... ");
        
        client.close();
      });
    
})





//for shop component
//get from database
app.get("/products",(req,res)=>{

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onLineStore").collection("products");
        // perform actions
        //collection.find({price:{$gt:1000}}).limit(3).toArray((err,documents)=>{
        collection.find().toArray((err,documents)=>{    //result=documents
            
            if(err){
                console.log(err);
                //res.status(500).send({message:err});  //return error massage to client
            }
            else{
                //console.log("successfully get data from database....",documents);

                res.send(documents); //return to client  //result=documents
            }
            

        });
        
        console.log("database connected... ");
        
        client.close();
      });

})



//for inventory component
//post data into database
app.post("/addProduct",(req,res)=>{

    const product = req.body;
    //console.log("from req body:",product);


    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onLineStore").collection("products");
        // perform actions on the collection object
        //collection.insertOne(product,(err,result)=>{
        collection.insert(product,(err,result)=>{    
            
            if(err){
                console.log(err);
                //res.status(500).send({message:err});
            }
            else{
                //console.log("successfully inserted...",result);

                //res.send(product);  //return to client
                res.send(result.ops[0]); //return to client
            }
            

        });
        
        console.log("database connected... ");
        
        client.close();
      });
      

    // res.send(req.body);
})




//post 
// app.post("/addUser",(req,res)=>{
//     console.log("Post request.....");
//     console.log(req.body);

//     //save to database

//     //res.send(req.body); //return the post result

//     const user = req.body;
//     user.id=007;

//     res.send(user);


// })

const port = process.env.DB_PORT||3001||4200;
app.listen(port,()=>console.log(`listening to port ${port}`));