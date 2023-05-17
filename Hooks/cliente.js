import api from "../Service/api";

export default async function Cliente(user, method) {
  if (method === "GET") {
    return await api
      .get("/cliente/" + user.id)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  } else if (method === "POST") {
    return await api
      .post("/cliente", user)
      .then(function (response) {
        localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
        localStorage.setItem(
          "user_iugu",
          JSON.stringify(response.data.iugu_id)
        );
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  } else if (method === "PUT") {
    return await api
      .put("/cliente", user.id)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  } else if (method === "DELETE") {
    return await api
      .delete("/cliente/" + user)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
