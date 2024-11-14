"use client"
import Loader from '@/components/loader/loader';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {
    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle error
    const router = useRouter();

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

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col items-center gap-6 p-4 md:p-8 my-8">
            {/* Display Category Name at the Top */}
            <h1 className="text-lg sm:text-xl md:text-4xl mb-4 font-bold text-red-500">{data?.name || "Category"}</h1>


                
            <div className="flex gap-4 sm:gap-6 justify-center p-1 md:p-6 overflow-x-auto snap-x snap-mandatory flex-wrap">
                {/* Map through subcategories and display each as a card */}
                {data?.subcategories?.map((subcategory) => (
                    <div key={subcategory._id} className="flex-shrink-0 snap-center flex flex-col items-center w-32 h-36 sm:w-36 sm:h-44 md:w-56 md:h-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  sm:p-4 cursor-pointer"
                    onClick={() => router.push(`/category/${subcategory._id}/products`)}
                    >
                        {/* Subcategory Image */}
                        <img 
                            src={subcategory.image} 
                            alt={subcategory.name} 
                            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32  rounded-2xl overflow-hidden flex items-center justify-center mb-2 sm:mb-3 shadow-lg p-3"
                        />
                        {/* Subcategory Name */}
                        <h2 className="text-center text-base sm:text-base md:text-lg font-medium text-red-500 mt-1 sm:mt-2 px-2">{subcategory.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
