import img from "resources/error.gif";

import s from "./errorMessage.module.scss";

const ErrorMessage = () => <img className={s.root} src={img} alt='error' />;

export { ErrorMessage };
