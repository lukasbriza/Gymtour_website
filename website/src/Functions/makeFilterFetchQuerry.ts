const makeFilterFetchQuerry = (
  data: searchFitnessData | searchCoachData,
  skip: number = 0,
  limit: number = 20
) => {
  let dataObj: any = { ...data };
  //REMOVE REGIONS AND ORDER//
  delete dataObj.order;
  delete dataObj.regions;

  //QUERRY OBJ BUILD//
  let queryObj: any = { $and: [{ approved: true }] };
  for (const key in dataObj) {
    if (dataObj[key].length !== 0) {
      queryObj.$and.push({ [`filters.${key}`]: { $all: dataObj[key] } });
    }
  }

  //REGION PROCESSING//
  if (data.regions.length !== 0) {
    let townObj: { town: { $in: string[] } } = { town: { $in: [] } };
    let regionObj: { region: { $in: string[] } } = { region: { $in: [] } };

    data.regions.forEach((obj: { regionCode: string; townCode: string }) => {
      townObj.town.$in.push(obj.townCode);

      const regResFind = regionObj.region.$in.indexOf(obj.regionCode);
      if (regResFind === -1) {
        regionObj.region.$in.push(obj.regionCode);
      }
    });

    queryObj.$and.push(townObj);
    queryObj.$and.push(regionObj);
  }

  const fetchObj = {
    get: {
      query: queryObj,
      projection: [
        "name",
        "pictures",
        "_id",
        "owner",
        "views",
        "topped",
        "popularity",
      ],
      options: {
        skip: skip,
      },
      limit: limit,
      order: data.order,
    },
  };
  return fetchObj;
};
export { makeFilterFetchQuerry };

/**
 * 
 * {
        "name":"FitnessName1",
        "street": "Hokajova 675",
        "town":11,
        "region":1,
        "IN":25596641,
        "priceLevel":2,
        "contact":{
            "tel":774876504,
            "mobile":123456789,
            "email":"fitness@seznam.cz",
            "web":"www.fitness.cz",
            "facebook": "www.facebook.com",
            "twitter":"www.twitter.cz",
            "google":"www.gooogle.cz",
            "instagram":"www.instagram.cz",
            "youtube":"www.youtube.com"
        },
        "filters":{
            "equipment":[1,2,4,8],
            "general":[1,2,4],
            "others":[1,2,3]
        },
        "open":{
            "mon":{"from":8,"to":16},
            "tue":{"from":8,"to":16},
            "wed":{"from":8,"to":16},
            "thu":{"from":8,"to":16},
            "fri":{"from":8,"to":16},
            "sat":{"from":8,"to":16},
            "sun":{"from":8,"to":16}
        },
        "descriptionBasic":"some basic description...",
        "descriptionFull": "full description...",
        "pictures":{
            "card":"6262f8e1ba7f5d98846efdc6",
            "detail":{
                "main":"6262f8e1ba7f5d98846efdc6",
                "others":["6262f8e1ba7f5d98846efdc6"]
            }
        },
        "agreement":{
            "terms":{
                "status": true
            },
            "dataProcessinfForPropagation": {
                "status": true
            }
        },
        "owner": "623ddfef5eccd928c4988de9"
    }
 * 
 * {
        "name":"CoachName2",
        "alias":"Alias",
        "workPlace":"FitnessName",
        "street": "Hokajova 675",
        "town":11,
        "region":1,
        "priceLevel":2,
        "contact":{
            "tel":774876504,
            "mobile":123456789,
            "email":"coach2@seznam.cz",
            "web":"www.coach.cz",
            "facebook": "www.facebook.com",
            "twitter":"www.twitter.cz",
            "google":"www.gooogle.cz",
            "instagram":"www.instagram.cz",
            "youtube":"www.youtube.com"
        },
        "filters":{
            "gender":1,
            "specialization":[1,2,3,4],
            "others":[1]
        },
        "descriptionBasic":"some basic description...",
        "descriptionFull": "full description...",
        "pictures":{
            "card":"6262f8e1ba7f5d98846efdc6",
            "detail":{
                "main":"6262f8e1ba7f5d98846efdc6",
                "others":["6262f8e1ba7f5d98846efdc6"]
            }
        },
        "agreement":{
            "terms":{
                "status": true
            },
            "dataProcessinfForPropagation": {
                "status": true
            }
        },
        "owner": "623ddfef5eccd928c4988de9"
    }
 */
