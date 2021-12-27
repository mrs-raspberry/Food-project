const postForm = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        }, //убрать, если formData
        /* body: dataBody,//вернуть, если formData */
        body: data,
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not get data from ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postForm};
export {getResource};