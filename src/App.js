import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'
import { useEffect, useState } from 'react'


const App = () => {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)
  const [childClicked, setChildClicked] = useState(null)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  useEffect(() => {
    setFilteredPlaces(places.filter((place) => place.rating > rating))
  }, [rating])

  useEffect(() => {
    setIsLoading(true)
    const fetchPlacesData = async () => {
      if(bounds) {
        const data = await getPlacesData(type, bounds.sw, bounds.ne)
        setPlaces(data)
        setFilteredPlaces([])
        console.log({data})
        setIsLoading(false)
      }
    }
    fetchPlacesData()
  }, [coordinates, bounds, type])
  
  return (
    <>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <p>{childClicked}</p>
          <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} isLoading={isLoading} type={type} rating={rating} setType={setType} setRating = {setRating}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} places={filteredPlaces.length ? filteredPlaces : places} setChildClicked={setChildClicked}/>
        </Grid>
      </Grid>
    </>
  )
}

export default App

