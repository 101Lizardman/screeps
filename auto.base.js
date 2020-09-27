var autoCreeps = {
    
    /** @params 
        spawn - Where they will be spawning
        roles - dict with role name as key, value is object:
        {
            name: role name
            symbol: emoji to represent role
            number: number to be created
        }
    **/
    
    run: function(spawn, structures) {
        for (var index in structures) {
            
            var structure = structures[index];
            
            var structCount = Game.spawns[spawn].room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: structure.type }
            }).length;
            
            //console.log("Structure: " + structure.type + " Count: " + structCount + " Number: " + structure.number);
            
            if (structCount < structure.number) {
                switch(structure.type) {
                    case STRUCTURE_TOWER:
                        break;
                    case STRUCTURE_EXTENSION:
                        constructNextAvailableExtension(spawn, structure);
                        break;
                    default:
                        break;
                }
            }
        }
        
        function constructNextAvailableExtension(spawn, structure) {
    	    var x = 1;
    	    var y = 1;
    	    var successfulConstruction;
    	    
    	    var spawnLocation = Game.spawns[spawn].pos;
    	    
    	    var limit = structure.number;
    	    var name = structure.name;
    	   
    	    
    	    //while (successfulConstruction != OK || x > 100) {
    	    var i;
    	    for (i = 0; i < limit; i++) {
    	    
        	    // Attempt to spawn a construction site
        	    //successfulConstruction = Game.spawns[spawn].room.createConstructionSite(spawnLocation.x + x,spawnLocation.y + y, STRUCTURE_EXTENSION);
        	    
        	    //console.log("Checked [" + x + "," + y + "]: " + successfulConstruction );
        	    
        	    if (successfulConstruction == OK) {
        	        console.log(symbol + " Creating a " + name + " at " + x + ", " + y);
        	        break;
        	    } else {
            	    
                    // Find the next potential construction location
                    if (isPositive(x)) {
                        if (isPositive(y)) {
                            y = toNegative(y);
        	            }
        	            else {
        	                x = toNegative(x);
        	            }
        	        }
        	        else {
        	            if (isPositive(y)) {
        	                y = toPositive(y);
        	                x++;
        	                y++;
        	            } else {
        	                y = toPositive(y);
        	            }
        	        }
        	    }
            }
        }
	    
	    function isPositive(number) {
	        return number == Math.abs(number);
	    }
	
	    function toNegative(number) {
	        return -Math.abs(number);
	    }
	    
	    function toPositive(number) {
	        return Math.abs(number);
	    }
	    
	}
	
};

module.exports = autoCreeps;


    