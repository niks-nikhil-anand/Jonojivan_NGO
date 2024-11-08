"use client"
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle error

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlPath = window.location.pathname;
                const id = urlPath.split('/')[2];

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            {/* Display Category Name at the Top */}
            <h1 className="text-2xl font-bold mb-4">{data?.name || "Category"}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Map through subcategories and display each as a card */}
                {data?.subcategories?.map((subcategory) => (
                    <div key={subcategory._id} className="border rounded shadow p-4">
                        {/* Subcategory Image */}
                        <img 
                            src={subcategory.image} 
                            alt={subcategory.name} 
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                        {/* Subcategory Name */}
                        <h2 className="text-lg font-semibold">{subcategory.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
