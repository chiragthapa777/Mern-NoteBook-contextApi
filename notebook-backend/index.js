const connectToMongo= require("./db");
const express = require('express')
const app = express()
const cors=require("cors")

//mongo connection
connectToMongo();

const port = 8000

app.use(express.json())
app.use(cors())

//routes:
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))



app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})