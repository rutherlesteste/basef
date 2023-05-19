import React, { useEffect, useState } from "react";

import Card from "../../../components/Card";
import Checkbox from "../../../components/Checkbox";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
const compatibility = [
  {
    id: "montador",
    title: "Montador",
  },
  {
    id: "Plastico bolha",
    title: "Plastico bolha",
  },
  {
    id: "Caixa",
    title: "Caixa",
  },
  {
    id: "embalagem",
    title: "embalagem",
  },
];

const Keys = {
  TAB: 9,
  SPACE: 32,
  COMMA: 188,
};

const CategoryAndAttibutes = ({
  config,
  className,
  postValorFinal,
  PostAdicionais,
  pedido,
  valorFinal,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const activeConfig = config;
  const delimiters = [Keys.COMMA, Keys.SPACE, Keys.TAB];

  const horasOptions = ["3", "4", "5", "6", "7", "8"];
  const ajudantesOptions = ["1", "2", "3", "4", "5", "6"];

  const [horas, setHoras] = useState("3");
  const [ajudantes, setAjudantes] = useState(ajudantesOptions[0]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const [tags, setTags] = React.useState([
    { id: "Cadeira", text: "Luminária" },
    { id: "Puff", text: "Puff" },
    { id: "Cortina", text: "Cortina" },
    { id: "Tv", text: "Tv" },
  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {};

  const onClearAll = () => {
    setTags([]);
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
  };

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

        {activeConfig && activeConfig.extras == 1 && (
          <>
            <div className={styles.label}>Serviços adicionais </div>

            <div className={styles.list}>
              {compatibility.map((x, index) => (
                <Checkbox
                  className={styles.checkbox}
                  content={x.title}
                  value={selectedFilters.includes(x.id)}
                  onChange={() => handleChange(x.id)}
                  key={index}
                />
              ))}
            </div>
            <div className={styles.head}>
              <div className={styles.label}>Tags</div>
              <div className={styles.counter}>
                <span>1</span>/12 tags
              </div>
            </div>

            <div className={styles.app}></div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
