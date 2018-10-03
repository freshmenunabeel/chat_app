var redis = require("redis"),
client = redis.createClient();

var redisService=function()
{
    this.saveToRedis=function(key,value,callback)
    {
        client.set(key,value,function(err){
            callback(err);
        });
    }
    this.fetchFromRedis=function(key,callback)
    {
        client.get(key, function(err, reply) {
            callback(reply);
        });
    }

}
module.exports=new redisService();