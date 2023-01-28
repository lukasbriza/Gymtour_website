import React from "react";

export const handleSearchData = (
  data: dataTypeSearch,
  fitnessCB: React.Dispatch<React.SetStateAction<searchFitnessData>>,
  fitness: searchFitnessData,
  coachCB: React.Dispatch<React.SetStateAction<searchCoachData>>,
  coach: searchCoachData,
  actualLocation: string
) => {
  ////////////////////////////////////////////////////////////////////////

  if (data.type === "order") {
    switch (actualLocation) {
      case "/fitness": {
        fitnessCB({
          ...fitness,
          order: Number(data.code),
        });
        break;
      }
      case "/coach": {
        coachCB({
          ...coach,
          order: Number(data.code),
        });
        break;
      }
    }
    return;
  }
  if (data.type === "regions") {
    let regionQuery: { regionCode?: string; townCode?: string }[] = [];
    switch (actualLocation) {
      case "/fitness": {
        regionQuery = fitness.regions;
        break;
      }
      case "/coach": {
        regionQuery = coach.regions;
        break;
      }
    }

    //IS LISTED//
    const foundRegionIndex = regionQuery.findIndex(
      (item: { regionCode?: string; townCode?: string }) =>
        item.regionCode === data.region && item.townCode === data.town?.code
    );
    if (foundRegionIndex !== -1 && data.town?.checked === false) {
      //REMOVE WHEN CHECKED PROP IS FALSE//
      regionQuery.splice(foundRegionIndex, 1);
    } else {
      //ADD TO ARRAY//
      regionQuery.push({
        regionCode: data.region,
        townCode: data.town?.code,
      });
    }
    //SET NEW STATE//
    switch (actualLocation) {
      case "/fitness": {
        fitnessCB({
          ...fitness,
          regions: regionQuery,
        });
        break;
      }
      case "/coach": {
        coachCB({
          ...coach,
          regions: regionQuery,
        });
        break;
      }
    }
    return;
  }
  //OTHER INPUT TYPES//
  const dataType = data.type;
  let typeArray: any;
  switch (actualLocation) {
    case "/fitness": {
      typeArray = fitness[dataType as keyof typeof fitness];
      break;
    }
    case "/coach": {
      typeArray = coach[dataType as keyof typeof coach];
      break;
    }
  }

  const removeItemIndex = typeArray.findIndex(
    (item: string) => item === data.code
  );

  if (removeItemIndex !== -1 && data.checked === false) {
    //REMOVE WHEN CHECKED PROP IS FALSE//
    typeArray.splice(removeItemIndex, 1);
  } else {
    //ADD TO ARRAY//
    typeArray.push(data.code);
  }
  //SET NEW STATE//
  switch (actualLocation) {
    case "/fitness": {
      fitnessCB({
        ...fitness,
        [data.type]: typeArray,
      });
      break;
    }
    case "/coach": {
      coachCB({
        ...coach,
        [data.type]: typeArray,
      });
      break;
    }
  }
  return;
  ////////////////////////////////////////////////////////////////////////
};
