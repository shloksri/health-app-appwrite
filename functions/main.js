import { Client, Databases } from "node-appwrite";

const PROJECT_ID = process.env.PROJECT_ID
const DB_ID = process.env.DB_ID
const COLLECTION_ID_PROFILES = process.env.COLLECTION_ID_PROFILES


export default async ({ req, res, log, error }) => {

    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(PROJECT_ID)

    const db = new Databases(client)
    if (req.method == 'GET') {
        const response = await db.listDocuments(
            DB_ID,
            COLLECTION_ID_PROFILES
        )
        return res.json(response.documents)
    }



    return res.send("Shlok, tesing if user delete worked")
}