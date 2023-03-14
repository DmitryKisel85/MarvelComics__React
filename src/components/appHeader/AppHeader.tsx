import { Link, NavLink } from "react-router-dom";

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
						<NavLink end style={({ isActive }) => ({ color: isActive ? "#9f0013" : "inherit" })} to='/'>
							Characters
						</NavLink>
					</li>
					/
					<li>
						<NavLink style={({ isActive }) => ({ color: isActive ? "#9f0013" : "inherit" })} to='/comics'>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export { AppHeader };
