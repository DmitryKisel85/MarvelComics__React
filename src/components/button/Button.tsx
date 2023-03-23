import { useMemo } from "react";

import cx from "classnames";

import s from "./button.module.scss";

interface IButtonProps {
	onClick?: () => void;
	children?: React.ReactNode;
	isMain?: boolean;
	isSecondary?: boolean;
	isLong?: boolean;
	href?: string;
	disabled?: boolean;
}

const Button = ({ onClick, children, isMain, isSecondary, href, isLong, disabled }: IButtonProps) => {
	const CustomTag = useMemo(() => {
		if (href) return "a";
		return "button";
	}, [href]);

	return (
		<CustomTag
			className={cx(s.btn, { [s.btnMain]: isMain, [s.btnSecondary]: isSecondary, [s.btnLong]: isLong })}
			onClick={onClick}
			href={href}
			disabled={disabled}
			target={href && "_blank"}>
			<div className={s.btnInner}>{children}</div>
		</CustomTag>
	);
};

export { Button };
