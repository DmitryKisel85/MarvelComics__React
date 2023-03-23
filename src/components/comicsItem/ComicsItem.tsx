import { Link } from "react-router-dom";

import { Image } from "components/common/image";

import type { ITransformedComic } from "types";

import s from "./comicsItem.module.scss";

interface IComicsItemProps {
	comic: ITransformedComic;
}

const ComicsItem = ({ comic: { id, thumbnail, title, price } }: IComicsItemProps) => {
	return (
		<li className={s.root}>
			<Link to={`/comics/${id}`}>
				<Image src={thumbnail} className={s.img} altText={title} />
				<div className={s.title}>{title}</div>
				<div className={s.text}>{price}</div>
			</Link>
		</li>
	);
};

export { ComicsItem };
