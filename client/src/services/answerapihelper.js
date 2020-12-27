export const getanswerbyid = (id) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/answer/${id}`,
        {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}

export const getanswerbyuserid = (id) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/user/answers/${id}`,
        {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}


export const addanswer = (id, answer, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/answer/${id}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                // "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: answer
        }).then(response => (response.json()))
        .catch(err => console.log(err));
}
export const updateanswer = (answerId, authorId, answer, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/answer/${answerId}/${authorId}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                // "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: answer
        }).then(response => (response.json()))
        .catch(err => console.log(err));
}

export const deleteanswer = (answerId, authorId, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/answer/${answerId}/${authorId}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then(response => (response.json()))
        .catch(err => console.log(err))
}