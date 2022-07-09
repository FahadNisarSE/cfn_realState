import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill, BsTextIndentLeft } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import styles from "../../styles/DetailProperty.module.css";
import Style from "../../styles/Property.module.css";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollBar from "../../components/ImageScrollBar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    verification,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  return (
    <article id={styles.propertyDetail}>
      {photos && <ImageScrollBar data={photos} />}
      <div id={styles.propertyInfo}>
        <div id={Style.firstLine}>
          <div>
            {verification.eligible && <GoVerified className={Style.icon} />}
            AED {millify(price)}
            {rentFrequency && `/${rentFrequency}`}
          </div>
          <img src={agency?.logo?.url} id={Style.avatar} />
        </div>
        <div id={Style.secondLine}>
          <div>
            {rooms} <FaBed className={Style.icon} />
          </div>{" "}
          <div>
            {" "}
            | {baths} <FaBath className={Style.icon} />{" "}
          </div>{" "}
          <div>
            {" "}
            | {millify(area)} sqft <BsGridFill className={Style.icon} />{" "}
          </div>
        </div>
        <div id={Style.thirdLine}>{title}</div>
      </div>
      <div className={styles.description}>
        <h1 id={styles.title}>{title}</h1>
        <p id={styles.detail}>{description}</p>
      </div>
      <div id={styles.info}>
        <div className={styles.instance}>
          <span>Type</span>
          <h3 className={styles.value}>{type}</h3>
        </div>
        <div className={styles.instance}>
          <span>Purpose</span>
          <h3 className={styles.value}>{purpose}</h3>
        </div>
        {furnishingStatus && (
          <div className={styles.instance}>
            <span>Furnishing Status</span>
            <h3 className={styles.value}>{furnishingStatus}</h3>
          </div>
        )}
      </div>

      {amenities.length && <h3 id={styles.amenitiesTitle}>Amenties</h3>}
      <div id={styles.amenities}>
        {amenities?.map((item) =>
          item.amenities?.map((amenity) => (
            <h5 key={amenity.text} className={styles.amenity}>{amenity.text}</h5>
          ))
        )}
      </div>
    </article>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
