// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import useRequest from '../../hooks/useRequest'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useRouter } from 'next/router'
import { FileUploader } from 'react-drag-drop-files'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const fileTypes = ['JPG', 'PNG']
  const router = useRouter()
  const { request, response } = useRequest()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [discount, setDiscount] = useState('')
  const [popularDishes, setPopularDishes] = useState('')
  const [deliveryTiming, setDeliveryTiming] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  console.log(file)

  // ** States
  const handleChange = file => {
    setFile(file)
  }

  const handleSubmit = e => {
    e.preventDefault()
    var formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('delivery_timing', deliveryTiming)

    formData.append('popular_dishes', popularDishes)

    formData.append('discounts', discount)
    formData.append('image', file)

    request('POST', 'restaurant/add', formData)
  }
  useEffect(() => {
    if (response) {
      if (response.status == true) {
        console.log(response.message)
        router.push('/tables')
      } else if (response.status == false) {
        console.log(response.message)
      }
    }
  }, [response])

  return (
    <Card>
      <CardHeader title='Add Restaurant Info' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => handleSubmit(e)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Restaurant Name'
                placeholder='Leonard'
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Address' placeholder='Carter' onChange={e => setAddress(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='State' placeholder='Carter' onChange={e => setState(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='City' placeholder='Carter' onChange={e => setCity(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Discounts' placeholder='Carter' onChange={e => setDiscount(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Popular Dishes'
                placeholder='Carter'
                onChange={e => setPopularDishes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Delivery Timing'
                placeholder='Carter'
                onChange={e => setDeliveryTiming(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Decription'
                placeholder='Carter'
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid spacing={5}>
            <FileUploader handleChange={handleChange} name='file' types={fileTypes} />
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='containeds'>
            Submit
          </Button>
          <Button size='large' color='secondary' type='reset' variant='outlined'>
            Discard
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
