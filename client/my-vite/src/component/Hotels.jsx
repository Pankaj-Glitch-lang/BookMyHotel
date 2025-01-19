import React, { useEffect, useState } from 'react';
import '../styling/Hotels.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";


const Hotels = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchHotel = async (id) => {
    try {
      const response = await axios.get(`https://www.gocomet.com/api/assignment/hotels/${id}`);
      setData(response.data.hotel);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    fetchHotel(id);
  }, [id]);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>There was an error fetching hotel details. Please try again later.</div>;
  }

  // Ensure data is available before rendering
  if (!data) {
    return <div>No hotel data available.</div>;
  }

  return (
    <div>
      <div className="hotel-details">
        <div className="content">
          <h3>{data.name}</h3>
          <span><FaLocationDot /> {data.city}, India</span>
          <span><FaStar color="gold" /> {Math.ceil(data.rating)}</span>
        </div>
      </div>

      <div className='rooms'>
        {data.rooms && data.rooms.length > 0 ? (
          data.rooms.map((room, index) => (
            <div key={index} className='room'>
              <img src={data.image_url} alt="" width={'350'} />
              <h3>{room.name}</h3>
              <p><b>{room.price}</b>/night</p>
              <div className='buttons'>
                <button className='btn-view'>View Facilites</button>
                <Link to={`/booking/${id}/${room.id}`} className='btn-book'>
                  Book Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No rooms available for this hotel.</div>
        )}

      </div>
      <h3 style={{ paddingLeft: '20px' }}>About The Peninsula Hotel</h3>
      <p style={{ paddingLeft: '20px', color: 'gray' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel dignissimos, nulla aliquam assumenda voluptatibus iste consequuntur maxime incidunt architecto quo esse nesciunt iusto mollitia voluptate sapiente illum accusamus delectus quaerat consequatur totam, quod adipisci quae id fugit. Iure suscipit illo voluptatibus omnis dicta corporis, voluptates autem fugiat eos optio hic quae ullam natus placeat excepturi magnam! Repellat aliquid fugit, error dolore perspiciatis ipsam architecto id necessitatibus corrupti saepe cupiditate reiciendis harum reprehenderit. Unde, enim distinctio consequatur deserunt veniam doloremque necessitatibus ex, ad ullam accusantium dicta nisi quae, fuga doloribus eveniet expedita sapiente quia. Necessitatibus nam excepturi blanditiis natus temporibus quaerat.</p>
    </div>
  );
};

export default Hotels;
