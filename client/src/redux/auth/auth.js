export const BASE_URL = "https://api.kejero.diploma.nomoredomains.sbs";

const checkServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
};

export const getCurrentUserInfo = (token, headers) => {
    return fetch(`${BASE_URL}/users/me`, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
    }).then((res) => checkServerResponse(res));
}

export const postUserData = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then((res) => checkServerResponse(res));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((res) => checkServerResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            }
        });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => checkServerResponse(res));
};