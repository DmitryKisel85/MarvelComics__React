import { Image } from "components/common/image";
import { Button } from "components/common/button";

import type { ITransformedChar } from "types";

import s from "./randomCharBox.module.scss";

interface IRandomCharBoxProps {
	char: ITransformedChar;
}

const RandomCharBox = ({ char }: IRandomCharBoxProps) => {
	const { thumbnail, name, description, homepage, wiki } = char;

	return (
		<div className={s.root}>
			<Image src={thumbnail} className={s.img} altText='Random character' />
			<div className={s.box}>
				<p className={s.name}>{name}</p>
				<p className={s.descr}>{description}</p>
				<div className={s.btns}>
					<Button href={homepage} isMain>
						Homepage
					</Button>
					<Button href={wiki} isSecondary>
						Wiki
					</Button>
				</div>
			</div>
		</div>
	);
};

export { RandomCharBox };
