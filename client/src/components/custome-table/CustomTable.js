import React from "react";
import { Button, ListGroup } from "react-bootstrap";

export const CustomTable = ({ expenses, handleOnDelete }) => {
	return (
		<div className="mt-5 custom-list fs-3">
			<ListGroup>
				{expenses.map((item, i) => (
					<ListGroup.Item key={i} className="fw-bold">
						<span className="title">{item.name}</span>
						<span className="cost">
							${item.amount}{" "}
							<Button variant="danger" onClick={() => handleOnDelete(item._id)}>
								<i class="fa-solid fa-trash"></i>
							</Button>
						</span>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};
