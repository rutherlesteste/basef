import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "./Card.module.sass";
import { formatPrice } from "@/utils";
import { createTheme } from "@mui/material/styles";
import Avatar from "../Avatar";
import { StatelessAccordion, Panel } from "baseui/accordion";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HailIcon from "@mui/icons-material/Hail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Button } from "@mui/material";
export default (props) => {

const { config, handleService, service } = props

  const { distance , step} = service;

  const valor = (id, value_km, value_base, value_helpers, value_hours) => {
    if (id == 3) {
      return distance < 6 ? 9 : distance * value_km;
    } else if (id == 1) {
      return value_base + distance * value_km + 1 * value_helpers;
    } else {
      return value_hours * 3 + 1 * value_helpers + 1 * value_hours;
    }
  };

  console.log(service);

  function updateService(
    id,
    servico,
    image,
    image2,
    preco,
    helpers,
    hours,
    value_helpers,
    value_hours
  ) {

    handleService({
      id,
      servico,
      image,
      image2,
      value: preco,
      preco: preco,
      helpers,
      hours,
      value_helpers,
      value_hours,
    });

  }

  const [expanded, setExpanded] = React.useState([1, 2, 3]);
console.log(expanded[0])
  return (
    <>
      <div className={styles["card-container"]}>
        {config.map((item, index) => (
          <div  key={index} className={styles.card}>
            <Avatar src={item.image2} expanded={expanded[0] == item.id ? '#276EF1' : "#6F767E" } />
            <div onClick={() =>
            updateService(
              item.id,
              item.service,
              item.image,
              item.image2,
              valor(
                item.id,
                item.value_km,
                item.value_base,
                item.value_helpers,
                item.value_hours
              ),
              item.helpers,
              item.hours,
              item.value_helpers,
              item.value_hours
            )
          } className={styles.coll1}>
              <div className={styles.row}>
                <h3>{item.description} </h3>
                <h3 style={{ fontSize: 14 }}>
                  {formatPrice(
                    valor(
                      item.id,
                      item.value_km,
                      item.value_base,
                      item.value_helpers,
                      item.value_mounters,
                      item.value_hours
                    )
                  )}
                </h3>
              </div>
              <div className={styles.row}>
                <StatelessAccordion
                  expanded={expanded}
                  onChange={({ key, expanded }) => {
                    console.log(key);
                    setExpanded(expanded);
                  }}
                  accordion
                  overrides={{
                    Header: {
                      style: ({ $theme }) => ({
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        fontFstyle: "normal",
                        fontWeight: 400,
                        lineHeight: "12px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }),
                    },
                    Content: {
                      style: ({ $theme }) => ({
                        padding: "0px",
                      }),
                    },
                  }}
                >

                  <Panel key={item.id} title={item.detalhes}>
                    {item.id == 2 && (
<>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          icon={<AccessTimeIcon />}
                          size="small"
                          label="5h"
                          variant="outlined"
                        />
                        <Chip
                          icon={<HailIcon />}
                          size="small"
                          label="1 Ajudante"
                          variant="outlined"
                        />
                      </Stack>

<div
style={{
  fontSize: 10,
  paddingBlock: 5,
  marginBlock: "1%",
}}
>
<span
  style={{
    fontSize: 10,
    paddingBlock: 5,
    marginBlock: "1%",
    display: "flex",
    alignSelf: "flex-start",
  }}
>
  personalizável de acordo com suas necessidades
</span>
</div>
</>           )}
                
                  </Panel>
                </StatelessAccordion>
              </div>
            </div>
          </div>
        ))}
      </div>
<div className={styles.button}>
     {expanded.length == 1 &&  step == 2 ?(<Button  size="large" sx={{width:'80%'}} variant="contained">Solicitar {service.servico}</Button>) : <span className="title-sub">Escolha o serviço </span>}
    </div>
    </>
  );
};
