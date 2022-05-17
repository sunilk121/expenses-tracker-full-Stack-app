import React, { useState } from "react";
import { Alert, Button, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postRegister } from "../../helpers/axiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingPending, setRespponse } from "./userSlice";
const initialState = {
  name: "",
  email: "",
  password: "",
};
export const Register = () => {
  const [formDt, setFormDt] = useState(initialState);
  //

  const dispatch = useDispatch();
  const { res, isLoading } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //setIsLoading(true);
    dispatch(isLoadingPending(true));
    // call api using axios
    const { data } = await postRegister(formDt);
    //setRes(data);
    dispatch(setRespponse(data));
    //setIsLoading(false);
    //dispatch(isLoadingPending(false));
  };

  return (
    <Row className="login-comp mt-5">
      <Form onSubmit={handleOnSubmit}>
        <h3>Register To Join Us! </h3>
        <hr />

        {isLoading && <Spinner variant="primary" animation="border" />}

        {res.message && (
          <Alert variant={res.status === "success" ? "success" : "danger"}>
            {res.message}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="text"
            name="name"
            required
            placeholder="Enter Full name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="email"
            name="email"
            required
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>

        <div className="text-end">
          Already a member? <Link to="/">Login</Link>
        </div>
      </Form>
    </Row>
  );
};
