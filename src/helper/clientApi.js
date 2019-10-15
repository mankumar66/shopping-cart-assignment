export const getPostRequest = (url, params) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: params.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

};
