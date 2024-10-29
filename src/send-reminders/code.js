import { databases } from '../appwrite/config';
import fetch from 'node-fetch';

// Load environment variables from .env
const mailgunApiKey = import.meta.env.VITE_MAILGUN_API_KEY;
const mailgunDomain = import.meta.env.VITE_MAILGUN_DOMAIN;
const remindersCollectionId = import.meta.env.VITE_COLLECTION_ID_REMINDERS;

// Function to execute
export default async function (req, res) {
    // Get the current time in UTC formatted as "YYYY-MM-DDTHH:MM" (ISO format without seconds)
    const currentTime = new Date().toISOString().slice(0, 16);

    try {
        // Fetch reminders due at the current time
        const reminders = await databases.listDocuments(remindersCollectionId, [
            sdk.Query.equal("reminderTime", currentTime)
        ]);

        // Send email for each reminder due
        for (const reminder of reminders.documents) {
            const userEmail = reminder.email;
            const reminderMessage = reminder.message;

            // Send email via Mailgun
            await fetch(`https://api.mailgun.net/v3/${mailgunDomain}/messages`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${Buffer.from(`api:${mailgunApiKey}`).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    from: `noreply@${mailgunDomain}`,
                    to: userEmail,
                    subject: "Your Reminder",
                    text: reminderMessage,
                }),
            });
        }

        res.send({ message: "Reminder emails sent if any were due." });
    } catch (error) {
        console.error("Error sending reminder emails:", error);
        res.status(500).send({ error: "Failed to send reminder emails" });
    }
};
