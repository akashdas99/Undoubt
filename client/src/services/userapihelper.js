export const userinfo = (id) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`, { method: "GET" })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}