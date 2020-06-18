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

    //part 1: get recordings (can show in Twilio console where to enable recording)
    // client.video
    // .rooms(roomSid)
    // .recordings.list({ limit: 5 })
    // .then(recordings => {
    //   callback(null, {composition: recordings});

    //part 2: make a composition
    let audioSid, videoSid;
    client.video
    .rooms(roomSid)
    .recordings.list({ limit: 5 })
    .then(recordings => {
        videoSid = recordings.find(el => el.type === 'video').sid; //first element of type video
        audioSid = recordings.find(el => el.type === 'audio').sid; //first element of type audio
        client.video.compositions.create({
            roomSid: roomSid,
            audioSources: [audioSid],
            videoLayout: { grid: { video_sources: [videoSid] } },
            //resolution: resolution,
            format: 'mp4'
        })
        .then(composition => {
            callback(null, {composition: composition});
        });
    });

    //part 3: get non-enqueued one to make a request
    
            // const uri = "https://video.twilio.com/v1/Compositions/CJ39ea433e5c3da16445750eccf447a3ee/Media?Ttl=3600";
            // client
            // .request({
            //     method: "GET",
            //     uri: uri,
            // })
            // .catch((error) => {
            //     console.log("Error fetching /Media resource " + error);
            // });   
            
   // });
    // const uri = "https://video.twilio.com/v1/Compositions/CJ39ea433e5c3da16445750eccf447a3ee/Media?Ttl=3600";
    //   client.request({ method: "GET", uri: uri }).then(response => {
    //     const mediaLocation = response.data.redirect_to;
    //     request.get(mediaLocation, (err, res, media) => {
    //       callback(null, {composition: mediaLocation});
    //     });
    //   });
};