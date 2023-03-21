import { useQuery } from "@tanstack/react-query";
import cx from "classnames";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { Skeleton } from "components/skeleton";

import { IMGNOTFND } from "constant";
import { useMarvelService } from "hooks/useMarvelService";

import s from "./charInfo.module.scss";

interface CharInfoProps {
	charId: number | null;
}

const CharInfo = ({ charId }: CharInfoProps) => {
	const { getChar } = useMarvelService();

	const { data, isFetching, isLoading, error, isSuccess } = useQuery(["char", charId], () => getChar(charId), {
		enabled: !!charId,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});

	if (!charId || !data) return <Skeleton />;

	const { name, description, thumbnail, homepage, wiki, comics } = data;

	return (
		<div className={s.root}>
			<>
				{error && <ErrorMessage />}
				{(isLoading || isFetching) && <Spinner />}

				{isSuccess && !isLoading && !isFetching && (
					<>
						<div className={s.container}>
							<img
								src={thumbnail}
								alt={name}
								style={{ objectFit: thumbnail === IMGNOTFND ? "contain" : "cover" }}
							/>
							<div className={s.innerContainer}>
								<div className={s.head}>{name}</div>
								<div className={s.btns}>
									<a
										href={homepage}
										className={cx(s.btn, s.btnMain)}
										target='_blank'
										rel='noreferrer'>
										<div className={s.btnInner}>homepage</div>
									</a>
									<a
										href={wiki}
										className={cx(s.btn, s.btnSecondary)}
										target='_blank'
										rel='noreferrer'>
										<div className={s.btnInner}>Wiki</div>
									</a>
								</div>
							</div>
						</div>
						<div className={s.text}>{description}</div>
						<p className={s.title}>Comics:</p>
						<ul className={s.list}>
							{comics.length === 0 ? (
								<li className={s.item}>No comics for this character</li>
							) : (
								comics.map(({ name }, i) => {
									// eslint-disable-next-line array-callback-return
									if (i > 9) return;

									return (
										<li key={name} className={s.item}>
											{name}
										</li>
									);
								})
							)}
						</ul>
					</>
				)}
			</>
		</div>
	);
};

export { CharInfo };
