import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/Booking.css'; // Import the CSS file

const Booking = () => {
  const { id, roomId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });
  const [guest1, setGuest1] = useState({
    name: '',
    age: '',
    gender: 'Male',
  });
  const [guest2, setGuest2] = useState({
    name: '',
    age: '',
    gender: 'Male',
  });
  const [bookingSuccessful, setBookingSuccessful] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`https://www.gocomet.com/api/assignment/hotels/${id}`);
        setHotel(response.data.hotel);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    fetchHotel();
  }, [id]);

  useEffect(() => {
    if (hotel && roomId) {
      const selectedRoom = hotel.rooms.find((room) => room.id === roomId);
      setSelectedRoom(selectedRoom);
    }
  }, [hotel, roomId]);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleGuest1Change = (e) => {
    setGuest1({ ...guest1, [e.target.name]: e.target.value });
  };

  const handleGuest2Change = (e) => {
    setGuest2({ ...guest2, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data (e.g., check-in date before check-out date)

    // Simulate booking logic here (assuming a successful booking)
    setBookingSuccessful(true);
    console.log('Booking details:', {
      hotel: hotel.name,
      room: selectedRoom.name,
      checkInDate,
      checkOutDate,
      guests,
      guest1,
      guest2,
    });

    // Reset form after successful booking (optional)
    // setSelectedRoom(null);
    // setCheckInDate('');
    // setCheckOutDate('');
    // setGuests({ adults: 1, children: 0 });
    // setGuest1({ name: '', age: '', gender: 'Male' });
    // setGuest2({ name: '', age: '', gender: 'Male' });
  };

  return (
    <>
    <div className='booking'>
    <div className="booking-container">
      {hotel ? (
        <>
         
           <br />
         
                {/* Add a placeholder image or use the selected room's image if available */}
                <img src={'https://th.bing.com/th/id/R.fd7b996f2e00e3715d4211863b2fdabf?rik=XmXHS9BNUXwGWQ&riu=http%3a%2f%2fwww.bestwesternplusmeridian.com%2fContent%2fimages%2fQueen-Room-o.jpg&ehk=dxP298vmMaLYbbBQz9Ls4IOHAz40HDl8EWe4oVTZd%2f8%3d&risl=&pid=ImgRaw&r=0'} alt={selectedRoom?.name || 'Room Image'} width={600}/>
            
          {bookingSuccessful ? (
            <p className="booking-success">Your booking is confirmed!</p>
          ) : (
            <div className="booking-form">
             

              <div className="guest-details">
                <h3>Guests</h3>
                <div className="guest-info">
                  <h4>Person 1</h4>
                  <input type="text" name="name" placeholder="Name" value={guest1.name} onChange={handleGuest1Change} />
                  <div className="age-gender">
                    <input type="number" name="age" placeholder="Age" value={guest1.age} onChange={handleGuest1Change} />
                    <div className="gender-radio">
                      <input type="radio" id="male1" name="gender" value="Male" checked={guest1.gender === 'Male'} onChange={handleGuest1Change} />
                      <label htmlFor="male1">Male</label>
                      <input type="radio" id="female1" name="gender" value="Female" checked={guest1.gender === 'Female'} onChange={handleGuest1Change} />
                      <label htmlFor="female1">Female</label>
                    </div>
                  </div>
                </div>
                <div className="guest-info">
                  <h4>Person 2</h4>
                  <input type="text" name="name" placeholder="Name" value={guest2.name} onChange={handleGuest2Change} />
                  <div className="age-gender">
                    <input type="number" name="age" placeholder="Age" value={guest2.age} onChange={handleGuest2Change} />
                    <div className="gender-radio">
                      <input type="radio" id="male2" name="gender" value="Male" checked={guest2.gender === 'Male'} onChange={handleGuest2Change} />
                      <label htmlFor="male2">Male</label>
                      <input type="radio" id="female2" name="gender" value="Female" checked={guest2.gender === 'Female'} onChange={handleGuest2Change} />
                      <label htmlFor="female2">Female</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="booking-details">
                <div className="booking-item">
                  <span>Person:</span>
                  <span>{guests.adults + guests.children}</span>
                </div>
                <div className="booking-item">
                  <span>Check-in:</span>
                  <input type="date" value={checkInDate} onChange={handleCheckInChange} />
                </div>
                <div className="booking-item">
                  <span>Check-out:</span>
                  <input type="date" value={checkOutDate} onChange={handleCheckOutChange} />
                </div>
              </div>

              <button type="submit" onClick={handleSubmit}>
                Book Now
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading hotel data...</p>
      )}
    </div>
    </div>
    </>
  );
};

export default Booking;