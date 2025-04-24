import { hashPassword } from "@root/src/application/helpers/password_utility";
import prisma from "../db"

const userNames = ['Yuta Tanaka', 'John Devil', 'Okada Tanaka', 'Kosuke ryu']
const categoryList = ['Technology', 'Cryptography', 'Finance', 'Game', 'Sports', 'Sociology', 'Cooking']
const seedData = async() =>{
    const users = await Promise.all(userNames.map(async(item, index)=>({
        name: item,
        email: `test${index}@example.xyz`,
        password: await hashPassword('Password1234!'),

    })));

    await prisma.user.createMany({
        data: users
    })

    const categories = categoryList.map(item=>({
        name: item
    }))

    await prisma.category.createMany({
        data: categories
    })
}

seedData()