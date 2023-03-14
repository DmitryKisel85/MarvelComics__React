import { Link } from "react-router-dom";

import { ErrorMessage } from "components/errorMessage";

import s from "./page404.module.scss";

const Page404 = () => {
	return (
		<div className={s.root}>
			<ErrorMessage />
			<p className={s.text}>Page doesn't exist</p>
			<Link to='/' className={s.link}>
				Back to main page
			</Link>
		</div>
	);
};

export { Page404 };
