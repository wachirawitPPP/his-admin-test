const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors'); 


const app = express();
const PORT =  process.env.PORT || 5000

app.get('/', (req, res)=>{
    res.send('API is running and can be used');
})
app.use(cors());


app.use(bodyParser.json());
app.use("/api",router)




app.listen(PORT, () =>{ 
    console.log(`Server running on port: ${PORT}`)
});