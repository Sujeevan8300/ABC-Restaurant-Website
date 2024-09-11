import '../../style/Home.css';
import NavigationBar from '../../components/Navigation';
import Footer from '../../components/Footer';
import { UserContext } from '../../components/UserContext';
import React, { useContext } from 'react';

function CustomerDashboard() {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; // Or a more styled loading indicator
    }

    if (!user) {
        return <div>No user data available.</div>; // Or redirect to login or another page
    }

    return (
        <>
            <NavigationBar />
            <div className="container">
                <div className="home-container">
                    <h1 className="heading">
                        Welcome {user.first_name} {user.last_name}!
                    </h1>
                    <p>Email: {user.email}</p>
                    <p>City: {user.city}</p>
                    <p>Address: {user.address}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Role: {user.role}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CustomerDashboard;
