import React, { useEffect, useState } from "react";

import Card from "../../../components/Card";
import Checkbox from "../../../components/Checkbox";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import { useSelector, useDispatch } from "react-redux";

const CategoryAndAttibutes = ({
  config,
  className,
  postValorFinal,
  PostAdicionais,
  pedido,
  valorFinal,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const horasOptions = ["3", "4", "5", "6", "7", "8"];
  const ajudantesOptions = ["1", "2", "3", "4", "5", "6"];

  const [horas, setHoras] = useState("3");
  const [ajudantes, setAjudantes] = useState(ajudantesOptions[0]);

  function valorFinal2() {
    let hora = parseInt(horas);
    let valorhora = 0;
    let ajudante = parseInt(ajudantes);
    let valorajudante = 0;
    let valorMontador = 0;

    if (hora > 3) {
      valorhora = 175 * (hora - 3);
    }

    if (ajudante > 1) {
      valorajudante = 100 * (ajudante - 1);
    }

    if (selectedFilters.includes("montador")) {
      valorMontador = 150;
    }

    const valor = valorhora + valorajudante + valorMontador + valorFinal;

    postValorFinal(valor);
    const adicionais = JSON.stringify(selectedFilters);
    PostAdicionais({
      horas: horas,
      ajudantes: ajudantes,
      adicionais: adicionais,
      montador: selectedFilters.includes("montador"),
    });
  }

  useEffect(() => {
    valorFinal2();
  }, [horas, ajudantes, selectedFilters]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Detalhes adicionais"
      classTitle="title-purple"
    >
      {pedido.id == 2 ? (
        <Dropdown
          className={styles.field}
          label="Horas"
          tooltip="escolha se precisar de horas adicionais"
          value={horas}
          setValue={setHoras}
          options={horasOptions}
        />
      ) : (
        <></>
      )}
      <div className={styles.images}>
        <Dropdown
          className={styles.field}
          label="Ajudantes"
          tooltip="Escolha a quantidade de ajudantes"
          value={ajudantes}
          setValue={setAjudantes}
          options={ajudantesOptions}
        />
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
