import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Bg = styled.div`
    display:flex;
    justify-content:space-around;
`;
const AuthWrapper = styled.div`
    width: 40%;
    height: 100%;
    margin: 60px 0px;
    background-color:#fff;
    flex-direction: column;
    text-align: left;
    padding:30px;
    border-radius:15px;
`;
const FormControl = styled.input`
    &.form-control:focus {
        border-color : #167bff;
        box-shadow : none;
    }
`;
const Para = styled.p`
    margin-top : 8px;
`;
const Register = () => {
    const router = useRouter();
    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', data);
            if (response) {
                toast.success('Successfully Registered');
                router.back('/');
            }
        } catch (error) {
            toast.error('User Already Exists');
        }
    };
    const handleInputChange = (e, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: e.target.value,
        }));
    };
    return (
        <Bg>
            <AuthWrapper>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label>First name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            onChange={(e) => handleInputChange(e, 'firstname')}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Last name</label>
                        <FormControl
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            onChange={(e) => handleInputChange(e, 'lastname')}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email address</label>
                        <FormControl
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <FormControl
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => handleInputChange(e, 'password')}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                </form>
                <Para className="forgot-password text-right">
                    Already registered <Link href="/login">sign in?</Link>
                </Para>
            </AuthWrapper>
        </Bg>
    )
}
export default Register;

