import { memo } from "react";

import avengers from "resources/img/Avengers.png";
import avengersLogo from "resources/img/Avengers_logo.png";

import s from "./appBanner.module.scss";

const AppBanner = memo(() => {
	return (
		<div className={s.root}>
			<img src={avengers} className={s.img} alt='Avengers' />
			<div className={s.text}>
				New comics every week!
				<br />
				Stay tuned!
			</div>
			<img src={avengersLogo} className={s.logo} alt='Avengers logo' />
		</div>
	);
});

export { AppBanner };
