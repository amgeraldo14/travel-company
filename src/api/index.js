import axios from 'axios'

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async(type, sw, ne) => {
  try {
    console.log(sw, 'ini sw')
    console.log(ne, 'ini ne')
    const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        // 'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        // 'x-rapidapi-key': 'efd9d9678emsh9a3b2936118d149p1d4e40jsn8199b1d4820c'
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'f3ef49512amsh0ff15e69f14ea73p17bb20jsncaf4d1265ed6'
      }
    })
    return data
  } catch (error) {
    console.log('error disini')
    console.log(error)
  }
}