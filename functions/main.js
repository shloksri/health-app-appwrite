import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {

    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('671f17fb0030e3b17ebc')

    const db = new Databases(client)
    if (req.method == 'GET') {
        const response = await db.listDocuments(
            '672258ee000b485826b6',
            '672258f600298c20687b'
        )
        return res.json(response.documents)
    }

    return res.send("Shlok, tesing if user delete worked")
}