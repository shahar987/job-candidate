import React,{useState, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import CandidateCard from '../../components/candidateCard';
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';
import useAuth from '../../hooks/auth';

const LIMIT = 15

const defaultTheme = createTheme();

const Home = () => {
      const [candidates, setCandidates] = useState([])
      const [res, setRes] = useState({})
      const [page, setPage] = useState(1)
      const {logout } = useAuth();

      const handleChange = (event, value) => { 
        setPage(value); 
        getCandidates({ page: value , limit: LIMIT });
        window.scrollTo({ top: 0, behavior: 'smooth' })
      };

      const getCandidates = async(params) =>{
          try {
              const response = await axios.get(`http://localhost:8080/api/candidates`,{
                  params:params,
                  withCredentials: true
              });
              setCandidates(response.data['candidates']);
              setRes(response.data)

          } catch (error) {
              console.error(error);
              if(error.response.status === 401) logout()
        }}

      useEffect(() => {
          getCandidates({ page: 1, limit: LIMIT });
        },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar/>
      <main>
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
          <Grid container spacing={4} >
          {candidates.length ? 
            candidates.map(candidate => (
              <Grid item key={candidate.id} xs={12} sm={6} md={4} >
                  <CandidateCard candidate={candidate} />
              </Grid>
            ))
            :
            <Loading/>
          }
          </Grid>
          {candidates.length ?
          <Pagination  count={res['totalPages']} color="primary" onChange={handleChange} page={page} sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}/>
          : null
          }
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Home;