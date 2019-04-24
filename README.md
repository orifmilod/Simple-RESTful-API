<h1> RESTful API</h1>

<p>In this RESTful API, there are 4 routes /user /products /orders and you can POST, PATCH, GET, DELETE, depending on the route.</p>

<br/>
<h3> Here are some examples: </h3>
<p> We are sending a POST request to /signup with email and password in JSON file, then it will be added to the MongoDB and passoword would be hashed. </p>

<img width="800" alt="3" src="https://user-images.githubusercontent.com/25881325/56637180-4a901080-666b-11e9-95f6-63b6c31c0ff4.png">

<p> We are sending a POST request to /signin with email and password in JSON file, then it will respond with a message and a token, 
the token will be used for <b>Authorization</b> for example:
 adding new Product, deleting product, deleting the user, etc.</p>

<img width="800" alt="2" src="https://user-images.githubusercontent.com/25881325/56637182-4a901080-666b-11e9-9bc3-5b308d97f605.png">
<img width="800" alt="Screenshot 2019-04-21 at 11 04 50" src="https://user-images.githubusercontent.com/25881325/56637183-4a901080-666b-11e9-9fce-4c4d728513ca.png">

Make sure to also add your Mongo Atlas Admin Username to a nodemon.json file (which you have to create).

{
    "env": {
        "MONGO_ATLAS_PW": "YOUR_MONGO_USER_PW"
    }
}
