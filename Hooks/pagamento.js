import api from "../Service/api";

export default async function Cliente(frete_valor, userName, email, customer_id,servico) {
console.log("frete_valor", frete_valor, "userName", userName, "email", email, "customer_id", customer_id , "servico",servico);

   await api
     .post("/pagamento", {
       frete_valor: frete_valor,
       userName: userName,
       email: email,
       customer_id: customer_id,
       servico: servico,
     })
     .then(function (response) {
       console.log(response.data);
       localStorage.setItem("fatura", response.data.fatura);
       localStorage.setItem("fatura_id", response.data.fatura_id);
     })
     .catch(function (error) {
       console.error(error);
     });




  
}
