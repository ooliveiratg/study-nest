import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import 'dotenv/config'
import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient()




function generateUniqueDataBaseURL(schemaID: string){

    if(!process.env.DATABASE_URL){
    throw new Error('Please provider a database_url enviroment variable')
}

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema',schemaID)
    return url.toString()
}

const scheamaID = randomUUID()

beforeAll(async () => {
    const databaseURL = generateUniqueDataBaseURL(scheamaID)
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

})



afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${scheamaID}" CASCADE`)
    await prisma.$disconnect()
})