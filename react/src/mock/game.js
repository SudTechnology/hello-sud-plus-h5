import data from 'data/home.json'
console.log(data)
const game = [
  // game list
  {
    url: '/v1/gamelist',
    type: 'get',
    response: config => {
      return { code: 0, data: data.data.sceneVOList }
    }
  }
]
export default game
