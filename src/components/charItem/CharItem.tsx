import cx from "classnames";

import { imageNotFoundUrl } from "services/imageNotFoundUrl";

import { ITransformedChar } from "types";

import s from "./charItem.module.scss";

interface ICharItemProps {
	item: ITransformedChar;
	onCharSelected: (id: number) => void;
	focusOnItem: (id: number) => void;
	idx: number;
}

const CharItem = ({ item: { id, name, thumbnail }, onCharSelected, focusOnItem, idx }: ICharItemProps) => {
	return (
		<li
			className={s.root}
			onClick={() => {
				onCharSelected(id);
				focusOnItem(idx);
			}}
			onKeyPress={(e) => {
				if (e.key === " " || e.key === "Enter") {
					onCharSelected(id);
					focusOnItem(idx);
				}
			}}
			tabIndex={0}>
			<img
				src={thumbnail}
				alt={name}
				style={{ objectFit: thumbnail === imageNotFoundUrl ? "contain" : "cover" }}
			/>
			<div className={s.text}>{name}</div>
		</li>
	);
};

export { CharItem };
