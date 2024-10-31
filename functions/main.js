// export default async ({ req, res, log, error }) => {

//     log("Request body - ", req.body)
//     log("Request method - ", req.method)
//     // error("Bhai error")
//     const event = req.headers['x-appwrite-event'];
//     log("Request headers: ", event)

//     return res.text("Check the Appwrite Console to see logs and errors!");
// }

import { Client, Databases, Users } from "node-appwrite";
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const PROJECT_ID = process.env.VITE_PROJECT_ID
const DATABASE_ID = process.env.VITE_DATABASE_ID
const COLLECTION_ID_ALLUSERS = process.env.VITE_COLLECTION_ID_ALLUSERS
const API_KEY = process.env.VITE_API_KEY
const MAILGUN_API_KEY = process.env.VITE_MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.VITE_MAILGUN_DOMAIN;


export default async ({ req, res, log }) => {
    log(JSON.stringify(req)); // Log the entire request object
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
            // const message = {
            //     from: `Welcome Team <welcome@${MAILGUN_DOMAIN}>`,
            //     to: userEmail,
            //     subject: "Welcome to Our App!",
            //     text: `Hello ${userName},\n\nThank you for joining us! We're excited to have you onboard.\nThis is a demo project. \n\nBest Regards,\nShlok Srivastava`
            // };


            mg.messages.create(MAILGUN_DOMAIN, {
                from: `Welcome Team <welcome@${MAILGUN_DOMAIN}>`,
                to: userEmail,
                subject: "Welcome to Our MoodJournal App!",
                text: `Hello ${userName},\n\nThank you for joining us! We're excited to have you onboard.\nThis is a demo project. \n\nBest Regards,\nShlok Srivastava`,
                html: `<h1>Hello ${userName}</h1>,\n\n<i>Thank you for joining us!</i> We're excited to have you onboard.\nThis is a demo project. \n\nBest Regards,\nShlok Srivastava`
            })
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

