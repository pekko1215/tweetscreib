var twitter = require('twitter');
var $$ = require('./CrankyCollection')
const request = require('request');
var crypto = require('crypto')

const baseHash = "Qo8vYDT6XVWbEcxKO+8YeQ=="
var twit = new twitter(require('./tokens.json'));
var hit = "https://t.co/bbYYnhdf4q"

var ignoreURLs = [
    "http://pbs.twimg.com/tweet_video_thumb/DVSk2T3VoAAdLY9.jpg",
    "https://t.co/W9gFJT9oPE",
    "https://t.co/jXMQdeKuaw"
]
twit.stream('statuses/filter', { 'follow': "89142182" }, function(stream) {
    stream.on('data', function(data) {
        // console.log(data);
        if (data.in_reply_to_user_id == null) { return }
        if (!data.extended_tweet){return}
        var user = data.in_reply_to_screen_name

        var text = data.text
        // console.log(data.extended_tweet.entities.media)
        if(!data.extended_tweet.entities.media[0]){return}
        // console.log(ignoreURLs)
        var flag = !ignoreURLs.find(d=>{
                // console.log(data.extended_tweet.entities.media[0])
                return d==data.extended_tweet.entities.media[0].media_url
            });
        var created_at = data.created_at;
        var spacer = Array(16 - user.length).fill(' ').join('');
        console.log(`${flag?'\u001b[31m':'\u001b[32m'}${user}${spacer}| ${created_at}\t| ${flag?`あたり`:"はずれ"} ${data.extended_tweet.entities.media[0].media_url}`)
        return
    });
});

function Larger(a, b) {
    if (a.length > b.length) { return true; }
    if (a.length < b.length) { return false; }
    var arra = a.split('');
    var arrb = b.split('');
    for (var i = 0; i < arra.length; i++) {
        if (arra[i] < arrb[i]) { return false };
        if (arra[i] > arrb[i]) { return true };
    }
    return false;
}
setInterval(() => {}, 10000)

/*
20
20:05
21:00
21:07

01秒~02秒に2回

 */