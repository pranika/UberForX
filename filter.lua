
function locate()
	local locations = redis.call("GEORADIUS")
	local  newlocation; 
	if(locations == newlocation)
	{
		redis.call("")
	}
	if(getn(locations) <= 25)
	{

		redis.call("GEORADIUS")
		

	}
	else
		locations = newlocation
	end	
end
