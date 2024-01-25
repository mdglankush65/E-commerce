import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '@/components/CartContext';
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
        border-color: #167bff;
        box-shadow: none;
    }
`;
const Para = styled.p`
    margin-top:8px;
`;
const Login = () => {
    const { setLoggedIn } = useContext(CartContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = axios.post('/api/login', { email, password });
            console.log(response);
            if (response) {
                setLoggedIn(true);
                toast.success('Successfully LoggedIn');
                // router.push('/');
            }
            else
                toast.error('Invalid Credentials')();
        } catch (error) {
            toast.error('Server Request Error');
        }
    };
    return (
        <Bg>
            <AuthWrapper>
                <ToastContainer />
                <form onSubmit={handleSubmit} >
                    <h3>Sign In</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <FormControl
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <FormControl
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <FormControl
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                <Para>
                    Not registered <Link href="/register">sign up?</Link>
                </Para>
            </AuthWrapper>
        </Bg>
    );
};
export default Login;
