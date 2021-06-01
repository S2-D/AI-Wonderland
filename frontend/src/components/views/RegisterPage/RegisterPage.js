/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import baseUrl from '../../../url/http';

const schema = yup.object().shape({
  email: yup
    .string()
    .email(
      'The email address does not match the format. Please check the value.'
    )
    .required('Please enter your email.'),
  password: yup
    .string()
    .min(8, 'Please make it more than 8 letters.')
    .max(16)
    .matches(
      '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      'Password must contain alphabetic/numeric/special characters.'
    )
    .required('Please enter your Password.'),
  confirm: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password is not matched. Please try again.'
    )
    .required('Please enter your password one more time.'),

  nickname: yup.string().required('Please enter your nickname.'),
});

function RegisterPage() {
  let history = useHistory();
  const post = (data) => {
    axios.post(baseUrl + '/member/signUp/', data).then((response) => {
      console.log('response: ', response.data.status);
      if (response.data.status === 'success') {
        alert('회원가입이 완료되었습니다.');
        history.push('/login');
      } else {
        alert(response.data.status.error);
        console.log(response);
        history.push('/signUp');
      }
    });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
        //alert(JSON.stringify(values, null, 2));
        post(values);
      }}
      initialValues={{
        email: '',
        password: '',
        nickname: '',
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="validationFormik01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email."
              name="email"
              value={values.email || ''}
              onChange={handleChange}
            />
            <ErrorMessage name="email" component="p" />
          </Form.Group>

          <Form.Group controlId="validationFormik02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password."
              name="password"
              value={values.password || ''}
              onChange={handleChange}
            />
            <ErrorMessage name="password" component="p" />
          </Form.Group>

          <Form.Group controlId="validationFormik03">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password check"
              name="confirm"
              // value={values.confirm || ''}
              onChange={handleChange}
            />
            <ErrorMessage name="confirm" component="p" />
          </Form.Group>

          <Form.Group controlId="validationFormik04">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your nickname."
              name="nickname"
              value={values.nickname || ''}
              onChange={handleChange}
            />
            <ErrorMessage name="nickname" component="p" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterPage;
