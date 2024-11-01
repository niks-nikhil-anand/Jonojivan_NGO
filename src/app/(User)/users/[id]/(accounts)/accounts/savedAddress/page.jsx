"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '@/components/loader/loader';

const SavedAddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/api/savedAddress'); // Adjust the API endpoint as necessary
                setAddresses(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    if (loading) {
        return <div>
          <Loader/>
        </div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="mx-auto p-4 my-5">
            <h1 className="text-2xl font-bold mb-4">Saved Addresses</h1>
            <div className="space-y-4">
                {addresses.map((address) => (
                    <div key={address._id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">
                            {address.firstName} {address.lastName}
                        </h2>
                        <p>{address.typeOfAddress}</p>
                        <p>{address.apartment}, {address.address}</p>
                        <p>{address.city}, {address.state}</p>
                        {address.landmark && <p>Landmark: {address.landmark}</p>}
                        {address.mobileNumber && <p>Phone: {address.mobileNumber}</p>}
                        <p>Email: {address.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedAddressPage;
