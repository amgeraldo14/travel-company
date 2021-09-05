import axios from 'axios'

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async(sw, ne) => {
  try {
    const {data: { data }} = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'efd9d9678emsh9a3b2936118d149p1d4e40jsn8199b1d4820c'
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}