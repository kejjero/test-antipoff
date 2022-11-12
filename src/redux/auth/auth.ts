import {authInfoType, userInfoType, tokenType} from "../../assets/types";
import {AUTH_API} from "../../utils/constants";

// Изначально авторизация была на редаксе, но потом переписал в текущий вид.
// Если делать через asyncThunk, то придется сохранять пароль в стейт(useEffect / async),
// а это думаю не есть правильно для безопасности пользователя.

const checkServerResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
};

export const getCurrentUserInfo = (token: tokenType) => {
    return fetch(`${AUTH_API}/users/me`, {
        headers: {Authorization: `Bearer ${token}` },
    }).then((res) => checkServerResponse(res));
}

export const postUserData = (userData: userInfoType) => {
    return fetch(`${AUTH_API}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    }).then((res) => checkServerResponse(res));
};

export const authorize = (dataAuth: authInfoType) => {
    return fetch(`${AUTH_API}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataAuth),
    })
        .then((res) => checkServerResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            }
        });
};