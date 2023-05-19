import React, { useEffect, useState } from "react";

import Card from "../../../components/Cards";
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
    id: "Embalagem",
    title: "Embalagem",
  },
];

const Keys = {
  TAB: 9,
  SPACE: 32,
  COMMA: 188,
};

const CategoryAndAttibutes = ({
  pedido,
  className,
  postValorFinal,
  PostAdicionais,
  config,
  valorFinal,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [montador, setMontador] = useState(true);

  const [tags, setTags] = React.useState([
    { id: "Cadeira", text: "Luminária" },
    { id: "Puff", text: "Puff" },
    { id: "Cortina", text: "Cortina" },
    { id: "Tv", text: "Tv" },
  ]);

  const activeConfig = config;
  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const delimiters = [Keys.COMMA, Keys.SPACE, Keys.TAB];

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

  const ajudantesOptions = ["0", "1", "2", "3", "4", "5", "6"];

  const [ajudantes, setAjudantes] = useState(ajudantesOptions[0]);

  function valorFinal2() {
    let valorAjudante = parseInt(ajudantes) * 100;
    let valorMontador = 0;

    if (selectedFilters.includes("montador")) {
      valorMontador = 175;
    }

    const valor = valorAjudante + valorMontador + valorFinal;

    PostAdicionais({
      ajudantes: ajudantes,
      montador: montador,
      adicionais: selectedFilters,
    });

    postValorFinal(valor);
  }

  useEffect(() => {
    valorFinal2();
  }, [ajudantes, selectedFilters]);

  const itens = tags.map((item) => {
    return item.id;
  });

  localStorage.setItem("itens", JSON.stringify(itens));
  return (
    <Card
      className={cn(styles.card, className)}
      title="Detalhes adicionais"
      classTitle="title-purple"
    >
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
            <div className={styles.label}>
              Serviços adicionais{" "}
              <Tooltip
                className={styles.tooltip}
                title="Selecione se precisar de servoços adicionais"
                icon="info"
                place="right"
              />
            </div>
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
              <div className={styles.label}>
                Tags{" "}
                <Tooltip
                  className={styles.tooltip}
                  title="Maximum 100 characters. No HTML or emoji allowed"
                  icon="info"
                  place="right"
                />
              </div>
              <div className={styles.counter}>
                <span>1</span>/12 tags
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
