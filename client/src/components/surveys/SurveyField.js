import React from "react";

export default ({ input, label, name, meta: { touched, error } }) => {
	return (
		<div className="form-group">
			<div className="form-control">
				<label htmlFor={name}>{label}</label>
				<input className="form-control" id={name} {...input} />
			</div>
				<div className="alert alert-warning form-control">
					{touched ? error : ''}
				</div>

		</div>
	);
};
