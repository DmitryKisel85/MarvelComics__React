import { useParams, Link } from "react-router-dom";

import { useGetComicQuery } from "hooks/useQueries";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";

import s from "./singleComicPage.module.scss";

const SingleComicPage = () => {
	const { comicId } = useParams();

	const { data, isFetching, isLoading, error, isSuccess } = useGetComicQuery(comicId);

	if (!comicId) return null;
	if (error || !data) return <ErrorMessage />;
	if (isLoading || isFetching) return <Spinner />;

	const { title, description, pageCount, thumbnail, language, price } = data;

	return (
		<>
			{isSuccess && (
				<div className={s.root}>
					<img src={thumbnail} alt={title} className={s.img} />
					<div className={s.box}>
						<h2 className={s.title}>{title}</h2>
						<p className={s.text}>{description}</p>
						<p className={s.text}>{pageCount}</p>
						<p className={s.text}>Language: {language}</p>
						<div className={s.priceText}>{price}</div>
					</div>
					<Link to='/comics' className={s.link}>
						Back to all
					</Link>
				</div>
			)}
		</>
	);
};

export { SingleComicPage };
