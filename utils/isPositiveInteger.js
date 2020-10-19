import {NUM_CHARS} from "../constants/numChars";

const isPositiveInteger = (str) => {
    const trimmedStr = str.trim();

    if (trimmedStr === '') return false;

    const trimmedStrArr = Array.from(trimmedStr);

    return trimmedStrArr.every(el => NUM_CHARS.includes(el));
}

export default isPositiveInteger;
