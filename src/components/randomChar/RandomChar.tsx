import { useQuery } from "@tanstack/react-query";

import { RandomTextBox } from "components/randomChar/randomTextBox";
import { RandomCharBox } from "components/randomChar//randomCharBox";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";

import { useMarvelService } from "hooks/useMarvelService";

import s from "./randomChar.module.scss";

const RandomChar = () => {
	const { getChar } = useMarvelService();

	const { data, refetch, isFetching, isSuccess, isLoading, error } = useQuery(
		["randomchar"],
		() => getChar(Math.floor(Math.random() * (1011400 - 1011000) + 1011000)),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			refetchInterval: 100000,
		}
	);

	return (
		<div className={s.root}>
			<>
				{isSuccess && data && !isFetching && !isLoading && <RandomCharBox char={data} />}
				{(isLoading || isFetching) && <Spinner />}
				{error && <ErrorMessage />}
			</>

			<RandomTextBox onClick={refetch} />
		</div>
	);
};

export { RandomChar };
