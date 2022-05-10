import { useState } from "react";

const useValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const cangedValue = () => setValue(!value);

    return [value, cangedValue];
};

export default useValue;
