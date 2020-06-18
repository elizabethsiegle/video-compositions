exports.handler = function(context, event, callback) {
    const TWILIO_ACCOUNT_SID = context.TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN= context.TWILIO_AUTH_TOKEN;
    //const TWILIO_DOMAIN = location.host;
    const TWILIO_API_KEY = context.TWILIO_API_KEY;
    const TWILIO_API_SECRET = context.TWILIO_API_SECRET;
    const client = require('twilio')(TWILIO_API_KEY, TWILIO_API_SECRET, {
        accountSid: TWILIO_ACCOUNT_SID,
      });
    const roomId = "RMdd8f0e6a4ee733e068a7ded1dbcd3c62";
    let audioSid, videoSid;
    client.video
    .rooms(roomId)
    .recordings.list({ limit: 5 })
    .then(recordings => {
      videoSid = recordings.find(el => el.type === 'video').sid; //first element of type video
      audioSid = recordings.find(el => el.type === 'audio').sid; //first element of type audio
      client.video.compositions.create({
          roomSid: roomId,
          audioSources: audioSid,
          format: 'mp4',
          videoLayout: { 
              transcode: { 
                  video_sources: [videoSid] 
                } 
            },
        })
        .then(composition => {
            const uri = "https://video.twilio.com/v1/Compositions/CJ39ea433e5c3da16445750eccf447a3ee/Media?Ttl=3600";
            client
            .request({
                method: "GET",
                uri: uri,
            })
            .catch((error) => {
                console.log("Error fetching /Media resource " + error);
            });   
            callback(null, {composition: composition}); 
        });
    });
};