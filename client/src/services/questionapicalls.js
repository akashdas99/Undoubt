export const loadTopQuestions = () => {
    return fetch(`${process.env.REACT_APP_BACKEND}/questions`, { method: "GET" })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}
export const loadQuestionsByUid = (id) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/questions/${id}`, { method: "GET" })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}
export const questionById = id => {
    return fetch(`${process.env.REACT_APP_BACKEND}/question/${id}`, { method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}
//search questions
export const searchQuestion = question => {
    return fetch(`${process.env.REACT_APP_BACKEND}/search/questions/?q=${question}`, { method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}
export const answersByQuestionId = id => {
    return fetch(`${process.env.REACT_APP_BACKEND}/answers/${id}`, { method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}

export const addquestion = (question, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/question/`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                // "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: question
        }).then(response => (response.json()))
        .catch(err => console.log(err));
}
export const updatequestion = (questionId, authorId, question, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/question/${questionId}/${authorId}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                // "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: question
        }).then(response => (response.json()))
        .catch(err => console.log(err));
}
//delete
export const deletequestion = (questionId, authorId, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/question/${questionId}/${authorId}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then(response => (response.json()))
        .catch(err => console.log(err))
}