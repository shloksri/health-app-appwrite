// export default async ({ req, res, log, error }) => {

//     log("Request body - ", req.body)
//     log("Request method - ", req.method)
//     // error("Bhai error")
//     const event = req.headers['x-appwrite-event'];
//     log("Request headers: ", event)

//     return res.text("Check the Appwrite Console to see logs and errors!");
// }

import { Client, Databases, Users } from "node-appwrite";
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const PROJECT_ID = process.env.VITE_PROJECT_ID
const DATABASE_ID = process.env.VITE_DATABASE_ID
const COLLECTION_ID_ALLUSERS = process.env.VITE_COLLECTION_ID_ALLUSERS
const API_KEY = process.env.VITE_API_KEY
const MAILGUN_API_KEY = process.env.VITE_MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.VITE_MAILGUN_DOMAIN;


export default async ({ req, res, log }) => {
    // log(JSON.stringify(req)); // Log the entire request object
    // log("req body = ", req.body.userId ? req.body.userId : "Not found")
    // log("req bodyJson = ", req.bodyJson.userId ? req.bodyJson.userId : "Not found")
    // log("req payload = ", req.payload.userId ? req.payload.userId : "Not found")
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(PROJECT_ID)
        .setKey(API_KEY);

    const database = new Databases(client);
    const users = new Users(client);

    const mailgun = new Mailgun(FormData);

    const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

    // const mailgunClient = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });


    // Access userId from the payload
    const userId = req.body?.userId; // Using optional chaining for safety

    if (!userId) {
        log("used - req.body?.userId, userId is not defined in the payload.");
        return res.send('userId is missing');
    }
    else {
        log("used - req.body?.userId worked");
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
            // Send welcome email

            const message = {
                from: `Welcome Team <welcome@${MAILGUN_DOMAIN}>`,
                to: userEmail,
                subject: "Welcome to Our MoodJournal App!",
                text: `Hello ${userName},\n\nThank you for joining us! We're excited to have you onboard.\nThis is a demo project. \n\nBest Regards,\nShlok Srivastava`,
                html: `<div> <h1>Welcome aboard ${userName}!</h1> <p style="font-size: 20px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"> We're excited to have you on our Mood Journal App. You can start exploring our features. Below is a quick link to access your account: </p> <br> <a href="https://health-app-appwrite.vercel.app/"> <button style="cursor:pointer; font-size: 20px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Access your account </button> </a> <br><br> <h3 style="font-size: 20px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"> Button not working?</h3> <p style="font-size: 20px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"> Copy and paste this link into your browser: https://health-app-appwrite.vercel.app/</p> <p style="font-size: 18px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"> Thank you, <br>Shlok Srivastava </p> <p style="font-size: 12px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"> <i> Disclaimer: This is a Demo project for Hacktoberfest Submission for Appwrite Hackathon. We do not use your personal data in any case. Feel free to use our app for learning purposes </i> </p></div>`
            };


            await mg.messages.create(MAILGUN_DOMAIN, message)
                .then(msg => console.log(msg)) // logs response data
                .catch(err => console.error(err)); // logs any error

            // await mailgunClient.messages().send(message);
            log(`Welcome email sent to: ${userEmail}`);
        } else {
            log(`User already exists: ${userId} ${userEmail}`);
            log(`Email not sent: ${userEmail}`)
        }

        return res.send('Function executed successfully');
    } catch (error) {
        console.error(error);
        return res.send('Error occurred: ' + error.message);
    }
};

