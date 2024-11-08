import React from 'react'
import React, { useEffect, useState } from 'react';


const page = () => {

    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlPath = window.location.pathname;
                const id = urlPath.split('/')[2];
                setIdFromURL(id);

                const response = await fetch(`/api/admin/dashboard/category/subCategory/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []); 
  return (

    <div>
        
    </div>
  )
}

export default page