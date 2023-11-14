import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Pagination from '@mui/material/Pagination';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import CandidateCard from '../../components/candidateCard/candidateCard';
import { Navbar } from '../../components/navbar';


const defaultTheme = createTheme();

export default function Home() {
      const [candidates, setCandidates] = React.useState([])
      const [res, setRes] = React.useState({})
      const [page, setPage] = React.useState(1)

      const handleChange = (event, value) => { 
        setPage(value); 
        getCandidates({ page: value , limit: 30 });
        window.scrollTo({ top: 0, behavior: 'smooth' })
      };

      const getCandidates = async(params) =>{
          try {
              const token = Cookies.get('token')
              const response = await axios.get(`http://localhost:8080/api/candidates`,{
                  params:params,
                  headers:{Authorization: `Bearer ${token}`}
              });
              setCandidates(response.data['candidates']);
              setRes(response.data)

          } catch (error) {
              console.error(error);
        }}

      React.useEffect(() => {
          getCandidates({ page: 1, limit: 30 });
        },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Candidates
            </Typography>


          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {candidates.map(candidate => (
            <Grid item key={candidate.id} xs={12} sm={6} md={4} >
                <CandidateCard candidate={candidate} />
            </Grid>
          ))}
          </Grid>
          <Pagination  count={res['totalPages']} color="primary" onChange={handleChange} page={page} sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}/>

        </Container>
      </main>
      {/* Footer */}
      
      {/* End footer */}
    </ThemeProvider>
  );
}