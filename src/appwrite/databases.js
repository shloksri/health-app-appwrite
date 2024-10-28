import { databases } from "./config";
import { ID } from "appwrite";

const db = {};
// const db_user = {}

const userCollection = [
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_ALLUSERS,
        name: "allUsers",
    }
]

const collections = [

    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_JOURNALS,
        name: "journals",
    },
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_MOODS,
        name: "moods",
    }
];

collections.forEach((col) => {
    db[col.name] = {
        create: (userID, mood, content, id = ID.unique()) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                userID,
                mood,
                content
            ),
        update: (id, userID, mood, content) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                userID,
                mood,
                content
            ),
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),

        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;
