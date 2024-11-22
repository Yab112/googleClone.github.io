# ✈️ Google Flights Clone

![Screen Shot 2024-09-25 at 5 52 07 PM](https://github.com/user-attachments/assets/a74444d1-4eca-4d58-ba9d-c55a749188dd)

Loom ![alt text](image.png): (https://www.loom.com/share/76d1f7e7f7334aee8e0250f52162f19d?sid=a1aaf6f6-0321-4a02-9f1e-53488622aae5)

Welcome to the **Google Flights Clone**! This is a React.js-based flight search app using Material UI v6.1.1 and the RapidAPI Sky Scraper API to search and display flight results. The project showcases a user-friendly flight search interface and results display with **Accordion-style flight details**, similar to Google Flights.

## 🚀 Features

- **Flight Search Interface**: Users can search for flights by origin, destination, trip type, flight type, and number of passengers.
- **Flight Results Accordion**: Results are displayed using an accordion UI component that shows the flight date and price, with detailed flight information available in the dropdown.
- **Optimized API Calls**: Memoization and efficient rendering strategies ensure minimal API requests and fast performance.
- **Fully Responsive Design**: Built with Material UI's latest version to ensure the app looks great on all devices.

## 🛠️ Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **Material UI v6.1.1**: A popular React UI framework with customizable components.
- **Axios**: Promise-based HTTP client for API calls.
- **RapidAPI Sky Scraper API**: The flight search engine that powers the flight data in this app.

## 📝 How to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/codejesse/google-flights-clone.git
   cd google-flights-clone
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory with your RapidAPI credentials:

   ```env
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
   ```

4. Run the app locally:

   ```bash
   npm start
   ```

5. The app will be available at `http://localhost:3000` in your browser.

## 🔍 How It Works

1. **Flight Search**: The user inputs the necessary flight details (origin, destination, dates, etc.) via Material UI's `Autocomplete` and `TextField` components.
2. **API Integration**: Upon submitting the search, `Axios` fetches flight data from the RapidAPI Sky Scraper API.
3. **Results Display**: The results are shown using Material UI's `Accordion`, where basic flight details (date, price) are shown first. Users can expand to view additional information like departure and arrival times, airline, and flight duration.
4. **Error Handling**: If there's an issue with the API call or data, a `Snackbar` displays an error message, preventing the app from crashing.

## ✨ Demo

🚧 **Live demo coming soon!** Stay tuned for a hosted version on Vercel.

## 🤖 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production.
- `npm test`: Runs unit tests (Jest and React Testing Library).

## 🧩 Project Structure

Here's an overview of the folder structure:

```
├── public
├── src
│   ├── components
│   │   └── FlightResults.tsx  // Accordion component for displaying flights
│   ├── services
│   │   └── api.ts                      // Axios API configuration
│   ├── pages
│   │   └── SearchFlights.tsx            // Main flight search component
│   ├── App.tsx                          // Main App entry point
│   └── index.tsx                        // React DOM entry point
├── .env                                 // API credentials
└── package.json
```

<!-- ## 📸 Screenshots
![Flight Search](https://via.placeholder.com/800x400?text=Flight+Search+UI)
_Flight search page with inputs for origin, destination, and travel details._ -->

<!-- ![Flight Results](https://via.placeholder.com/800x400?text=Flight+Results+Accordion)
_Accordion-style display of flight results with price and detailed information._ -->

## 📦 Future Features

- **Filters**: Filter results by price, duration, and airlines.
- **Favorites**: Save favorite flights for quick access.
- **Pagination**: Display large search results over multiple pages for better performance.

## 📬 Contact

Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/jesse-beke/) or open an issue on this repository if you have any questions or feedback.

---

Happy coding! ✨
