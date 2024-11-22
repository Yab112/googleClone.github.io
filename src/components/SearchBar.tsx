import { useState, useEffect, useCallback } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

import { Search } from "@mui/icons-material";
import axios from "axios";
import { Dayjs } from "dayjs";
import { Snackbar, Alert } from "@mui/material";
import debounce from 'lodash.debounce';
import TripTypeSelector from "./TripTypeSelector";
import PassengerSelector from "./PassengerSelector";
import TripOptions from "./TripOptions";
import Origin from "./origin";
import { data } from "../assets/data";
import FlightsGrid from "./FlightsResults";
export interface AirportOption {
  id: string;
  name: string;
  iataCode: string;
  skyId: string;
}

export default function SearchBar() {
  const [trip, setTrip] = useState<string>("");
  const [passenger, setPassenger] = useState<number>(1);
  const [type, setType] = useState<string>("");

  const [departure, setDeparture] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  const [origin, setOrigin] = useState<string | null>(null);
  const [originInputValue, setOriginInputValue] = useState<string>("");
  const [destinationInputValue, setDestinationInputValue] = useState<string>("");
  const [destination, setDestination] = useState<string | null>(null);
  const [flights, setFlights] = useState<any[]>([]);

  const [originId, setOriginId] = useState<string>("");
  const [destinationId, setDestinationId] = useState<string>("");
  const [originOptions, setOriginOptions] = useState<AirportOption[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<AirportOption[]>([]);

  const [originSkyId, setOriginSkyId] = useState<string>("");
  const [destinationSkyId, setDestinationSkyId] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const handleFlightType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  // Shared function to fetch airports based on input value
  // Memoize the fetchAirports function
  const fetchAirports = useCallback(async (query: string) => {
    try {
      const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          headers: {
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          },
        }
      );
      return response.data.data || []; // Return empty array if no data
    } catch (error) {
      console.error("Error fetching airport data:", error);
      setSnackbarMessage("Error fetching airport data.");
      setSnackbarOpen(true);
      return [];
    }
  }, []);


  const fetchOriginOptions = useCallback(
    debounce(async (query: string) => {
      const options = await fetchAirports(query);
      setOriginOptions(options);
    }, 300), // Debounce delay of 300ms
    [fetchAirports]
  );


  const fetchDestinationOptions = useCallback(
    debounce(async (query: string) => {
      const options = await fetchAirports(query);
      setDestinationOptions(options);
    }, 300),
    [fetchAirports]
  );

  useEffect(() => {
    if (originInputValue.length > 0) {
      fetchOriginOptions(originInputValue);
    }
    if (originInputValue.length === 0) {
      setOriginOptions([])
    }
  }, [originInputValue, fetchOriginOptions]);

  useEffect(() => {
    if (destinationInputValue.length > 0) {
      fetchDestinationOptions(destinationInputValue);
    }
  }, [destinationInputValue, fetchDestinationOptions]);

  const handleSearch = async () => {
    const params = {
      originSkyId: originSkyId,
      originEntityId: originId,
      destinationEntityId: destinationId,
      destinationSkyId: destinationSkyId,
      date: departure ? departure.format("YYYY-MM-DD") : "",
      returnDate: returnDate ? returnDate.format("YYYY-MM-DD") : "",
      cabinClass: type.toLowerCase(),
      adults: passenger,
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    };

    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?locale=en-US",
        {
          params,
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );
      // setFlights(response.data);
      setFlights(data)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setSnackbarMessage("Error fetching flights.");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center p-2 md:p-0">
        <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-row md:flex-row">
            <TripTypeSelector value={trip} onChange={setTrip} />
            <PassengerSelector passenger={passenger} setPassenger={setPassenger} />
            <TripOptions type={type} handleFlightType={handleFlightType} />
          </div>
          <Origin
            origin={origin}
            originInputValue={originInputValue}
            destination={destination}
            destinationInputValue={destinationInputValue}
            departure={departure}
            returnDate={returnDate}
            originOptions={originOptions}
            destinationOptions={destinationOptions}
            setOrigin={setOrigin}
            setOriginInputValue={setOriginInputValue}
            setDestination={setDestination}
            setDestinationInputValue={setDestinationInputValue}
            setDeparture={setDeparture}
            setReturnDate={setReturnDate}
            setOriginId={setOriginId}
            setDestinationId={setDestinationId}
            setOriginSkyId={setOriginSkyId}
            setDestinationSkyId={setDestinationSkyId}
          />
        </div>
      </div>
      <div className="flex justify-center mt-[-20px]">
        <button
          onClick={handleSearch}
          className="flex justify-items-center px-3 gap-2 p-2 border w-28 rounded-full bg-blue-500 text-white"
        >
          <Search />
          <p className="my-auto">{"Search"}</p>
        </button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <FlightsGrid flightsData={flights} />
    </>
  );
}
