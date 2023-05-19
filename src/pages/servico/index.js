import Adicionais from "./Adicionais";

import Modal from "../../components/Modal";
import Informacoes from "./Informacoes";
import Panel from "./Panel";
import Schedule from "../../components/Schedule";
import { useRouter } from "next/navigation";
import styles from "./NewProduct.module.sass";
import { useContext, useState } from "react";
import useHandleConfig from "@/hooks/useConfig";
import { useSelector } from "react-redux";
import { createServico } from "@/service/servicos";
import { AuthContext } from "@/context/auth";

const NewProduct = ({ ...props }) => {
  const service = useSelector((state) => state.service.service);
  const { user } = useContext(AuthContext);

  const pedido = [];

  const { config } = useHandleConfig();
  const [stale, setStale] = useState({ stale: false });

  const router = useRouter();

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [valorFinal, setValorFinal] = useState(pedido?.preco);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [agendar, setAgendar] = useState({ agendar: false, data: 0, hora: 0 });

  const [detalhes, setDetalhes] = useState({});

  const [adicionais, setAdicionais] = useState({});

  const [telefone, setTelefone] = useState("");

  let servAdicionais = JSON.stringify(adicionais.adicionais);

  function postAgendar(data) {
    setAgendar(data);
  }

  function postDetalhes(data) {
    setDetalhes(data);
  }

  function postAdicionais(data) {
    setAdicionais(data);
  }

  console.warn(service);

  const handlerOrder = async () => {
    if (!detalhes.norigin || !detalhes.ndestino) {
      let errorMsg = ", Preencha todos os campos para continuar: ";
      if (!detalhes.norigin) errorMsg += ", número de origem";
      if (!detalhes.ndestino) errorMsg += ", número de destino";

      console.warn("Atenção, ", errorMsg);
      setLoad(false);

      return;
    }
    const data = {
      endereco_origem: service.origin,
      endereco_destino: service.destination,
      servico: service.servico,
      frete_valor: parseFloat(service.preco),
      numero_origem: detalhes.norigin,
      numero_destino: detalhes.ndestino,
      detalhes_servico: detalhes?.descicao,
      status: "pendente",
      hours: service.hours,
      helpers: parseFloat(service.helpers),
      user_id: user?.$id,
      distancia: parseFloat(service.distance),
      mounters: 0,
      role: user?.id,
      book: false,
      rota: "",
      reference: "",
      user: [
        JSON.stringify({
          avatar: user?.prefs?.avatar,
          name: user?.name,
          phone: user?.phone,
          email: user?.email,
          $id: user?.$id,
        }),
      ],
      complemento: "Casa",

      foto_servico: service.image,
    };
    try {
      const response = await createServico(data, user.$id);
      if (response) {
        console.warn("Sucesso", "Pedido realizado com sucesso!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Informacoes PostDetalhes={postDetalhes} className={styles.card} />
          console.log(service)
          {service.id != 3 && (
            <Adicionais
              config={config}
              PostAdicionais={postAdicionais}
              postValorFinal={setValorFinal}
              valorFinal={valorFinal}
              className={styles.card}
              pedido={pedido}
            />
          )}
        </div>
      </div>

      <Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        PostServicos={handlerOrder}
      />

      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule
          startDate={startDate}
          PostAgendar={postAgendar}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
          PostServicos={handlerOrder}
        />
      </Modal>
    </>
  );
};

export default NewProduct;
