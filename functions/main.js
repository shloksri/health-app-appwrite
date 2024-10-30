import { Client, Databases } from "node-appwrite";

const PROJECT_ID = '671f17fb0030e3b17ebc'
const DB_ID = '672258ee000b485826b6'
const COLLECTION_ID_PROFILES = '672258f600298c20687b'


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