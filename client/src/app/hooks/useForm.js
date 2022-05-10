import { useEffect, useState } from "react";
import { validatorConfig } from "../utils/validatorConfig";
import { validator } from "../utils/validator";

function useForm(initialData) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const onChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);

        return !Object.keys(errors).length;
    };

    const isValid = !Object.keys(errors).length;

    return [{ data, errors, isValid }, onChange];
}

export default useForm;
