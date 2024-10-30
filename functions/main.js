import { Client, Databases } from "node-appwrite";

const PROJECT_ID = process.env.PROJECT_ID
const DB_ID = process.env.DB_ID
const COLLECTION_ID_PROFILES = process.env.DB_ID


export default async ({ req, res, log, error }) => {

    const client = new Client()
    client
        .setEndpoint()
        .setProject()

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