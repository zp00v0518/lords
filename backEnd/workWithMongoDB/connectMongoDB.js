const mongoClient =  require("mongodb").MongoClient;

function Mongo () {
	this.open =  function (collectionName){
		this.collection = this.db.collection(collectionName);
		// console.log(`Успешное подключение к коллекции:${collectionName}`);
		return this.collection;
	},
	this.close = function (){
		this.client.close();
		console.log("Подключение к Монго закрыто");
		return;
	},
	this.connect = function (options = {}, callback = function(){}){
		return new Promise((resolve, reject) => {
			let dbName = options.dbName || "test";
			this.url = options.url || "mongodb://localhost:27017";
			mongoClient.connect(this.url,{ useNewUrlParser: true },(err, client)=>{
				if (err) throw err;
				console.log("Подключение к Монго прошло успешно");
				this.db = client.db(dbName);
				this.client = client;
				resolve();
				return callback();
			});
		})
	}
}

module.exports = Mongo;

