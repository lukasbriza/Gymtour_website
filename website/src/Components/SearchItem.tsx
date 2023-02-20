import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart } from "../components/SVG/Heart";
import { Topped } from "../components/SVG/Topped";
import { Tilt } from "../components/Tilt";
import { SearchItemIMG } from "../components/SearchItemIMG";
import fetchAgent from "../utils/fetchAgent";

//FUNCTUION//
import { classListMaker } from "../utils/classListMaker";

interface SearchItemType {
  data: {
    _id: string;
    pictures: {
      detail: {
        main: string;
        others: string[];
      };
      card: string;
    };
    topped: { value: boolean; toDate: null | Date };
    views: number;
    popularity: string[];
    name: string;
  };
  callback: (e: feResponseObj<updateViews_FetchCall>) => void;
}

const tiltOptions = {
  reverse: true,
  max: 9,
  perspective: 1500,
  glare: true,
  "max-glare": 0.2,
  "glare-prerender": false,
};

const SearchItem = ({ data, callback }: SearchItemType) => {
  //////////////////////////////////////////////////
  //STATE//
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [imgData, setImgData] = useState<string>();
  //////////////////////////////////////////////////
  //VARIABLES//
  const searchItemClasses = classListMaker(["searchItem", "relative"]);
  const itemBar = classListMaker([
    "itemBar",
    "absolute",
    "left",
    "bottom",
    "stretchX",
  ]);
  const popularityCounterClasses = classListMaker([
    "popularityCounter",
    "absolute",
    "top",
    "left",
  ]);
  const viewsCounterClasses = classListMaker(["viewsCounter", "relative"]);

  const location = useLocation();
  const hearthRef = useRef<SVGSVGElement>(null);
  const toppedRef = useRef<SVGSVGElement>(null);
  //////////////////////////////////////////////////
  //EFFECTS//
  useEffect(() => {
    //FETCH CARD IMG//
    getCardImg(data.pictures.card);
  }, [data.pictures.card]);
  //////////////////////////////////////////////////
  //FUNCTIONS//
  const handleClick = () => {
    //SET VIEW +1//
    fetchAgent
      .updateViews({
        updateViews: {
          type: location.pathname === "/fitness" ? "/fitness" : "/coach",
          _id: data._id,
        },
      })
      .then((result) => {
        //VERIFY CALL RESULT//
        if (result.errorMap.length !== 0) {
          callback(result);
        }
      });
    //REDIRECT
    //history.push("/fitness/" + data._id)
  };
  const getCardImg = async (id: string) => {
    await fetchAgent.getImg({ id: id }, setImgData);
  };
  //////////////////////////////////////////////////
  //SETUP//
  const WithLoadingImg = SearchItemIMG;

  return (
    <Tilt
      className={searchItemClasses}
      options={tiltOptions}
      onClick={() => {
        handleClick();
      }}
    >
      <div className={popularityCounterClasses}>
        <Heart className="popularityImgWrapper" ref={hearthRef} />
        <p>{data.popularity.length}</p>
      </div>
      <Topped
        className="toppedImgWrapper"
        ref={toppedRef}
        topped={data.topped.value}
      />
      <div className={itemBar}>
        <h3>{data.name}</h3>
        <div className={viewsCounterClasses}>x{data.views}</div>
      </div>
    </Tilt>
  );
};

export { SearchItem };
