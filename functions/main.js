// export default async ({ req, res, log, error }) => {

//     log("Request body - ", req.body)
//     log("Request method - ", req.method)
//     // error("Bhai error")
//     const event = req.headers['x-appwrite-event'];
//     log("Request headers: ", event)

//     return res.text("Check the Appwrite Console to see logs and errors!");
// }

import { Client, Databases, Users } from "node-appwrite";


const PROJECT_ID = process.env.VITE_PROJECT_ID
const DATABASE_ID = process.env.VITE_DATABASE_ID
const COLLECTION_ID_ALLUSERS = process.env.VITE_COLLECTION_ID_ALLUSERS

export default async ({ req, res, log, error }) => {
    const client = new Client();


    // Initialize the client with your Appwrite project settings
    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
        .setProject(PROJECT_ID) // Your project ID

    const database = new Databases(client);
    const users = new Users(client);

    const userId = req.body.userId; // Get the user ID from the payload

    try {
        // Fetch user details using the userId
        const userDetails = await users.get(userId);

        const userName = userDetails.name; // Assuming the user's name is stored in the `name` attribute
        const userEmail = userDetails.email; // Assuming the user's email is stored in the `email` attribute

        // Check if user exists in AllUsers collection
        const allUsers = await database.listDocuments(DATABASE_ID, COLLECTION_ID_ALLUSERS);

        const userExists = allUsers.documents.some(user => user.userID === userId);

        // If user does not exist, add them to AllUsers collection
        if (!userExists) {
            await database.createDocument(
                DATABASE_ID, COLLECTION_ID_ALLUSERS,
                'unique()', // Use userId as the document ID
                {
                    userID: userId,
                    name: userName,
                    email: userEmail
                }
            );
            log(`User added: ${userId} ${userEmail}`);
        } else {
            log(`User already exists: ${userId} ${userEmail}`);
        }

        res.send('Function executed successfully');
    } catch (error) {
        console.error(error);
        res.send('Error occurred: ' + error.message);
    }
};
