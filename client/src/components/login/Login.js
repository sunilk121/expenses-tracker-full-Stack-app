import React, { useState, useRef } from "react";
import { Alert, Button, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../helpers/axiosHelper";

export const Login = () => {
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (!email || !password) {
			return alert("Please enter your email and password");
		}
		setLoading(true);
		const { data } = await postLogin({ email, password });
		setLoading(false);

		if (data.status === "success") {
			const { name, email, _id } = data.user;
			// if loging sucess, store user data in sessionStorage and redirect to dashboard page
			sessionStorage.setItem("user", JSON.stringify({ name, email, _id }));
			setError("");
			navigate("/dashboard");
			return;
		}

		// show error message
		setError(data.message);
	};

	return (
		<Row className="login-comp mt-5">
			<Form>
				<h3>Welcome Back </h3>
				<hr />

				{loading && <Spinner animation="border" variant="primary" />}

				{error && <Alert variant="danger">{error}</Alert>}

				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control ref={emailRef} type="email" placeholder="Enter email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						ref={passwordRef}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Button variant="primary" onClick={handleSubmit}>
					Login
				</Button>

				<div className="text-end">
					New here? <Link to="/register">Register</Link>
				</div>
			</Form>
		</Row>
	);
};
