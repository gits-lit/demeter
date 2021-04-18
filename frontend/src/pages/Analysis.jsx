import FireRisk from "components/FireRisk";
import Pollen from "components/Pollen";
import WaterVapor from "components/WaterVapor";
import SoilTemp from "components/SoilTemp"
import SoilMoisture from "components/SoilMoisture"
import "./wow.scss"

const Analysis = () => {
  return (
    <div>
        <h1>Location Analysis</h1>
        <div className="row">
            <SoilTemp/>
            <SoilMoisture/>
            <WaterVapor/>
            <FireRisk/>
            <Pollen/>
        </div>
    </div>
  )
};

export default Analysis;
