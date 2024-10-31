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


export default async ({ req, res, log }) => {
    log(JSON.stringify(req)); // Log the entire request object
    log("req body = ", req.body.userId ? req.body.userId : "Not found")
    log("req bodyJson = ", req.bodyJson.userId ? req.bodyJson.userId : "Not found")
    // log("req payload = ", req.payload.userId ? req.payload.userId : "Not found")
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(PROJECT_ID);

    const database = new Databases(client);
    const users = new Users(client);

    // Access userId from the payload
    const userId = req.body?.userId; // Using optional chaining for safety

    if (!userId) {
        log("used - req.body?.userId, userId is not defined in the payload.");
        return res.send('userId is missing');
    }
    else {
        log("used - req.body?.userId worked");
    }

    const userIDfromjson = req.bodyJson?.userId;
    if (!userIDfromjson) {
        log("used - req.bodyJson?.userId, userId is not defined in the payload.");
        return res.send('userId is missing');
    } else {
        log("used - req.bodyJson?.userId worked");
    }

    try {
        // Fetch user details using the userId
        const userDetails = await users.get(userId);
        const userName = userDetails.name;
        const userEmail = userDetails.email;

        const allUsers = await database.listDocuments(DATABASE_ID, COLLECTION_ID_ALLUSERS);
        const userExists = allUsers.documents.some(user => user.userID === userId);

        if (!userExists) {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID_ALLUSERS,
                'unique()',
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

        return res.send('Function executed successfully');
    } catch (error) {
        console.error(error);
        return res.send('Error occurred: ' + error.message);
    }
};



// export default async ({ req, res, log, error }) => {
//     const client = new Client();


//     // Initialize the client with your Appwrite project settings
//     client
//         .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
//         .setProject(PROJECT_ID) // Your project ID

//     const database = new Databases(client);
//     const users = new Users(client);

//     const userId = req.payload.userId; // Get the user ID from the payload

//     try {
//         // Fetch user details using the userId
//         const userDetails = await users.get(userId);

//         const userName = userDetails.name; // Assuming the user's name is stored in the `name` attribute
//         const userEmail = userDetails.email; // Assuming the user's email is stored in the `email` attribute

//         // Check if user exists in AllUsers collection
//         const allUsers = await database.listDocuments(DATABASE_ID, COLLECTION_ID_ALLUSERS);

//         const userExists = allUsers.documents.some(user => user.userID === userId);

//         // If user does not exist, add them to AllUsers collection
//         if (!userExists) {
//             await database.createDocument(
//                 DATABASE_ID, COLLECTION_ID_ALLUSERS,
//                 'unique()', // Use userId as the document ID
//                 {
//                     userID: userId,
//                     name: userName,
//                     email: userEmail
//                 }
//             );
//             log(`User added: ${userId} ${userEmail}`);
//         } else {
//             log(`User already exists: ${userId} ${userEmail}`);
//         }

//         return res.send('Function executed successfully');
//     } catch (error) {
//         console.error(error);
//         return res.send('Error occurred: ' + error.message);
//     }
// };
