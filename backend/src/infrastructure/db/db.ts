import { PrismaClient } from ".prisma/client"

//at deployment dont forget to delete log
let prisma = new PrismaClient({log:['query', 'info', 'warn', 'error'],})

export default prisma