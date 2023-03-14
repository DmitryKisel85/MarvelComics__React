import cx from "classnames";

import { IMGNOTFND } from "constant";

import { ITransformedChar } from "types";

import s from "./charItem.module.scss";

interface ICharItemProps {
	char: ITransformedChar;
	isActive?: boolean;
	onClick: () => void;
}

const CharItem = ({ char: { name, thumbnail }, isActive, onClick }: ICharItemProps) => {
	return (
		<li className={cx(s.root, isActive && s.active)} tabIndex={0} onClick={onClick}>
			<img src={thumbnail} alt={name} style={{ objectFit: thumbnail === IMGNOTFND ? "contain" : "cover" }} />
			<div className={s.text}>{name}</div>
		</li>
	);
};

export { CharItem };
