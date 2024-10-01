import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";

import { useEffect, useState } from "react";

// Eternal Libraries
import axios from "axios";
import { useTranslation } from "react-i18next";

import moment from "moment";
import "moment/min/locales";

let cancelAxios = null;
export default function Card() {
  const { t, i18n } = useTranslation();

  // مش هتجبلكالثواني لانه عاوز استيت
  const [dateTime, setDateTime] = useState(moment().format("MMM Do YY"));

  const [temp, setTemp] = useState({});
  const [language, setLanguage] = useState("en");

  console.log("Rendring the component >> (( amounting ))");

  useEffect(() => {
    // moment.locale(language);
    // i18n.changeLanguage(language);

    setDateTime(moment().format("MMM Do YY"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.04&lon=30.47&appid=daf24f4a6e4dd9279c18d3b08dab1672",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const temp = Math.round(response.data.main.temp - 272.15);
        const tempMin = Math.round(response.data.main.temp_min - 272.15);
        const tempMax = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const imgResponse = response.data.weather[0].icon;
        setTemp({
          temp,
          tempMin,
          tempMax,
          description,
          img: imgResponse,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      console.log("cancling");
      cancelAxios();
    };
  }, []);

  function changeLanguage(text) {
    if (language === "ar") {
      setLanguage("en");
    } else {
      setLanguage("ar");
    }

    moment.locale(language);
    i18n.changeLanguage(language);
    setDateTime(moment().format("MMM Do YY"));
  }
  if (language === "ar") {
  } else {
    moment.locale("ar");
  }
  return (
    <Container
      maxWidth="sm"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {/* < Card > */}
      <div className="card">
        {/* <Title> */}
        <div
          className="card-title"
          style={{ direction: language === "en" ? "rtl" : "ltr" }}>
          <Typography fontWeight={600} variant="h2">
            {t("Egypt")}
            {/* egypt */}
          </Typography>
          <Typography variant="h5">{dateTime}</Typography>
        </div>
        {/* end </Title> */}

        <hr />

        {/* < Degree & Descitption > */}
        <div
          className="card-content"
          style={{ direction: language === "en" ? "rtl" : "ltr" }}>
          {/* Start Temp */}
          <div className="temp">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h2">{temp.temp}</Typography>
              <img
                src={`https://openweathermap.org/img/wn/${temp.img}@2x.png`}
                alt="description of weather"
              />

              {/* TODO: Temp Img  اي حاجه بتاجلها ابداها بككلمه تودو وسبلها مكان*/}
            </div>

            <Typography variant="h6">{temp.description}</Typography>
            {/* Min && Max Degree */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}>
              <h5>
                {t("lowest")} :{temp.tempMin}
              </h5>
              <h5>
                {t("heighst")} : {temp.tempMax}
              </h5>
            </div>
          </div>
          {/* End Temp */}

          <div className="description">
            <WbCloudyIcon style={{ fontSize: "200px" }} />
          </div>
        </div>
        {/* end </ Degree & Descitption > */}
        {/* end </ Card > */}
        <Button
          onClick={(e) => {
            changeLanguage(e.target);
          }}
          className="btn-language"
          variant="text">
          {language}
        </Button>
      </div>
    </Container>
  );
}
