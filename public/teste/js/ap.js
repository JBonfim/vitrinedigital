App = {}
//Model
App.Tweet = Backbone.Model.extend();

//Colection

App.Tweets = Backbone.Collection.extend({
	model:App.Tweet,
	url: "/promocaos"
	
});

//URL: https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=2



//VIEW
App.TweetViews = Backbone.View.extend({

	initialize:function(){
		this.listenTo(this.collection,'add',this.renderOne);//Escuta de evento
		this.listenTo(this.collection,'reset',this.renderAll);//Escuta de evento

	},

	//render: function(){};
	//initialize:
	tagName:'ul',
	className:'tweets' ,
	teste:function(){
		console.log('foobar');
	},
	render:function(){
		this.collection.trigger('reset');
		return this;


	},
	renderAll:function(){
		this.$el.empty();//Funcao do jquery pra limpar a view
		this.collection.forEach(this.renderOne);
	},
	renderOne:function(tweet){
			tweetview = new App.TweetView();
			tweetview.model=tweet;
			//Aqui
			tweetview.render().$el.appendTo(tweetviews.el);

		}

});
App.TweetView = Backbone.View.extend({
	template: _.template('<p><%= id %><p>'),
	//render: function(){};
	//initialize:
	tagName:'li',
	
	className:'tweet' ,
	render:function(){
		var innerHTML = this.template({id:this.model.get('id')})
		this.$el.html(innerHTML);
		return this;
	}

});







$(function(){
	//console.log('Carregou');
	//tweets = new Tweets([{text:'texto1'},{text:'texto2'},{text:'texto3'}]);
	var tweets = new App.Tweets();
	
	tweetviews = new App.TweetViews({collection:tweets});
	tweetviews.render().$el.appendTo('#app');//Id da divi
	
	tweets.fetch();
	console.log('View redererizada');

})