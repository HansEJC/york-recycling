import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Household, CollectionInfo } from "../types";

interface PostcodeState {
  postcode: string;
}
interface PostcodePayload {
  postcode: string;
}

interface CollectionInfoDataPayload {
  collectionInfos: CollectionInfo[];
}

interface HouseholdPayload {
  household: Household;
}

interface HouseholdDataPayload {
  households: Household[];
}
interface HouseholdsDataState {
  householdData: {
    fetched: boolean;
    households: Household[];
  };
}
interface HouseholdState {
  household: Household;
}
interface CollectionInfoDataState {
  collectionInfoData: {
    fetched: boolean;
    collectionInfo: CollectionInfo[];
  };
}

type CollectionInfoSliceState = PostcodeState &
  HouseholdsDataState &
  HouseholdState &
  CollectionInfoDataState;

const postcodeInitialState: PostcodeState = { postcode: "" };
const householdInitialState: Household = {
  Uprn: undefined
};
const householdsDataInitialState: HouseholdsDataState = {
  householdData: {
    fetched: false,
    households: []
  }
};

const collectionInfoDataInitialState: CollectionInfoDataState = {
  collectionInfoData: {
    fetched: false,
    collectionInfo: []
  }
};

export const collectionInfoSliceInitialState: CollectionInfoSliceState = {
  ...postcodeInitialState,
  ...householdsDataInitialState,
  household: householdInitialState,
  ...collectionInfoDataInitialState
};

const collectionInfoSlice = createSlice({
  name: "collectionInfo",
  initialState: { ...collectionInfoSliceInitialState },
  reducers: {
    setPostcode(state, action: PayloadAction<PostcodePayload>) {
      const { postcode } = action.payload;
      state.postcode = postcode;
      state.household = householdInitialState;
      state.householdData = householdsDataInitialState.householdData;
      state.collectionInfoData =
        collectionInfoDataInitialState.collectionInfoData;
    },
    setHousehold(state, action: PayloadAction<HouseholdPayload>) {
      const { household } = action.payload;
      state.household = household;
    },
    setHouseholdData(state, action: PayloadAction<HouseholdDataPayload>) {
      const { households } = action.payload;
      state.householdData.fetched = true;
      state.householdData.households = households;
    },
    setCollectionInfoData(
      state,
      action: PayloadAction<CollectionInfoDataPayload>
    ) {
      const { collectionInfos } = action.payload;
      state.collectionInfoData.fetched = true;
      state.collectionInfoData.collectionInfo = collectionInfos;
    }
  }
});

export const {
  setPostcode,
  setHousehold,
  setHouseholdData,
  setCollectionInfoData
} = collectionInfoSlice.actions;

export default collectionInfoSlice.reducer;
