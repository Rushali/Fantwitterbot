console.log('trial round one')

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// var params = { 
// 	q: 'kanangill', 
// 	count: 10 }

// T.get('search/tweets', params, gotData);

// function gotData(err, data, response) 
// 	{
// 	var tweets = data.statuses;
// 	for(i=0;i<tweets.length;i++)
// 		{
// 		console.log(tweets[i].length)
// 		}
  
// 	};

var queue = [];

setInterval(retweetit, 1000*30);

function retweetit(){
	console.log('i have '+ queue.length + 'tweets in queue');

	if(queue.length>0){

		var index = Math.floor(Math.random()*queue.length);
		var tweetID = queue[index];
		console.log('attempting to retweet:'+tweetID);
		queue = [];

		T.post('statuses/retweet', {id: tweetID}, retweeted);

		function retweeted(err,data, response){
			if(err){

				console.log("error:" + err.message);
			} else {

				console.log('retweeted:' + tweetID);
				}

			} 

	} else {

		console.log('no tweets to retweet');
	}
}

var stream = T.stream('user');

stream.on('follow',followed);

function followed(event)
	{

	  var name = event.source.name;
	  var screenName = event.source.screen_name;

	  console.log('Dont creep on me ' + name + ' creep on  ' + screenName);
	}

stream.on('tweet', tweetEvent);


function tweetEvent(tweet) {
	var reply_to = tweet.in_reply_to_screen_name;
  	var name = tweet.user.screen_name;
  	var txt = tweet.text;

  if (reply_to === 'IlahsurBot') {

    txt = txt.replace(/@IlahsurBot/g,'');

    var replyText = '.@'+name + ' Whatever floats your boat ';
  
    T.post('statuses/update', { status: replyText }, tweeted);

    function tweeted(err, reply) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    }
  }

}

setInterval(tweetIt, 1000*60*3);


function tweetIt()
{

		var reply = ['#tohphirproblemkyahai? #kanangill','I wanna... @kanangill','You wanna? #kanangill','#EXERCISE!',
		'where is #Biswa?','#IndianStandUpComedians','I machine learnt to love! #kanangill','Prem Agan','How insensitive? #kanangill'
		,'Lets Shaadi.com #kanangill','LETS NOT OBSESS!','@kanangill Hi, Im a twitterbot!','my unibrow is better! #kanangill',
		'#HaseenDard','#feelings right now? @kanangill','Most suroor ever?','most pregnancy ever? #thingsKanansays','#MuchWow',
		'I am first born #twitterbotbaby','Be nice!','#chaitime is the best.. no wait @kanangill','I was made by @4rushali for her school project'
		,'Being a twitterbot for @kanangill is tiring','SuchAmaze','#BiswaRockstoo','#weirdest3amhomework'];

		var n = Math.floor(Math.random()*25);

		var tw = { status:  reply[n] };

		T.post('statuses/update', tw, twed);
 

		function twed(err, data, response) 
		{
			if(err){
				console.log("no work"+ err.message);
			} else {
		  console.log(data)
		}

		}
}
