import { RandomTextBox } from "components/randomChar/randomTextBox";
import { RandomCharBox } from "components/randomChar//randomCharBox";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";

import { useGetRandomCharQuery } from "hooks/useQueries";

import s from "./randomChar.module.scss";

const RandomChar = () => {
	const { data, refetch, isFetching, isSuccess, isLoading, error } = useGetRandomCharQuery();

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
