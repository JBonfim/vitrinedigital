
//Model
var Tweet = Backbone.Model.extend({
	post:{
		text:null,
		title:null

	}
	
});

//Colection

var Tweets = Backbone.Collection.extend({
	model:Tweet
});

//URL: https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=2



//VIEW
var TweetViews = Backbone.View.extend({

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
			tweetview = new TweetView();
			tweetview.model=tweet;
			//Aqui
			tweetview.render().$el.appendTo(tweetviews.el);

		}

});
var TweetView = Backbone.View.extend({
	template: _.template('<p><%= text %><p>'),
	//render: function(){};
	//initialize:
	tagName:'li',
	
	className:'tweet' ,
	render:function(){
		var innerHTML = this.template({text:this.model.get('text')})
		this.$el.html(innerHTML);
		return this;
	}

});





var tweetview;

$(function(){
	//console.log('Carregou');
	tweets = new Tweets([{text:'texto1'},{text:'texto2'},{text:'texto3'}]);
	tweetviews = new TweetViews({collection:tweets});
	tweetviews.render().$el.appendTo('#app');//Id da divi
	
	console.log('View redererizada');

})