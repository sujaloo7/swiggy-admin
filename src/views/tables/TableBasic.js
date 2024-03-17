import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import useRequest from '../../hooks/useRequest'
import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import moment from 'moment'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'

const TableBasic = () => {
  const IMAGEURL = 'http://localhost:5000'

  const { request, response } = useRequest()
  const { request: deleteReq, response: deleteRes } = useRequest()
  const [open, setOpen] = useState(false)
  const [restaurants, setRestaurants] = useState()
  const [message, setMessage] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    request('GET', 'restaurant/all')
  }, [])

  useEffect(() => {
    if (response) {
      setRestaurants(response.data?.restaurants)
    }
  }, [response])

  const deleteHandler = id => {
    deleteReq('DELETE', `restaurant/delete/${id}`)
  }
  useEffect(() => {
    if (deleteRes) {
      if (deleteRes.status == true) {
        setMessage(deleteRes.message)
        setOpen(true)
        request('GET', 'restaurant/all')
      } else if (deleteRes.status == false) {
        setMessage(deleteRes.message)
      }
    }
  }, [deleteRes])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='left'>Address</TableCell>
              <TableCell align='left'>Offers</TableCell>
              <TableCell align='left'>Delivery Timing</TableCell>
              <TableCell align='left'>Created At</TableCell>
              <TableCell align='left'>Status</TableCell>
              <TableCell align='left'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants?.length > 0 &&
              restaurants.map(row => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row' sx={{ fontWeight: 'bold' }}>
                    <img src={row.image} />
                  </TableCell>
                  <TableCell component='th' scope='row' sx={{ fontWeight: 'bold' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align='left'>{row.city}</TableCell>
                  <TableCell align='left'>{row.discounts}</TableCell>
                  <TableCell align='left'>{row.delivery_timing}</TableCell>
                  <TableCell align='left'>{moment(row.createdAt).format('DD-MM-YYYY hh:mm')}</TableCell>
                  <TableCell align='left'>
                    <Chip
                      label={'Open'}
                      color='success'
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                  <TableCell align='left'>
                    {' '}
                    <Grid item spacing={5}>
                      <Tooltip arrow title={'View Details'} placement='top'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          height={'25'}
                          fill='#c7a7ff'
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                        >
                          <path d='M12 4.5C7 4.5 2.7 7.6 1 12C2.7 16.4 7 19.5 12 19.5H13.1C13 19.2 13 18.9 13 18.5C13 18.1 13 17.8 13.1 17.4C12.7 17.4 12.4 17.5 12 17.5C8.2 17.5 4.8 15.4 3.2 12C4.8 8.6 8.2 6.5 12 6.5S19.2 8.6 20.8 12C20.7 12.2 20.5 12.4 20.4 12.7C21.1 12.9 21.7 13.1 22.3 13.5C22.6 13 22.8 12.5 23 12C21.3 7.6 17 4.5 12 4.5M12 9C10.3 9 9 10.3 9 12S10.3 15 12 15 15 13.7 15 12 13.7 9 12 9M19 21V19H15V17H19V15L22 18L19 21' />
                        </svg>
                      </Tooltip>
                      <Tooltip arrow title={'Mark as closed'} placement='top'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          height={'25'}
                          fill='#c7a7ff'
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                        >
                          <path d='M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z' />
                        </svg>
                      </Tooltip>
                      <Tooltip arrow title={'Edit'} placement='top'>
                        <Link href={`/tables/restaurant/${row._id}`}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            height={'25'}
                            fill='#c7a7ff'
                            style={{ marginRight: '6px', cursor: 'pointer' }}
                          >
                            <path d='M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z' />
                          </svg>
                        </Link>
                      </Tooltip>

                      <Tooltip arrow title={'Delete'} placement='top'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          height={'25'}
                          fill='#ff6f6f'
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                          onClick={e => deleteHandler(row._id)}
                        >
                          <path d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' />
                        </svg>
                      </Tooltip>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <>
            <IconButton aria-label='close' color='inherit' sx={{ p: 0.5, fontSize: '0.75rem' }} onClick={handleClose}>
              Close
            </IconButton>
          </>
        }
      />
    </>
  )
}

export default TableBasic
