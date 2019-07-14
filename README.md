<h1> RESTful API</h1>

<p>In this RESTful API, there are 4 routes /user /products /orders and you can POST, PATCH, GET, DELETE, depending on the route.</p>

<h3> Here are some examples: </h3>
<p> We are sending a POST request to /signup with email and password in JSON file, then it will be added to the MongoDB and passoword would be hashed. </p>

<img width="800" alt="3" src="https://user-images.githubusercontent.com/25881325/56637180-4a901080-666b-11e9-95f6-63b6c31c0ff4.png">

<p> We are sending a POST request to /signin with email and password in JSON file, then it will respond with a message and a token, 
the token will be used for <b>Authorization</b> for example:
 adding new Product, deleting product, deleting the user, etc.</p>

<h1>API's</h1>
<h3>Products</h3>
<ul>
  <li> <b>GET:</b> /api/products </li>
  <li> <b>POST:</b> /api/products **Needs to be Authenticated And pass the token** </li>
  <li> <b>GET:</b> /api/products/:productID </li>
  <li> <b>PATCH:</b> /api/products/:productID **Needs to be Authenticated And pass the token** </li>
  <li> <b>DELETE:</b> /api/products/:productID **Needs to be Authenticated And pass the token** </li>
</ul>

<h3>Users</h3>
<ul>
  <li> <b>POST:</b> /api/users/signup  </li>
  <li> <b>POST:</b> /api/users/signin **Needs to be Authenticated And pass the token** </li>
  <li> <b>DELETE:</b> /api/users/:userID </li>
</ul>

<h3>Orders</h3>
<ul>
  <li> <b>GET:</b> /api/orders **Needs to be Authenticated And pass the token** </li>
  <li> <b>POST:</b> /api/orders **Needs to be Authenticated And pass the token** </li>
  <li> <b>GET:</b> /api/orders/:orderID **Needs to be Authenticated And pass the token** </li>
  <li> <b>DELETE:</b> /api/orders/:orderID **Needs to be Authenticated And pass the token**  </li>
</ul>

Make sure to also add your Mongo Atlas Admin Username to a nodemon.json file (which you have to create).
```
{
    "env": {
        "MONGO_ATLAS_PW": "YOUR_MONGO_USER_PW"
    }
}
```
