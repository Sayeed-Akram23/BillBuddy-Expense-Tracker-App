import React,{useEffect, useState} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';
import axios from 'axios'
const Register = () => {
  const navigate = useNavigate();
  const[loading,setLoading] = useState(false)
  const submitHandler = async(values) =>{
    try {
      setLoading(true)
      await axios.post('/api/v1/users/register',values)
      message.success('Registration Successfull')
      setLoading(false)
      navigate('/login');
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
    
    <div className="register-page">
      {loading && <Spinner/>}
        <Form layout='vertical' onFinish={submitHandler}>
          
          <h1>Register form</h1>
          <Form.Item label="Name" name= "name">
            <Input/>
          </Form.Item>
          <Form.Item label="Email" name= "email">
            <Input type='email'/>
          </Form.Item>
          <Form.Item label="Password" name= "password">
            <Input type='password'/>
          </Form.Item>
          <div className='d-flex'justify-content="space-between">
        <Link to= "/login">Already registered? Click here to login</Link>
        <button className='btn btn-primary m-2'>Register</button>
        </div>
        </Form>

        
    </div>
    </>
  )
}

export default Register;