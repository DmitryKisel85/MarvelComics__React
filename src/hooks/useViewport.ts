import React from "react";
import { isMobile } from "react-device-detect";

const useViewport = () => {
	const [state, setState] = React.useState({
		isLocalMobile: false,
	});

	React.useEffect(() => {
		if (window.innerWidth <= 450) {
			setState((state) => ({ ...state, isLocalMobile: true }));
		}
	}, []);

	return {
		isMobile: isMobile || state.isLocalMobile,
	};
};

export { useViewport };
