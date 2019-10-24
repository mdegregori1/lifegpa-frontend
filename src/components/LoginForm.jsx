import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Login = props => {
  const initialValues = {
    username: '',
    password: ''
  }

  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username must be entered'),
    password: Yup.string().required('Password must be entered')
  })

  return (
    <Main>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('login values', values)
          axios
            .post(`https://reqres.in/api/login`, {
              email: 'eve.holt@reqres.in',
              password: 'cityslicka'
            })
            // .post(`https://bw-life-gpa.herokuapp.com/login`, values)
            .then(res => {
              console.log('login response', res.data)
              localStorage.setItem('token', 'thisisajwttokenyessir')
              history.push('/dashboard')
            })
            .catch(err => {
              console.log('error on login:', err.response)
            })
        }}
        render={({ touched, errors, values, handleChange }) => (
          <Form2>
            <Title>Login</Title>

            <Text>
              <Input
                type='text'
                name='username'
                placeholder='Enter Your Username'
                value={values.username}
                onChange={handleChange}
              />
              {touched.username && errors.username && (
                <Errors>{errors.username}</Errors>
              )}
              <Input
                type='password'
                name='password'
                placeholder='Enter Your Password'
                value={values.password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <Errors>{errors.password}</Errors>
              )}
            </Text>
            <Buttonc>
              <Button className='buttonclass'>Login</Button>
            </Buttonc>
          </Form2>
        )}
      />

      <Link1 to='/register'>
        <Newlink>Need to create an account? Click here.</Newlink>
      </Link1>
    </Main>
  )
}

export default Login

//styling

const Main = styled.div`
  height: 84vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
`
const Form2 = styled(Form)`
  border: 1px solid black;
  background-color: #fff;
  padding: 20px;
`
const Title = styled.label`
  text-align: center;
  margin: 10%;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
`
const Input = styled(Field)`
  width: 15rem;
  height: 3rem;
  margin-top: 5%;
  margin-bottom: 5%;
  font-family: 'Rajdhani', sans-serif;
  text-align: center;
  
`
const Buttonc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover .buttonclass{
    background-color: black;
    color: #fff;
  }
`

const Button = styled.button`
  background-color: #ffeb38;
  color: black;
  width: 100%;
  text-align: center;
  padding: 5%;
  border-radius: 3px;
  font-size: 1.5rem;
  font-family: 'Rajdhani', sans-serif;
`

const Newlink = styled.p`
  font-size: 10px;
`

const Link1 = styled(Link)`
  color: black;
`

const Errors = styled.p`
  font-size: 1rem;
`
/*
            .post(`https://reqres.in/api/login`, {
              email: 'eve.holt@reqres.in',
              password: 'cityslicka'
            })
*/
