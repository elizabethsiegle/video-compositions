exports.handler = function(context, event, callback) {
    const TWILIO_ACCOUNT_SID = context.TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN= context.TWILIO_AUTH_TOKEN;
    //const TWILIO_DOMAIN = location.host;
    const TWILIO_API_KEY = context.TWILIO_API_KEY;
    const TWILIO_API_SECRET = context.TWILIO_API_SECRET;
    const client = require('twilio')(TWILIO_API_KEY, TWILIO_API_SECRET, {
        accountSid: TWILIO_ACCOUNT_SID,
      });
    const roomSid = "RMdd8f0e6a4ee733e068a7ded1dbcd3c62";
    //will start with a blank slate and code each of these parts live (may look at docs occasionally and have the code to the side)

    //part 1: get recordings (can show in Twilio console where to enable recording)
    // client.video
    // .rooms(roomSid)
    // .recordings.list({ limit: 5 })
    // .then(recordings => {
    //   callback(null, {composition: recordings}); //object is received in index.js and parsed 

    //part 2: make a composition
    // let audioSid, videoSid;
    // client.video
    // .rooms(roomSid)
    // .recordings.list({ limit: 5 })
    // .then(recordings => {
    //     videoSid = recordings.find(el => el.type === 'video').sid; //first element of type video
    //     audioSid = recordings.find(el => el.type === 'audio').sid; //first element of type audio
    //     client.video.compositions.create({
    //         roomSid: roomSid,
    //         audioSources: [audioSid],
    //         videoLayout: { grid: { video_sources: [videoSid] } },
    //         //resolution: resolution,
    //         format: 'mp4'
    //     })
    //     .then(composition => {
    //         callback(null, {composition: composition});
    //     });
    // });

    //part 3: get non-enqueued composition to make a request. takes time for compositions to be processed so we can access the video media
   const request = require('request');
   const uri = "https://video.twilio.com/v1/Compositions/CJffa0d341ff9b40f6139a1fe6c40e891e/Media?Ttl=3600";
   //The URL returned will be available by default for 600 seconds, but this can be configured to a value between 1 and 3600 seconds via the Ttl request param.
   client
   .request({
        method: "GET",
        uri: uri,
    })
    .then(response => {
        const mediaLocation = JSON.parse(response.body).redirect_to;
        console.log('You can fetch the media file in this URL:');
        callback(null, {composition: mediaLocation});
    })
    .catch((error) => {
        console.log("Error fetching /Media resource " + error);
    }); 
    
    //part 4: display mp4 in html in recording.html?
};