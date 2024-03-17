// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import { Button, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'

const MUITable = () => {
  const router = useRouter();

  const addHandler = () => {
    router.push('/form-layouts')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 }
            }}
            style={{ marginLeft: '15px', marginRight: '20px' }}
          >
            <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
              Restaurants
            </Typography>

            <Tooltip title='Add Restaurant' placement='top'>
              <Button
                component='label'
                variant='contained'
                htmlFor='account-settings-upload-image'
                onClick={addHandler}
              >
                Add
              </Button>
            </Tooltip>
          </Toolbar>
          <TableBasic />
        </Card>
      </Grid>

      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableDense />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableSpanning />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default MUITable
