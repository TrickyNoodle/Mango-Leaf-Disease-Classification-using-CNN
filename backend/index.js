import express from 'express'
let backend=express()

backend.get("/",(request,response)=>{
    response.sendStatus(200)
})
backend.listen(3000,()=>{
    console.log('Server Running at http://localhost:3000')
})
