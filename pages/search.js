import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsFilter } from "react-icons/bs";

import styles from "../styles/Search.module.css";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noresult from "../assests/image/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";

const Search = ({ properties }) => {
  const [searchFilter, setSearchFilter] = useState(false);
  const router = useRouter();

  return (
    <section>
      <div
        id={styles.searchFilter}
        onClick={() => setSearchFilter((prevFilter) => !prevFilter)}
      >
        Search Properties By Filters
        <BsFilter />
      </div>
      {searchFilter && <SearchFilters />}
      <h2 id={styles.sectionHeading}>Properties {router.query.purpose}</h2>
      <div className={styles.propertyCards}>
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
      {properties.length === 0 && (
        <div id={styles.noResult}>
          <Image alt="no result" src={noresult} width="180px" height="200px" />
          <h3>No Results Found</h3>
        </div>
      )}
    </section>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  console.log(data);

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
