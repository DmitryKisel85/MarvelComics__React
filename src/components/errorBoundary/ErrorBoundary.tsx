import React, { Component } from "react";
import { ErrorMessage } from "components/errorMessage";

class ErrorBoundary extends Component<{ children: React.ReactNode }, { error: boolean }> {
	state = {
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		return this.props.children;
	}
}

export { ErrorBoundary };
