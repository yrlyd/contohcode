import axios from "axios";
const baseService = {
    get: (url, body, cbSuccess, cbFail) => {
        return axios
            .get(url, body)
            .then(response => {
                if (response.data.status < 400) {
                    try {
                        cbSuccess(response);
                    } catch (error) {
                        throw new Error(error);
                    }
                    return response;
                }
                throw new Error(response.data.errorMessage);
            })
            .catch(e => {
                try {
                    cbFail(e);
                } catch (error) {
                    console.error(e);
                    console.error(error);
                }
                return { isError: true };
            });
    },

    post: (url, body, cbSuccess, cbFail, additionalHeader = {}, msg) => {
        // const accessToken = JSON.parse(
        //   localStorage.getItem(window.localStorageUser)
        // ).access_token;

        // const accessToken = "askiellalmsleijlihae";

        const headers = {
            headers: {
                // Authorization: 'Bearer ' + accessToken,
                'Access-Control-Allow-Origin': "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",

          ...additionalHeader
            }
        };

        return axios
            .post(url, body, headers)
            .then(response => {
                if (response.data.status < 400) {
                    try {
                        if (typeof msg !== "undefined") {
                            cbSuccess(response, msg);
                        } else {
                            cbSuccess(response);
                        }
                    } catch (error) {
                        console.log("Error woy = " + error);
                        throw new Error(error);
                    }
                    return response;
                }
                throw new Error(response.data.errorMessage);
            })
            .catch(e => {
                try {
                    cbFail(e);
                } catch (error) {
                    console.log("ERROR WAY")
                    console.error(e.message);
                    console.error(error.message);
                }
                return { isError: true };
            });
    }
};

export default baseService;