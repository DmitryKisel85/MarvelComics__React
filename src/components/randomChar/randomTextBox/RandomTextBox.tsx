import { Button } from "components/button";

import mjolnir from "resources/img/mjolnir.png";

import s from "./randomTextBox.module.scss";

interface IRandomTextBoxProps {
	onClick: () => void;
}

const RandomTextBox = ({ onClick }: IRandomTextBoxProps) => {
	return (
		<div className={s.root}>
			<p className={s.title}>
				Random character for today!
				<br />
				Do you want to get to know him better?
			</p>
			<p className={s.title}>Or choose another one</p>
			<Button isMain onClick={onClick}>
				try it
			</Button>
			<img src={mjolnir} alt='mjolnir' className={s.img} />
		</div>
	);
};

export { RandomTextBox };
