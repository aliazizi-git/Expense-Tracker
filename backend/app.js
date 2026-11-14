import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { catchError } from 'vanta-api'
import exportValidation from './middlewares/exportValidation.js'
import authRouter from './modules/Auth/auth.js'
import isLogin from './middlewares/isLogin.js'
import categoryRouter from './modules/Category/category.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(exportValidation)

app.use('/api/auth',authRouter)
app.use('/api/categories',isLogin,categoryRouter)

app.get('/',(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"Expense Tracker API is running..."
    })
})

app.use((req,res,next)=>{
    return res.status(404).json({
        success:false,
        message:"Route Not found"
    })
})

app.use(catchError)
export default app