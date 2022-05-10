import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { signUp, getAuthErrors } from "../../store/user";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        licence: false
    });
    const [errors, setErrors] = useState({});
    const registerError = useSelector(getAuthErrors());

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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Иия должно состоять минимум из 3 символов",
                value: 3
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
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
        const newData = {
            ...data
        };
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(signUp({ payload: newData, redirect }));
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
                        label="Имя"
                        name="name"
                        value={data.name}
                        error={errors.name}
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
                        name="licence"
                        value={data.licence}
                        onChange={handleChange}
                        error={errors.licence}
                    >
                        Подтвердить <a>лицензионное соглашение</a>
                    </CheckBoxField>
                    {registerError && (
                        <p className="text-danger">{registerError}</p>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 mx-auto"
                        disabled={!isValid}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default RegisterForm;
