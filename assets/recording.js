const TWILIO_DOMAIN = location.host;
axios.get(`https://${TWILIO_DOMAIN}/recording-and-composition`).then(async (body) => {
    const arr = body.data.composition;
    console.log(arr);
    // console.log(arr.status);
    // console.log(arr.links.media);
    // console.log(arr.sid);
});