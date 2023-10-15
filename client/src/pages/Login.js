import React,{useState,useEffect } from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios'
import Spinner from '../components/layout/Spinner';

const Login = () => {
    const navigate = useNavigate();
  const[loading,setLoading] = useState(false)
    const submitHandler = async(values) =>{
        try {
            setLoading(true)
            const {data} = await axios.post('/api/v1/users/login',values)
            setLoading(false)
            message.success('Login Successfull')
            localStorage.setItem("user",JSON.stringify({...data.user,password:""}));
            navigate("/");
          } catch (error) {
            setLoading(false)
            message.error("Something went wrong");
            
          }
        
      };
        //prevent for login user
  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
      navigate("/")
    }
  },[navigate]);
  return (
    <>
    <div className="register-page" >
        {loading && <Spinner/>}
        <Form layout='vertical' onFinish={submitHandler}>
          <h1>Login form</h1>
          <Form.Item label="Email" name= "email">
            <Input type='email'/>
          </Form.Item>
          <Form.Item label="Password" name= "password">
            <Input type='password'/>
          </Form.Item>
          <div className='d-flex'justify-content="space-between">
        <Link to= "/register">Not a user ? Click here to Register</Link>
        <button className='btn btn-primary m-2'>Login</button>
        </div>
        </Form>

        
    </div>
    </>
    
  );
};

export default Login;