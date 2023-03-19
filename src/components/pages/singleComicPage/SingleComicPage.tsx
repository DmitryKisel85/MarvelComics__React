import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useMarvelService } from "hooks/useMarvelService";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";

import s from "./singleComicPage.module.scss";

const SingleComicPage = () => {
	const { comicId } = useParams();

	const { getComic } = useMarvelService();

	const { data, isFetching, isLoading, error, isSuccess } = useQuery(["comic", comicId], () => getComic(comicId!), {
		enabled: !!comicId,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});

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
