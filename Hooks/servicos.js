import api from "../Service/api";

export default async function PostServicos(
  servico,method
) {

  if (method === "GET") {
    return await api
      .get("/servicos/" + servico.id)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  } else if (method === "POST") {
    return await api
      .post("/servicos", servico)
      .then(function (response) {
        //console.log(response.data);
        localStorage.setItem("fatura_id", JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
       
  } else if (method === "PUT") {
    return await api
      .put("/servicos", servico)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

  } else if (method === "DELETE") {
    return await api
      .delete("/servicos/" + servico.id)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });


  }
   


  
}
