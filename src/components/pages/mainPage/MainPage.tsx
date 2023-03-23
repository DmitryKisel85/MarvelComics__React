import { useState } from "react";

import { RandomChar } from "components/randomChar";
import { CharList } from "components/charList";
import { CharInfo } from "components/charInfo";
import { ErrorBoundary } from "components/errorBoundary";
import { Image } from "components/common/image";

import decoration from "resources/img/vision.png";

import s from "./mainPage.module.scss";

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState<number | null>(null);

	const onCharSelected = (id: number) => {
		setSelectedChar(id);
	};
	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className={s.root}>
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} selectedChar={selectedChar} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
			<Image src={decoration} className={s.bgImage} altText='vision' />
		</>
	);
};

export { MainPage };
