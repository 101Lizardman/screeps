var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoCreeps = require('auto.creeps');
var autoBase = require('auto.base');

var state = {
    roles: {
        harvester: {
            name: "harvester",
            symbol: "⛏️",
            number: 4,
            priority: 5
        }, 
        upgrader: {
            name: "upgrader",
            symbol: "⬆️",
            number: 2,
            priority: 3
        },
        builder: {
            name: "builder",
            symbol: "👷",
            number: 2,
            priority: 2
        }
    },
    structures: {
        tower: {
            name: "tower",
            symbol: "🗼",
            type: STRUCTURE_TOWER,
            number: 4
        },
        extension: {
            name: "extension",
            symbol: "🏡",
            type: STRUCTURE_EXTENSION,
            number: 4
        }
    }
};

module.exports.loop = function () {
    
    /**
     * Todo: 
     * - Priority creep construction
     * - Structure construction to only start when energy reserves are full
     * - Auto road construction
     * - Strip away complex role structure for creeps and make them all gather and deliver
    **/

    // Memory cleanup
    for (var creep in Memory.creeps) {
        if (!Game.creeps[creep]) delete Memory.creeps[creep];
    }
    
    autoCreeps.run('Spawn1', state.roles);
    autoBase.run('Spawn1', state.structures);

    // Perform actions for creep roles
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.say(state.roles[creep.memory.role].symbol);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}