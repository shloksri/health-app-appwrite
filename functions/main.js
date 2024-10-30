import { Client, Databases } from "node-appwrite";

const PROJECT_ID = '671f17fb0030e3b17ebc'
const DB_ID = '671f2f4f00014e62eae3'
const COLLECTION_ID_PROFILES = '671f3276001caa90944d'


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