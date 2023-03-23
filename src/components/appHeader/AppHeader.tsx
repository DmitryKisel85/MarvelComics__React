import { Link, NavLink } from "react-router-dom";
import cx from "classnames";

import s from "./appHeader.module.scss";

const AppHeader = () => {
	return (
		<header className={s.root}>
			<h1 className={s.title}>
				<Link to='/'>
					<span>Marvel</span> information portal
				</Link>
			</h1>
			<nav className={s.nav}>
				<ul>
					<li>
						<NavLink end className={({ isActive }) => (isActive ? cx({ [s.active]: true }) : "")} to='/'>
							Characters
						</NavLink>
					</li>
					/
					<li>
						<NavLink className={({ isActive }) => (isActive ? cx({ [s.active]: true }) : "")} to='/comics'>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export { AppHeader };
