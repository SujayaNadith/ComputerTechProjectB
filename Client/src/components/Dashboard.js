import React, {useState} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Form } from 'react-router-dom';

const Dashboard = () => {

    const { accountType } = useAuth();

    const [userProfile, setUserProfile] = useState({

        accountID: 'STU1023',
        givenName: 'Jay', 
        lastName: 'Gallage', 
        dob: '2010-04-22', 
        theme: 'light'
    });

    const handleThemeChange = (e) => {

        setUserProfile((prev) => ({ ...prev, theme: e.target.value}));
        alert('Theme updated to ${e.target.value} (simulated)');
    };

    return(
        <Container className="my-4">
            <h2 className="mb-4">My Dashboard</h2>

            <Card className='shadow-sm mb-3'>
                <Card.Body>
                    <Card.Title>User Information</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Account ID</Form.Label>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}