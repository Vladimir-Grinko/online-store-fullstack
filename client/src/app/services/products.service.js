import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productsEndPoint = "product/";

const productsService = {
    get: async () => {
        const { data } = await httpService.get(productsEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(productsEndPoint, payload);
        return data;
    },
    update: async (content) => {
        const { data } = await httpService.patch(
            productsEndPoint + content._id,
            content
        );
        return data;
    },
    delete: async (productId) => {
        const { data } = await httpService.delete(productsEndPoint + productId);
        return data;
    }
};

export default productsService;
