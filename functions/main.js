import { Client, Databases } from "node-appwrite";


const PROJECT_ID = process.env.PROJECT_ID
const DATABASE_ID = process.env.DATABASE_ID
const COLLECTION_ID_ALLUSERS = process.env.COLLECTION_ID_ALLUSERS

export default async ({ req, res, log, error }) => {

    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(PROJECT_ID)

    const db = new Databases(client)
    if (req.method == 'GET') {
        const response = await db.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_ALLUSERS
        )
        return res.json(response.documents)
    }

    return res.send("Shlok, tesing if user delete worked")
}