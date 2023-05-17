import api from "../Service/api";
export default async function FaturaStatus(fatura_id) {


 await api
   .post("/cliente", { fatura_id: fatura_id })
   .then(function (response) {
     //console.log(response.data);
      localStorage.setItem("fatura_status", response.data.faturastatus);
   })
   .catch(function (error) {
     console.error(error);
   });



  
}
