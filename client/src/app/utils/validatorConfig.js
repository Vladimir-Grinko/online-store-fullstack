export const validatorConfig = {
    name: {
        isRequired: {
            message: "Обязательно введите название"
        },
        min: {
            message: "Название должно состоять минимум из 3 символов",
            value: 3
        }
    },
    group: {
        isRequired: {
            message: "Обязательно выберите категорию"
        }
    },
    price: {
        isRequired: {
            message: "Стоимость обязательна для заполнения"
        },
        isNumber: {
            message: "Только цифровое значение"
        }
    },
    count: {
        isRequired: {
            message: "Допустимо только цифровое значение!"
        },
        isNumber: {
            message: "Только цифровое значение"
        }
    },
    image: {
        isRequired: {
            message: "Фотография товара обязательна"
        }
    },
    description: {
        isRequired: {
            message: "Добавьте описание"
        }
    }
};
