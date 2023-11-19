"use client";

import { useEffect, useState } from "react";
import CristalBlock from "./CristalBlock";
import CraftProfit from "./CraftProfit";
import GradeBlock from "./GradeBlock";

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

  const [ssdSellCost, setSsdSellCost] = useState(11);
  const [bssdSellCost, setBssdSellCost] = useState(52);

  const [sscSellCost, setSscSellCost] = useState(13);
  const [bsscSellCost, setBsscSellCost] = useState(91);

  const [ssbSellCost, setSsbSellCost] = useState(47);
  const [bssbSellCost, setBssbSellCost] = useState(305);

  const [ssaSellCost, setSsaSellCost] = useState(55);
  const [bssaSellCost, setBssaSellCost] = useState(215);

  const [spiritOreCost, setSpiritOreCost] = useState(200);
  const [soulOreCost, setSoulOreCost] = useState(125);

  const [dxCost, setDxCost] = useState(
    590,
    // (best_gloves_for_DX_COST * shop_buy_miltiplier) / best_gloves_DX_count,
  );
  const [cxCost, setCxCost] = useState(2400);
  const [bxCost, setBxCost] = useState(6500);
  const [axCost, setAxCost] = useState(5500);

  useEffect(() => {
    // setCxCost(cxCostCalculation(dxCost));
    // setBxCost(bxCostCalculation(dxCost, cxCost));
  }, [dxCost, cxCost]);

  const ssdCraftCost =
    (soulOreCost * SOUL_ORE_SSD_CRAFT_COST + dxCost) / SSD_PER_ONE_CRAFT;
  const bssdCraftCost =
    (spiritOreCost * SPIRIT_ORE_BSSD_CRAFT_COST + dxCost * 2) /
    BSSD_PER_ONE_CRAFT;

  const sscCraftCost =
    (soulOreCost * SOUL_ORE_SSC_CRAFT_COST + cxCost) / SSC_PER_ONE_CRAFT;
  const bsscCraftCost =
    (spiritOreCost * SPIRIT_ORE_BSSC_CRAFT_COST + cxCost * 2) /
    BSSC_PER_ONE_CRAFT;

  const ssbCraftCost =
    (soulOreCost * SOUL_ORE_SSB_CRAFT_COST + bxCost) / SSB_PER_ONE_CRAFT;
  const bssbCraftCost =
    (spiritOreCost * SPIRIT_ORE_BSSB_CRAFT_COST + bxCost * 2) /
    BSSB_PER_ONE_CRAFT;

  const ssaCraftCost =
    (soulOreCost * SOUL_ORE_SSA_CRAFT_COST + axCost) / SSA_PER_ONE_CRAFT;
  const bssaCraftCost =
    (spiritOreCost * SPIRIT_ORE_BSSA_CRAFT_COST + axCost * 2) /
    BSSA_PER_ONE_CRAFT;

  const ssdCraftProfit = (ssdSellCost - ssdCraftCost) / ssdCraftCost;
  const bssdCraftProfit = (bssdSellCost - bssdCraftCost) / bssdCraftCost;
  const sscCraftProfit = (sscSellCost - sscCraftCost) / sscCraftCost;
  const bsscCraftProfit = (bsscSellCost - bsscCraftCost) / bsscCraftCost;
  const ssbCraftProfit = (ssbSellCost - ssbCraftCost) / ssbCraftCost;
  const bssbCraftProfit = (bssbSellCost - bssbCraftCost) / bssbCraftCost;
  const ssaCraftProfit = (ssaSellCost - ssaCraftCost) / ssaCraftCost;
  const bssaCraftProfit = (bssaSellCost - bssaCraftCost) / bssaCraftCost;

  const calculateSSDICProfit = () => {
    return (
      (ssdSellCost - ssdCraftCost) * SSD_PER_ONE_CRAFT * SSD_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSDICProfit = () => {
    return (
      (bssdSellCost - bssdCraftCost) *
      BSSD_PER_ONE_CRAFT *
      BSSD_CRAFTS_PER_ONE_IC
    );
  };

  const calculateSSCICProfit = () => {
    return (
      (sscSellCost - sscCraftCost) * SSC_PER_ONE_CRAFT * SSC_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSCICProfit = () => {
    return (
      (bsscSellCost - bsscCraftCost) *
      BSSC_PER_ONE_CRAFT *
      BSSC_CRAFTS_PER_ONE_IC
    );
  };

  const calculateSSBICProfit = () => {
    return (
      (ssbSellCost - ssbCraftCost) * SSB_PER_ONE_CRAFT * SSB_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSBICProfit = () => {
    return (
      (bssbSellCost - bssbCraftCost) *
      BSSB_PER_ONE_CRAFT *
      BSSB_CRAFTS_PER_ONE_IC
    );
  };

  const calculateSSAICProfit = () => {
    return (
      (ssaSellCost - ssaCraftCost) * SSA_PER_ONE_CRAFT * SSA_CRAFTS_PER_ONE_IC
    );
  };

  const calculateBSSAICProfit = () => {
    return (
      (bssaSellCost - bssaCraftCost) *
      BSSA_PER_ONE_CRAFT *
      BSSA_CRAFTS_PER_ONE_IC
    );
  };

  return (
    <div className="p-2">
      <div className="mb-1 border-2 border-solid border-black">
        Spirit Ore Cost:
        <input
          onChange={e => setSpiritOreCost(Number(e.target.value))}
          type="number"
          value={spiritOreCost}
        />
        Soul Ore Cost:
        <input
          onChange={e => setSoulOreCost(Number(e.target.value))}
          type="number"
          value={soulOreCost}
        />
      </div>
      <div className="mb-1 flex flex-wrap gap-2">
        <GradeBlock borderColor="blue">
          <CristalBlock
            armAdenCost={1500}
            armCost={armD}
            armICCost={5}
            cristalCost={dxCost}
            cristalLabel={"Dx"}
            cristalPerArm={11}
            cristalPerWip={90}
            setArmCost={setArmD}
            setCristalCost={setDxCost}
            setWipCost={setWipD}
            wipAdenCost={7500}
            wipCost={wipD}
            wipICCost={10}
          />
          <CraftProfit
            blessedSpiritshotCraftCost={bssdCraftCost}
            blessedSpiritshotCraftProfit={bssdCraftProfit}
            blessedSpiritshotSellCost={bssdSellCost}
            borderColor="blue"
            calculateBlessedSpiritshotICProfit={calculateBSSDICProfit}
            calculateSoulshotsICProfit={calculateSSDICProfit}
            label={"D"}
            setBlessedSpiritshotSellCost={setBssdSellCost}
            setSoulshotsSellCost={setSsdSellCost}
            soulshotsCraftCost={ssdCraftCost}
            soulshotsCraftProfit={ssdCraftProfit}
            soulshotsSellCost={ssdSellCost}
          />
        </GradeBlock>

        <GradeBlock borderColor="green">
          <CristalBlock
            armAdenCost={7500}
            armCost={armC}
            armICCost={10}
            cristalCost={cxCost}
            cristalLabel={"Cx"}
            cristalPerArm={6}
            cristalPerWip={45}
            setArmCost={setArmC}
            setCristalCost={setCxCost}
            setWipCost={setWipC}
            wipAdenCost={25000}
            wipCost={wipC}
            wipICCost={15}
          />
          <CraftProfit
            blessedSpiritshotCraftCost={bsscCraftCost}
            blessedSpiritshotCraftProfit={bsscCraftProfit}
            blessedSpiritshotSellCost={bsscSellCost}
            borderColor="green"
            calculateBlessedSpiritshotICProfit={calculateBSSCICProfit}
            calculateSoulshotsICProfit={calculateSSCICProfit}
            label={"C"}
            setBlessedSpiritshotSellCost={setBsscSellCost}
            setSoulshotsSellCost={setSscSellCost}
            soulshotsCraftCost={sscCraftCost}
            soulshotsCraftProfit={sscCraftProfit}
            soulshotsSellCost={sscSellCost}
          />
        </GradeBlock>

        <GradeBlock borderColor="red">
          <CristalBlock
            armAdenCost={25000}
            armCost={armB}
            armICCost={25}
            cristalCost={bxCost}
            cristalLabel={"Bx"}
            cristalPerArm={11}
            cristalPerWip={67}
            setArmCost={setArmB}
            setCristalCost={setBxCost}
            setWipCost={setWipB}
            wipAdenCost={50000}
            wipCost={wipB}
            wipICCost={35}
          />
          <CraftProfit
            blessedSpiritshotCraftCost={bssbCraftCost}
            blessedSpiritshotCraftProfit={bssbCraftProfit}
            blessedSpiritshotSellCost={bssbSellCost}
            borderColor="red"
            calculateBlessedSpiritshotICProfit={calculateBSSBICProfit}
            calculateSoulshotsICProfit={calculateSSBICProfit}
            label={"B"}
            setBlessedSpiritshotSellCost={setBssbSellCost}
            setSoulshotsSellCost={setSsbSellCost}
            soulshotsCraftCost={ssbCraftCost}
            soulshotsCraftProfit={ssbCraftProfit}
            soulshotsSellCost={ssbSellCost}
          />
        </GradeBlock>

        <GradeBlock borderColor="grey">
          <CristalBlock
            armAdenCost={1500}
            armCost={armD}
            armICCost={5}
            cristalCost={axCost}
            cristalLabel={"Ax"}
            cristalPerArm={11}
            cristalPerWip={90}
            setArmCost={setArmD}
            setCristalCost={setAxCost}
            setWipCost={setWipD}
            wipAdenCost={7500}
            wipCost={wipD}
            wipICCost={10}
          />

          <CraftProfit
            blessedSpiritshotCraftCost={bssaCraftCost}
            blessedSpiritshotCraftProfit={bssaCraftProfit}
            blessedSpiritshotSellCost={bssaSellCost}
            borderColor="grey"
            calculateBlessedSpiritshotICProfit={calculateBSSAICProfit}
            calculateSoulshotsICProfit={calculateSSAICProfit}
            label={"A"}
            setBlessedSpiritshotSellCost={setBssaSellCost}
            setSoulshotsSellCost={setSsaSellCost}
            soulshotsCraftCost={ssaCraftCost}
            soulshotsCraftProfit={ssaCraftProfit}
            soulshotsSellCost={ssaSellCost}
          />
        </GradeBlock>
      </div>
    </div>
  );
}
