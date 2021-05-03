const { db } = require('../models/index.js');
const { Class, Ability } = require('../models');

const classes = [
    {
        id: 1,
        name: 'Warrior'
    },
]

const abilities = [
    {
        id: 1,
        name: "Sword",
        type: "Melee",
        effect: "Test",
        forClass: 1
    }];

const seedDatabase = async () => {
    await db.sequelize.sync({ force: true });
    const classes = await Class.bulkCreate(classes, {
        individualHooks: true,
        returning: true,
    });
    const abilities = await Ability.bulkCreate(abilities, {
        individualHooks: true,
        returning: true,
    });
    process.exit(0);
};

seedDatabase();
