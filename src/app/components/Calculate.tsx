"use client";

import { useEffect, useState } from "react";
import CristalBlock from "./CristalBlock";
import CraftProfit from "./CraftProfit";
import GradeBlock from "./GradeBlock";
import { Data } from "../types";
import { initData } from "../constants";

// const SoPPrice = 6000;
// const gem_C = 3150;
// const gem_B = 10500;
// const best_gloves_for_DX_COST = 16100;
// const best_gloves_DX_count = 30;

// const elven_sword_cost = 743500;

// const shop_buy_miltiplier = 1.1;

const SOUL_ORE_SSD_CRAFT_COST = 3;
const SSD_PER_ONE_CRAFT = 156;

const SPIRIT_ORE_BSSD_CRAFT_COST = 8;
const BSSD_PER_ONE_CRAFT = 100;

const SOUL_ORE_SSC_CRAFT_COST = 15;
const SSC_PER_ONE_CRAFT = 476;

const SPIRIT_ORE_BSSC_CRAFT_COST = 30;
const BSSC_PER_ONE_CRAFT = 200;

const SOUL_ORE_SSB_CRAFT_COST = 54;
const SSB_PER_ONE_CRAFT = 450;

const SPIRIT_ORE_BSSB_CRAFT_COST = 16;
const BSSB_PER_ONE_CRAFT = 100;

const SOUL_ORE_SSA_CRAFT_COST = 36;
const SSA_PER_ONE_CRAFT = 300;

const SPIRIT_ORE_BSSA_CRAFT_COST = 70;
const BSSA_PER_ONE_CRAFT = 200;

const SOUL_ORE_PER_ONE_IC = 100 / 3;
const SPIRIT_ORE_PER_ONE_IC = 100 / 5;

const SSD_CRAFTS_PER_ONE_IC = SOUL_ORE_PER_ONE_IC / SOUL_ORE_SSD_CRAFT_COST;
const BSSD_CRAFTS_PER_ONE_IC =
  SPIRIT_ORE_PER_ONE_IC / SPIRIT_ORE_BSSD_CRAFT_COST;

const SSC_CRAFTS_PER_ONE_IC = SOUL_ORE_PER_ONE_IC / SOUL_ORE_SSC_CRAFT_COST;
const BSSC_CRAFTS_PER_ONE_IC =
  SPIRIT_ORE_PER_ONE_IC / SPIRIT_ORE_BSSC_CRAFT_COST;

const SSB_CRAFTS_PER_ONE_IC = SOUL_ORE_PER_ONE_IC / SOUL_ORE_SSB_CRAFT_COST;
const BSSB_CRAFTS_PER_ONE_IC =
  SPIRIT_ORE_PER_ONE_IC / SPIRIT_ORE_BSSB_CRAFT_COST;

const SSA_CRAFTS_PER_ONE_IC = SOUL_ORE_PER_ONE_IC / SOUL_ORE_SSA_CRAFT_COST;
const BSSA_CRAFTS_PER_ONE_IC =
  SPIRIT_ORE_PER_ONE_IC / SPIRIT_ORE_BSSA_CRAFT_COST;

// const cxCostCalculation = (dxCost: number) => {
//   return (elven_sword_cost * shop_buy_miltiplier * 2 + dxCost * 54) / 602;
// };

// const bxCostCalculation = (dxCost: number, cxCost: number) => {
//   const sword_of_delusion = cxCost * 1075 + dxCost * 5375;
//   const priceBDual = sword_of_delusion * 2 + 45 * SoPPrice;
//   return priceBDual / 891;
// };

export default function Calculate() {
  const [armD, setArmD] = useState(6500);
  const [armC, setArmC] = useState(16620);
  const [armB, setArmB] = useState(100000);

  const [wipD, setWipD] = useState(53100);
  const [wipC, setWipC] = useState(124650);
  const [wipB, setWipB] = useState(500000);

  const [data, setData] = useState<Data>(initData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data").then(async res => {
      setData(await res.json());
      setLoading(false);
    });
  }, []);

  const updateData = (value: number, first: string, second?: string) => {
    const newData = JSON.parse(JSON.stringify(data));

    if (second) {
      newData[first][second] = value;
    } else {
      newData[first] = value;
    }

    setData(newData);

    fetch("/api/data", {
      method: "post",
      body: JSON.stringify(newData),
    });
  };

  const ssdCraftCost =
    (data.soulOre * SOUL_ORE_SSD_CRAFT_COST + data.dGrade.cristal) /
    SSD_PER_ONE_CRAFT;
  const bssdCraftCost =
    (data.spiritOre * SPIRIT_ORE_BSSD_CRAFT_COST + data.dGrade.cristal * 2) /
    BSSD_PER_ONE_CRAFT;

  const sscCraftCost =
    (data.soulOre * SOUL_ORE_SSC_CRAFT_COST + data.cGrade.cristal) /
    SSC_PER_ONE_CRAFT;
  const bsscCraftCost =
    (data.spiritOre * SPIRIT_ORE_BSSC_CRAFT_COST + data.cGrade.cristal * 2) /
    BSSC_PER_ONE_CRAFT;

  const ssbCraftCost =
    (data.soulOre * SOUL_ORE_SSB_CRAFT_COST + data.bGrade.cristal) /
    SSB_PER_ONE_CRAFT;
  const bssbCraftCost =
    (data.spiritOre * SPIRIT_ORE_BSSB_CRAFT_COST + data.bGrade.cristal * 2) /
    BSSB_PER_ONE_CRAFT;

  const ssaCraftCost =
    (data.soulOre * SOUL_ORE_SSA_CRAFT_COST + data.aGrade.cristal) /
    SSA_PER_ONE_CRAFT;
  const bssaCraftCost =
    (data.spiritOre * SPIRIT_ORE_BSSA_CRAFT_COST + data.aGrade.cristal * 2) /
    BSSA_PER_ONE_CRAFT;

  const ssdCraftProfit =
    (data.dGrade.soulshotSell - ssdCraftCost) / ssdCraftCost;
  const bssdCraftProfit =
    (data.dGrade.spiritshotSell - bssdCraftCost) / bssdCraftCost;
  const sscCraftProfit =
    (data.cGrade.soulshotSell - sscCraftCost) / sscCraftCost;
  const bsscCraftProfit =
    (data.cGrade.spiritshotSell - bsscCraftCost) / bsscCraftCost;
  const ssbCraftProfit =
    (data.bGrade.soulshotSell - ssbCraftCost) / ssbCraftCost;
  const bssbCraftProfit =
    (data.bGrade.spiritshotSell - bssbCraftCost) / bssbCraftCost;
  const ssaCraftProfit =
    (data.aGrade.soulshotSell - ssaCraftCost) / ssaCraftCost;
  const bssaCraftProfit =
    (data.aGrade.spiritshotSell - bssaCraftCost) / bssaCraftCost;

  const calculateSSDICProfit = () => {
    return (
      (data.dGrade.soulshotSell - ssdCraftCost) *
      SSD_PER_ONE_CRAFT *
      SSD_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSDICProfit = () => {
    return (
      (data.dGrade.spiritshotSell - bssdCraftCost) *
      BSSD_PER_ONE_CRAFT *
      BSSD_CRAFTS_PER_ONE_IC
    );
  };

  const calculateSSCICProfit = () => {
    return (
      (data.cGrade.soulshotSell - sscCraftCost) *
      SSC_PER_ONE_CRAFT *
      SSC_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSCICProfit = () => {
    return (
      (data.cGrade.spiritshotSell - bsscCraftCost) *
      BSSC_PER_ONE_CRAFT *
      BSSC_CRAFTS_PER_ONE_IC
    );
  };

  const calculateSSBICProfit = () => {
    return (
      (data.bGrade.soulshotSell - ssbCraftCost) *
      SSB_PER_ONE_CRAFT *
      SSB_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSBICProfit = () => {
    return (
      (data.bGrade.spiritshotSell - bssbCraftCost) *
      BSSB_PER_ONE_CRAFT *
      BSSB_CRAFTS_PER_ONE_IC
    );
  };

  const calculateSSAICProfit = () => {
    return (
      (data.aGrade.soulshotSell - ssaCraftCost) *
      SSA_PER_ONE_CRAFT *
      SSA_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSAICProfit = () => {
    return (
      (data.aGrade.spiritshotSell - bssaCraftCost) *
      BSSA_PER_ONE_CRAFT *
      BSSA_CRAFTS_PER_ONE_IC
    );
  };

  if (loading) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="mb-1 border-2 border-solid border-black">
        Spirit Ore Cost:
        <input
          onChange={e => updateData(Number(e.target.value), "spiritOre")}
          type="number"
          value={data.spiritOre}
        />
        Soul Ore Cost:
        <input
          onChange={e => updateData(Number(e.target.value), "soulOre")}
          type="number"
          value={data.soulOre}
        />
      </div>
      <div className="mb-1 flex flex-wrap gap-2">
        <GradeBlock borderColor="blue">
          <CristalBlock
            armAdenCost={1500}
            armCost={armD}
            armICCost={5}
            cristalCost={data.dGrade.cristal}
            cristalLabel={"Dx"}
            cristalPerArm={11}
            cristalPerWip={90}
            setArmCost={setArmD}
            setCristalCost={value => updateData(value, "dGrade", "cristal")}
            setWipCost={setWipD}
            wipAdenCost={7500}
            wipCost={wipD}
            wipICCost={10}
          />
          <CraftProfit
            blessedSpiritshotCraftCost={bssdCraftCost}
            blessedSpiritshotCraftProfit={bssdCraftProfit}
            blessedSpiritshotSellCost={data.dGrade.spiritshotSell}
            borderColor="blue"
            calculateBlessedSpiritshotICProfit={calculateBSSDICProfit}
            calculateSoulshotsICProfit={calculateSSDICProfit}
            label={"D"}
            setBlessedSpiritshotSellCost={value =>
              updateData(value, "dGrade", "spiritshotSell")
            }
            setSoulshotsSellCost={value =>
              updateData(value, "dGrade", "soulshotSell")
            }
            soulshotsCraftCost={ssdCraftCost}
            soulshotsCraftProfit={ssdCraftProfit}
            soulshotsSellCost={data.dGrade.soulshotSell}
          />
        </GradeBlock>

        <GradeBlock borderColor="green">
          <CristalBlock
            armAdenCost={7500}
            armCost={armC}
            armICCost={10}
            cristalCost={data.cGrade.cristal}
            cristalLabel={"Cx"}
            cristalPerArm={6}
            cristalPerWip={45}
            setArmCost={setArmC}
            setCristalCost={value => updateData(value, "cGrade", "cristal")}
            setWipCost={setWipC}
            wipAdenCost={25000}
            wipCost={wipC}
            wipICCost={15}
          />
          <CraftProfit
            blessedSpiritshotCraftCost={bsscCraftCost}
            blessedSpiritshotCraftProfit={bsscCraftProfit}
            blessedSpiritshotSellCost={data.cGrade.spiritshotSell}
            borderColor="green"
            calculateBlessedSpiritshotICProfit={calculateBSSCICProfit}
            calculateSoulshotsICProfit={calculateSSCICProfit}
            label={"C"}
            setBlessedSpiritshotSellCost={value =>
              updateData(value, "cGrade", "spiritshotSell")
            }
            setSoulshotsSellCost={value =>
              updateData(value, "cGrade", "soulshotSell")
            }
            soulshotsCraftCost={sscCraftCost}
            soulshotsCraftProfit={sscCraftProfit}
            soulshotsSellCost={data.cGrade.soulshotSell}
          />
        </GradeBlock>

        <GradeBlock borderColor="red">
          <CristalBlock
            armAdenCost={25000}
            armCost={armB}
            armICCost={25}
            cristalCost={data.bGrade.cristal}
            cristalLabel={"Bx"}
            cristalPerArm={11}
            cristalPerWip={67}
            setArmCost={setArmB}
            setCristalCost={value => updateData(value, "bGrade", "cristal")}
            setWipCost={setWipB}
            wipAdenCost={50000}
            wipCost={wipB}
            wipICCost={35}
          />
          <CraftProfit
            blessedSpiritshotCraftCost={bssbCraftCost}
            blessedSpiritshotCraftProfit={bssbCraftProfit}
            blessedSpiritshotSellCost={data.bGrade.spiritshotSell}
            borderColor="red"
            calculateBlessedSpiritshotICProfit={calculateBSSBICProfit}
            calculateSoulshotsICProfit={calculateSSBICProfit}
            label={"B"}
            setBlessedSpiritshotSellCost={value =>
              updateData(value, "bGrade", "spiritshotSell")
            }
            setSoulshotsSellCost={value =>
              updateData(value, "bGrade", "soulshotSell")
            }
            soulshotsCraftCost={ssbCraftCost}
            soulshotsCraftProfit={ssbCraftProfit}
            soulshotsSellCost={data.bGrade.soulshotSell}
          />
        </GradeBlock>

        <GradeBlock borderColor="grey">
          <CristalBlock
            armAdenCost={1500}
            armCost={armD}
            armICCost={5}
            cristalCost={data.aGrade.cristal}
            cristalLabel={"Ax"}
            cristalPerArm={11}
            cristalPerWip={90}
            setArmCost={setArmD}
            setCristalCost={value => updateData(value, "aGrade", "cristal")}
            setWipCost={setWipD}
            wipAdenCost={7500}
            wipCost={wipD}
            wipICCost={10}
          />

          <CraftProfit
            blessedSpiritshotCraftCost={bssaCraftCost}
            blessedSpiritshotCraftProfit={bssaCraftProfit}
            blessedSpiritshotSellCost={data.aGrade.spiritshotSell}
            borderColor="grey"
            calculateBlessedSpiritshotICProfit={calculateBSSAICProfit}
            calculateSoulshotsICProfit={calculateSSAICProfit}
            label={"A"}
            setBlessedSpiritshotSellCost={value =>
              updateData(value, "aGrade", "spiritshotSell")
            }
            setSoulshotsSellCost={value =>
              updateData(value, "aGrade", "soulshotSell")
            }
            soulshotsCraftCost={ssaCraftCost}
            soulshotsCraftProfit={ssaCraftProfit}
            soulshotsSellCost={data.aGrade.soulshotSell}
          />
        </GradeBlock>
      </div>
    </div>
  );
}
