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
    
    run: function(spawn, roles) {
        
        var building = false;
        
        for (var index in roles) {
            
            var role = roles[index];
            
            var roleCount = _.filter(Game.creeps, function(creep) {
                return creep.memory.role == role.name;
            }).length;
            
            var canConstruct = Game.spawns[spawn].store.getUsedCapacity(RESOURCE_ENERGY) >= 200;
            
            if (roleCount < role.number && canConstruct) {
            
                building = true;
                var creepName = role.name + "_" + Game.time;
                console.log(role.symbol + " Creating a " + role.name + ": " + creepName);
                
                Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], creepName, {
                    memory: {role: role.name}
                });
            }
            
            if (building) break;
        }
	},
	
	compare: function sortByPriority( a, b ) {
	    
        if ( a.priority < b.priority ){
            return -1;
        }
        
        if ( a.priority > b.priority ){
            return 1;
        }
        
        return 0;
    }
};

module.exports = autoCreeps;


    