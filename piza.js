var twitter = require('twitter');
var $$ = require('./CrankyCollection')
const request = require('request');
var crypto = require('crypto')

const baseHash = "Qo8vYDT6XVWbEcxKO+8YeQ=="
var twit = new twitter(require('./tokens.json'));
var hit = "https://t.co/bbYYnhdf4q"

var ignoreURLs = ["pic.twitter.com/aBJGpdXbs6", "pic.twitter.com/64H5mpQCKk", "pic.twitter.com/k2xOHOp23T"]
ignoreURLs = []
twit.stream('statuses/filter', { 'follow': "115639376" }, function(stream) {
    stream.on('data', function(data) {
        // if (!data.entities.media) {
        //     console.log(data.text)
        //     return; 
        // }
        if (data.in_reply_to_user_id == null) { return }
        if (data.in_reply_to_user_id == null) { return }
        var user = data.in_reply_to_screen_name

        var text = data.text
        var flag = text.indexOf("の代わり") == -1;
        var created_at = data.created_at;
        var spacer = Array(16 - user.length).fill(' ').join('');
        console.log(`${flag?'\u001b[31m':'\u001b[32m'}${user}${spacer}| ${created_at}\t| ${flag?`あたり`:"はずれ"}`)
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