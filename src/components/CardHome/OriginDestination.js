import React, { useRef, useState } from "react";
import CardService from "../CardService";
import style from "./Imput.module.sass";
import Image from "next/image";
import Icon from "../Icons";
import useGetRoute from "@/utils/getRouter";
import { setService } from "@/context/serviceSlice";
import List from "../List";
import { CalendarMonthTwoTone, CancelOutlined, LocationDisabled } from "@mui/icons-material";
import { Divider, IconButton, Paper, styled } from "@mui/material";
import CardForm from "../CardForm";
import Servico from "../Servico";
import { debounce } from "lodash";
import cn from "classnames";
import CircleNotificationsSharpIcon from "@mui/icons-material/CircleNotificationsSharp";
const avatar = require("../../images/avatar.jpg");
import Modal from "./modal";
import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import CardHeader from "./CadTop";
import History from '../History'
const CardHome = (props) => {
    const { handleService, service, handleOpen, handleClose, appSlice, app, handleApp } = props



    const [suggestionsArray, setSuggestionsArray] = useState({ suggestions: [], isOpen: false, input: "" });
    const { location, origin, destination, destinationPlace, originPlace } = service


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        paddingBlock: theme.spacing(2),
        width: '100%',
        textAlign: "center",
        color: theme.palette.text.secondary,
        justifyContent: "space-around",
        alignItems: "center"
    }));

    const [activeKey, setActiveKey] = React.useState("0");

    const locationRef = useRef(null);
    const destinationRef = useRef(null);

    const [locationInput, setLocationInput] = useState({
        origin: "",
        destination: "",
        valueOrigin: originPlace,
        valueDestination: destinationPlace,
        inputType: ""
    });


    const lat = location ? location[1] : null
    const lng = location ? location[0] : null

    const handleRoute = debounce(async (data, input) => {
        if (!data || data.length < 1) {
            setSuggestionsArray({
                ...suggestionsArray,
                isOpen: false,
                suggestions: []
            });

            if (locationInput.inputType === "origin") {
                setService({ origin: null });
            } else {
                setService({ destination: null });
            }

            return;
        }

        if (data.length > 3) {
            const routeSuggestions = await useGetRoute(data, lng, lat);

            setSuggestionsArray({
                ...suggestionsArray,
                isOpen: true,
                suggestions: routeSuggestions,
                input: input
            });
        }
    }, 300);

    const handleSetOrigem = async (data) => {
        if (locationInput.inputType === "origin") {
            setLocationInput({
                ...locationInput,
                valueOrigin: data.properties.name
            });

            handleService({

                originPlace: data.properties.name,
                origin: [
                    data.properties.coordinates.longitude,
                    data.properties.coordinates.latitude
                ],
                latitude: data.properties.coordinates.longitude,
                longitude: data.properties.coordinates.latitude,
                boundingBoxOrigin: data.properties.bbox

            });

            setSuggestionsArray({
                ...suggestionsArray,
                suggestions: [],
                isOpen: false
            });

            destinationRef.current.focus();
        } else {
            setLocationInput({
                ...locationInput,
                valueDestination: data.properties.name
            });

            setSuggestionsArray({
                ...suggestionsArray,
                suggestions: [],
                isOpen: false
            });

            handleService({

                destinationPlace: data.properties.name,
                destination: [
                    data.properties.coordinates.longitude,
                    data.properties.coordinates.latitude
                ],
                latitude: data.properties.coordinates.longitude,
                longitude: data.properties.coordinates.latitude,
                boundingBoxDestination: data.properties.bbox,
            });
        }
    };

    const handleInputChange = (locationType, value) => {
        if (locationType === "origin") {
            setLocationInput({
                ...locationInput,
                valueOrigin: value,
                inputType: locationType
            });
            handleRoute(value, locationType);
        } else {
            setLocationInput({
                ...locationInput,
                valueDestination: value,
                inputType: locationType
            });
            handleRoute(value, locationType);
        }
    };

    const del = (input) => {
        if (input == "origin") {
            setLocationInput({
                ...locationInput,
                valueOrigin: ""
            });

            handleService({


                origin: null
            });
        } else {
            setLocationInput({
                ...locationInput,
                valueDestination: ""
            });
            handleService({

                destination: null
            });
        }
    };

    return (
        <div className={
            style.container
        }>
            <div className={style.row}>
              
              {
              /*  <Image src={require('../../images/location.svg')} />
              
            */
            }

                <div className={style.coll_input}>

                    <div className={style.origin}>



                        <input   
                                      placeholder="De Onde?"
                                      onChange={
                                          (e) => handleInputChange("origin", e.target.value)
                                      }
                                      value={
                                          locationInput.valueOrigin
                                      }
                                      ref={locationRef} type='text'  />
                        <Image src={require('../../images/calendar.svg')} />

                    </div>


             { /*      <div className={style.origin}>



                        <input ref={destinationRef}
                                      onChange={
                                          (e) => handleInputChange("destination", e.target.value)
                                      }
                                      value={
                                          locationInput.valueDestination
                                      } type='text' placeholder="Para onde? " />
                       

                    </div>
                
                
                */
                }

                </div>

            </div>


<div className={style.history}>

<History text={'Salvar a localização do seu trabalho'} label={'Trabalho'} icon={require('../../images/work.svg')}/>
<History text={'Salvar seu endereço'} label={'Casa'} icon={require('../../images/home.svg')}/>

</div>

           { /*
              <div data-isopen={app?.isOpen} className={
                      style["input--origem"]
                  }>
      
                      <div className={
                          style["address--conteiner-origem"]
                      }>
      
                          <Icon className={
                                  style["svgorigin--destino"]
                              }
                              name="originDestination"/>
                          <div className={
                              style["address"]
                          }>
                              <div style={
                                  {
                                      flexDirection: "row",
                                      display: "flex",
                                      width: "100%"
                                  }
                              }>
                                  <input className={
                                          style["input--address"]
                                      }
                                      onClick={()=>handleOpen()}
                                      placeholder="De Onde?"
                                      onChange={
                                          (e) => handleInputChange("origin", e.target.value)
                                      }
                                      value={
                                          locationInput.valueOrigin
                                      }
                                      ref={locationRef}/>
                                  <IconButton onClick={
                                      () => del("origin")
                                  }>
                                      <CancelOutlined/>
                                  </IconButton>
                              </div>
                              <div style={
                                  {
                                      borderTopColor: "gray",
                                      borderTopWidth: "1px",
                                      borderTopStyle: "solid",
                                      width: "100%",
                                      marginBlock: "10px",
                                      height: "1px"
                                  }
                              }/>
                              <div style={
                                  {
                                      flexDirection: "row",
                                      display: "flex",
                                      width: "100%"
                                  }
                              }>
                                  <input className={
                                          style["input--address"]
                                      }
                                      placeholder="Para onde?"
                                      ref={destinationRef}
                                      onChange={
                                          (e) => handleInputChange("destination", e.target.value)
                                      }
                                      value={
                                          locationInput.valueDestination
                                      }/>
      
                                  <IconButton onClick={
                                      () => del("destination")
                                  }>
                                      <CancelOutlined/>
                                  </IconButton>
                              </div>
                          </div>
      
                      </div>
      
                                </div>*/
                                }
              
              
            


            {
                suggestionsArray.isOpen && suggestionsArray.suggestions.map((suggestion, index) => (
                    <div key={index} data-isopen={app.isOpen} className={style.list}>
                        <List handleSetOrigem={handleSetOrigem}
                            suggestion={suggestion}
                            index={index}
                            input={
                                suggestionsArray.input
                            } />
                    </div>
                ))
            } </div>

    );
};

export default CardHome;
