const models = require('../../db/models');
const Player = models.Player;
const Game = models.Game;
const Region = models.Region;
let testUserId
let testRegionId


Player.findOne({where: {username: 'alexo'}}).then(user => {
  testUserId = user.id

  Region.findOne({where: {name: 'europe'}}).then(async region => {
    testRegionId = region.id

    console.log(`userId:${testUserId}, regionId: ${testRegionId}`)
    console.log("=======================")

    Game.findAll({ include: [Region, Player] }).then(async result => console.log(await result[0].getRegion()))

  })
})
