import Link from "next/link";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill, BsTextIndentLeft } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import Image from "next/image";

import Style from "../styles/Property.module.css";
import DefaultImage from "../assests/image/default.jpeg";

 
const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    baths,
    area,
    agency,
    verification,
    externalID,
    title
  },
}) => (
  <Link href={`property/${externalID}`} passHref>
    <div className={Style.propertyCard}>
      <div>
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          className={Style.propertyCardImage}
          loading="lazy"
          width={400}
          height={260}
          alt="house"
        />
      </div>
      <div id={Style.propertyCardInfo}>
        <div id={Style.firstLine}><div>{verification.eligible && <GoVerified className={Style.icon}/>}
          AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</div>
          <img src={agency?.logo?.url} id={Style.avatar} /></div>
        <div id={Style.secondLine}><div>{rooms} <FaBed className={Style.icon} /></div> <div> | {baths} <FaBath className={Style.icon} /> </div> <div> | {millify(area)} sqft <BsGridFill className={Style.icon} /> </div></div>
        <div id={Style.thirdLine}>{title.length > 30 ? `${title.substring(0,30)}...`: title }</div>
      </div>
    </div>
  </Link>
);

export default Property;
