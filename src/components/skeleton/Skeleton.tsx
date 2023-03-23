import cx from "classnames";

import s from "./skeleton.module.scss";

const Skeleton = () => {
	return (
		<div className={s.root}>
			<p>Please select a character to see information</p>
			<div className={s.container}>
				<div className={s.header}>
					<div className={cx(s.pulse, s.circle)}></div>
					<div className={cx(s.pulse, s.mini)}></div>
				</div>
				<div className={cx(s.pulse, s.block)}></div>
				<div className={cx(s.pulse, s.block)}></div>
				<div className={cx(s.pulse, s.block)}></div>
			</div>
		</div>
	);
};

export { Skeleton };
