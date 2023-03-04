export const userinfo = (id) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const userUpdate = (id, user, token) => {
  console.log(user);
  return fetch(`${process.env.REACT_APP_BACKEND}/user/update/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
