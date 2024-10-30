export default async ({ req, res, log, error }) => {

    log("Request body - ", req.body)
    log("Request method - ", req.method)
    error("Bhai error")

    return res.text("Check the Appwrite Console to see logs and errors!");
}
