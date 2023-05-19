import CategoryAndAttibutes from "./CategoryAndAttibutes";
import Frete from "./Frete";
import Modal from "../../components/Modal";
import NameAndDescription from "./NameAndDescription";
import Panel from "./Panel";
import Preview from "./Preview";
import Schedule from "../../components/Schedule";
import { formatPrice } from "../../utils";
import { useRouter } from "next/navigation";
import styles from "./NewProduct.module.sass";
import { useState } from "react";
import { Alert } from "@mui/material";
import useHandleConfig from "@/hooks/useConfig";
import useHandleService from "@/hooks/useService";


const NewProduct = ({ ...props }) => {
  const pedido = [];
  const { service } = props;

  const { config } = useHandleConfig();
  const [stale, setStale] = useState({ stale: false });

  const router = useRouter();

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [valorFinal, setValorFinal] = useState(pedido?.preco);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [agendar, setAgendar] = useState({ agendar: false, data: 0, hora: 0 });
 
  const {user} = useHandleService()




  const userName = "rutherles";
  const userId = "rutherles";
  const perfil = "perfil";

  const [detalhes, setDetalhes] = useState({});
  const [adicionais, setAdicionais] = useState({});
  const [telefone, setTelefone] = useState("");

  const name = userName.split(" ").slice(0, 2);

  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState("");
  let servAdicionais = JSON.stringify(adicionais.adicionais);
  const [alertMessage, setAlertMessage] = useState("");

  async function postServicos() {
    if (!detalhes.telefone || !detalhes.norigin || !detalhes.ndestino) {
      setStatus("error");
      handleAlert("Preencha todos os campos!");
      return;
    }

    try {
      const servico = {
        endereco_origem: pedido.origin,
        endereco_destino: pedido.end,
        servico: pedido.title,
        userName: name.join(" "),
        foto_user: perfil,
        frete_valor: valorFinal,
        numero_origem: detalhes.norigin,
        numero_destino: detalhes.ndestino,
        detalhes_servico: detalhes.descicao,
        status: "pendente",
        status_pagamento: "pendente",
        hora: adicionais.horas,
        extra: servAdicionais,
        helpers: parseInt(adicionais.ajudantes),
        user_id: userId,
        adicionais: servAdicionais,
        itens: detalhes?.itens,
        foto_servico: pedido.image,
        distancia: pedido.distancia,
        agendamento: startDate
          ? moment(startDate).format("DD/MM/YY") +
            " " +
            moment(startTime).format("h:mm")
          : null,
      };

      console.log("Adding Todo");

      try {
        await createServico(servico, userId);

        router.push({
          pathname: `/servicos`,
        });
      } catch (e) {
        console.error("Error in adding todo");
      }
    } catch (error) {
      console.warn(error);
    }
  }

  function postAgendar(data) {
    setAgendar(data);
  }

  function postDetalhes(data) {
    setDetalhes(data);
  }

  function postAdicionais(data) {
    setAdicionais(data);
  }

  const handleAlert = (data) => {
    setAlertMessage(data);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <NameAndDescription
            PostDetalhes={postDetalhes}
            className={styles.card}
          />
          {service?.id == 2 ? (
            <CategoryAndAttibutes
              config={config}
              PostAdicionais={postAdicionais}
              postValorFinal={setValorFinal}
              valorFinal={valorFinal}
              className={styles.card}
              pedido={pedido}
            />
          ) : (
            <></>
          )}

          {service?.id == 1 ? (
            <Frete
              config={config}
              PostAdicionais={postAdicionais}
              postValorFinal={setValorFinal}
              pedido={pedido}
              valorFinal={valorFinal}
              className={styles.card}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        PostServicos={postServicos}
      />

      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule
          startDate={startDate}
          PostAgendar={postAgendar}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
          PostServicos={postServicos}
        />
      </Modal>
    </>
  );
};

export default NewProduct;
