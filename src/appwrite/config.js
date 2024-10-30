import { Client, Account, Databases, Storage, OAuthProvider } from 'appwrite'

const client = new Client()
client.setProject(import.meta.env.VITE_PROJECT_ID)
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
export { client, account, databases, storage, OAuthProvider }