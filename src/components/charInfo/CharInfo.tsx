import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { Skeleton } from "components/skeleton";
import { Image } from "components/common/image";
import { Button } from "components/common/button";

import { useGetCharQuery } from "hooks/useQueries";

import s from "./charInfo.module.scss";

interface CharInfoProps {
	charId: number | null;
}

const CharInfo = ({ charId }: CharInfoProps) => {
	const { data, isFetching, isLoading, error, isSuccess } = useGetCharQuery(charId);

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
							<Image src={thumbnail} className={s.img} altText={name} />
							<div className={s.innerContainer}>
								<div className={s.head}>{name}</div>
								<div className={s.btns}>
									<Button isMain href={homepage}>
										homepage
									</Button>
									<Button isSecondary href={wiki}>
										wiki
									</Button>
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
