declare global {
  namespace App {}

  type Nullable<T extends object> = {
    [k in keyof T]: T[k] | null;
  };

  // https://stackoverflow.com/questions/45372227/how-to-implement-typescript-deep-partial-mapped-type-not-breaking-array-properti/49936686#49936686
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
      ? DeepPartial<U>[]
      : T[P] extends Readonly<infer U>[]
        ? Readonly<DeepPartial<U>>[]
        : DeepPartial<T[P]>;
  };

  import type {
    AnyRequirementData,
    CurrencyQuantity,
    AnyItemQuantity,
  } from "$lib/melvor/schema";

  type StrictFixedCostsData = {
    currencies: CurrencyQuantity[];
    items: AnyItemQuantity[];
  };

  type StrictHexData = {
    coordinates: PointData;
    maxSurveyLevel: number;
    maxMasteryLevel: number;
    requirements: AnyRequirementData[];
    travelCost: StrictFixedCostsData;
    isWater: boolean;
  };

  import type {
    IStatObjectData,
    ModifierValuesRecordData,
    EquipmentItemID,
    ArchaeologyDigSiteID,
  } from "$lib/melvor/schema";
  type StrictPointOfInterestData = {
    id: string;
    coords: PointData;
    name: string;
    description: string;
    media: string;
    activeStats: IStatObjectData;
    fastTravel: {
      groupID: string;
      unlockCosts: StrictFixedCostsData;
    };
    discoveryRewards: StrictFixedCostsData;
    discoveryModifiers: {
      moves: number;
      modifiers: ModifierValuesRecordData;
    };
    hidden: {
      requirements: AnyRequirementData[];
      itemsWorn: EquipmentItemID[];
      showMarker: boolean;
    };
  } & (
    | {
        type: "DigSite";
        digSiteID: ArchaeologyDigSiteID & string;
      }
    | {
        type: "Watchtower";
        towerRange: number;
      }
    | {
        type: "Other";
      }
  );

  import type {
    PointData,
    HexColour,
    FastTravelGroupData,
  } from "$lib/melvor/schema";
  type StrictWorldMapData = {
    id: string;
    name: string;
    bgTiles: {
      dimensions: PointData;
      tileSize: PointData;
      tilePath: string;
    };
    worldSize: PointData;
    hexScale: PointData;
    hexBorderColour: HexColour;
    activePOIBorderColour: HexColour;
    origin: PointData;
    startingLocation: PointData;
    fastTravelGroups: FastTravelGroupData[];
    pointsOfInterest: StrictPointOfInterestData[];
    hexes: StrictHexData[];
    masteryBonuses: StrictWorldMapMasteryBonusData[];
  };

  type StrictWorldMapMasteryBonusData = IStatObjectData &
    StrictFixedCostsData & {
      id: string;
      masteredHexes: number;
      pets: PetID[];
    };
}

export {};
