import { useEffect, useState } from "react";
import { router } from "next/router";

import { filterData, getFilterValues } from "../utils/filterData";
import styles from "../styles/SearchFilters.module.css";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setsearchTerm] = useState("");
  const [LocationData, setLocationData] = useState();
  const [Loading, setLoading] = useState("");

  const searchProperties = (filterValues) => {
    const path = router.pathName;
    const { query } = router;

    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name])
        query[item.name] = item.value;
    });
    router.push({ pathName: path, query });
  };

  return (
    <section id={styles.filterContainer}>
      {filters.map((filter) => (
        <div key={filter.queryName}>
          <select
            className={styles.selectBox}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            <option value="">{filter.placeholder}</option>
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </section>
  );
};

export default SearchFilters;
