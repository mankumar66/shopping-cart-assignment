export const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
};
export const postRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
};
