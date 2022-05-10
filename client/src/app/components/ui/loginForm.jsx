import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, getAuthErrors } from "../../store/user";

const LoginForm = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const loginError = useSelector(getAuthErrors());

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(login({ payload: data, redirect }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend></legend>
                <div className="form-group row">
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        error={errors.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        name="password"
                        value={data.password}
                        error={errors.password}
                        onChange={handleChange}
                    />
                    <CheckBoxField
                        name="stayOn"
                        value={data.stayOn}
                        onChange={handleChange}
                    >
                        Оставаться в системе
                    </CheckBoxField>
                    {loginError && <p className="text-danger">{loginError}</p>}
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        disabled={!isValid}
                    >
                        Войти
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default LoginForm;
