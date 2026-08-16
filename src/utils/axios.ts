import axios from "axios";
import { AXIOS_TIMEOUT_CODE } from "../constants";

/** True when the axios error is a request timeout (ECONNABORTED). */
export const isTimeout = (err: unknown): boolean =>
  axios.isAxiosError(err) && err.code === AXIOS_TIMEOUT_CODE;
