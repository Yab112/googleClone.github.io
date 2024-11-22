import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
  Grid2,
} from '@mui/material';
import Noflights from "../assets/no-flight.png";




const FlightCard = ({ flight }: { flight: any }) => (
  <Card sx={{ maxWidth: 280, borderRadius: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image={"https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg"}
      alt={flight.destination}
    />
    <CardContent>
      <Typography variant="h6" component="div" gutterBottom>
        {flight.destination}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {flight.price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {flight.dates}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {flight.stops} · {flight.duration}
      </Typography>
    </CardContent>
  </Card>
);


const FlightsGrid = ({ flightsData }: { flightsData: any }) => {
  if (!flightsData || flightsData.length === 0) {
    return (
      <div>
        <img className="m-auto" src={Noflights} alt="no-flights" />
        <h1 className="font-semibold text-2xl lg:text-4xl text-center">
          No flights available
        </h1>
      </div>
    );
  }
  return <Container>
    <Box my={4}>
      <Grid2 container spacing={4} justifyContent="center">
        {flightsData.map((flight: any, index: any) => (
          <Grid2 key={index}  >
            <FlightCard flight={flight} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  </Container>
}

export default FlightsGrid;
