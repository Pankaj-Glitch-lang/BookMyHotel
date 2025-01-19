import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styling/Home.css";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelNames, setHotelNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    city: "",
    sortBy: "",
  });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(1);
  const navigate = useNavigate();

  // Fetch all hotel names
  useEffect(() => {
    const fetchHotelNames = async () => {
      try {
        const response = await axios.get(
          "https://www.gocomet.com/api/assignment/hotels-name"
        );
        setHotelNames(response.data || []);
      } catch (error) {
        console.error("Error fetching hotel names:", error);
      }
    };
    fetchHotelNames();
  }, []);

  // Fetch hotels for the Explore section
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("https://www.gocomet.com/api/assignment/hotels", {
          params: { page, size },
        });
        setHotels(response.data.hotels || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, [page, size]);

  // Filter and sort hotels
  const applyFilters = () => {
    return hotels
      .filter((hotel) => {
        const roomPrices = hotel.rooms.map((room) => room.price);
        const minRoomPrice = Math.min(...roomPrices);
        const maxRoomPrice = Math.max(...roomPrices);
        return (
          (filters.city === "" ||
            hotel.city.toLowerCase().includes(filters.city.toLowerCase())) &&
          minRoomPrice >= filters.minPrice &&
          maxRoomPrice <= filters.maxPrice &&
          hotel.rating >= filters.minRating &&
          (searchQuery === "" ||
            hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.city.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-low-high") {
          return (
            Math.min(...a.rooms.map((room) => room.price)) -
            Math.min(...b.rooms.map((room) => room.price))
          );
        } else if (filters.sortBy === "price-high-low") {
          return (
            Math.max(...b.rooms.map((room) => room.price)) -
            Math.max(...a.rooms.map((room) => room.price))
          );
        } else if (filters.sortBy === "rating") {
          return b.rating - a.rating;
        }
        return 0;
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHotels = applyFilters();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut || !persons) {
      alert("Please fill in all the fields!");
      return;
    }
    
  
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="content">
          <h1>Find the Perfect deal, always.</h1>
          <p>Search hotels from around the world and explore amazing offers.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Type city, place, or hotel name"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={(e) => {
                e.target.value = ""; // Clear the input temporarily
                setTimeout(() => setSearchQuery(e.target.value), 2); // Reset value
              }}
              list="hotel-list"
            />
            <datalist id="hotel-list">
              {hotelNames.map((hotel, index) => (
                <option key={index} value={hotel.name} />
              ))}
            </datalist>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Persons"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

        </div>
      </div>

      <div className="home-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>Price Range:</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>Min Rating:</label>
            <input
              type="number"
              name="minRating"
              placeholder="Min Rating (1-5)"
              value={filters.minRating}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>Sort By:</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="">None</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <button onClick={() => setFilters({ minPrice: 0, maxPrice: 10000, minRating: 0, city: "", sortBy: "" })}>
            Reset Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2>Explore Hotels</h2>
          <div className="hotel-grid">
            {filteredHotels.map((hotel) => {
              const roomPrices = hotel.rooms.map((room) => room.price);
              const minPrice = Math.min(...roomPrices);
              const maxPrice = Math.max(...roomPrices);

              return (
                <div key={hotel.id} className="hotel-card">
                  <img src={hotel.image_url} alt={hotel.name} />
                  <div className="hotel-info">
                    <h3>{hotel.name}</h3>
                    <p>{hotel.city}</p>
                    <p>₹ {minPrice} - ₹ {maxPrice}</p>
                    <p>Rating: ⭐ {Math.ceil(hotel.rating)}</p>
                    <button className="view-details" >
                      <Link to={`/hotels/${hotel.id}`}>View Details </Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
              Prev
            </button>
            <span>Page {page}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page==5}>Next</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
