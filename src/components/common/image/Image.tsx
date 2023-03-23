import { IMGNOTFND } from "constant";

interface IImageProps {
	src: string;
	altText: string;
	className?: string;
}

const Image = ({ src, altText, className }: IImageProps) => {
	return (
		<img
			src={src}
			alt={altText}
			className={className}
			style={{ objectFit: src === IMGNOTFND ? "contain" : "cover" }}
		/>
	);
};

export { Image };
