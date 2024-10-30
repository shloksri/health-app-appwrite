export default async ({ req, res, log, error }) => {

    log("Request body - ", req.body)
    log("Request method - ", req.method)
    // error("Bhai error")
    const event = req.headers['x-appwrite-event'];
    log("Request headers: ", event)

    return res.text("Check the Appwrite Console to see logs and errors!");
}
