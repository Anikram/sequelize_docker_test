const models = require('../../db/models');
const Player = models.Player;
const Game = models.Game;
const Region = models.Region;
let testUserId
let testRegionId
//
Player.findOne({where: {username: 'alexo'}}).then(user => {
  user.createGame({region_name: 'europe', player_id: testUserId }).then( res => {
    console.log(res)
  })

  // Game.create({region_id: 1, player_id: testUserId }).then(game => {console.log(game)})

  // Player.findByPk(testUserId, {include: 'games'}).then(async obj => {console.log(await obj.getGames())})
})

//
//   Region.findOne({where: {name: 'europe'}}).then(async region => {
//     testRegionId = region.id
//
//     console.log(`userId:${testUserId}, regionId: ${testRegionId}`)
//     console.log("=======================")
//
//     // Game.findAll({ include: [Region, Player] }).then(async result => console.log(await result[0].getPlayer()))
//
//
//   })
// })

// Player.create({
//   username: "alexo2",
//   email: "aaa2@aaa.aaa",
//   hash: '123',
//   salt: '123',
//   createdAt: new Date(),
//   updatedAt: new Date()
// }).then( user => {console.log(user)})

// Game.findOne({where: {id: 2}}, {include: [Player]}).then(async game => {
//   console.log(await game.getPlayer())
// })

