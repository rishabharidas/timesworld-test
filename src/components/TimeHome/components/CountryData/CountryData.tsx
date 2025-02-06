"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountryData } from "@/redux/countries";
import { CountryData } from "@/types/common.t";

import axios from "axios";
import Image from "next/image";
import { Button, Skeleton } from "@mui/material";

const CountryDatas = ({ tab }: { tab: string }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedCountries, setPaginatedCountries] = useState<CountryData[]>(
    [],
  );
  const countries = useSelector(
    (state: { countries: { data: CountryData[] } }) => state.countries.data,
  );
  useEffect(() => {
    setPaginatedCountries([]);
    setCurrentPage(0);
    getCountryData();
  }, [tab]);

  const getCountryData = async () => {
    setLoader(true);
    const params = tab
      ? tab == "All"
        ? "all"
        : `region/${tab.toLowerCase()}`
      : "all";
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/${params}?fields=name,region,flag`,
      );
      setPaginatedCountries([]); // Clear existing data
      dispatch(addCountryData(response.data));
      setCurrentPage(1);
      getpaginatedData(response.data, 0);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const getpaginatedData = (items?: CountryData[], page?: number) => {
    const itemsPerPage = 12;
    const pageToUse = typeof page === "number" ? page : currentPage;
    const startIndex = pageToUse * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (typeof page !== "number") {
      setCurrentPage((prev) => prev + 1);
    }

    const dataToUse = items || countries;

    if (paginatedCountries.length) {
      setPaginatedCountries((prev) => {
        return [...prev, ...dataToUse.slice(startIndex, endIndex)];
      });
    } else {
      setPaginatedCountries(dataToUse.slice(startIndex, endIndex));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loader ? (
          Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="border-2 border-gray-400 p-4 flex gap-4 items-start shadow-xl inset-shadow-xs animate-pulse"
            >
              <Skeleton variant="rectangular" width={127} height={96} />
              <div className="w-full flex flex-col pt-3">
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
          ))
        ) : (
          <>
            {paginatedCountries && paginatedCountries.length ? (
              paginatedCountries.map((country, index) => {
                return (
                  <span
                    key={index}
                    className="border-2 border-gray-600 p-4 flex gap-4 items-start shadow-xl inset-shadow-xs"
                  >
                    <Image
                      src={country.flag}
                      alt={`country flag of ${country.name}`}
                      width={127}
                      height={96}
                      className="object-scale-down w-[127px] h-[96px]"
                    />
                    <span className="flex flex-col gap-1 text-gray-500 font-semibold pt-3">
                      <span>{country.name}</span>
                      <span className="text-sm font-medium">
                        {country.region}
                      </span>
                    </span>
                  </span>
                );
              })
            ) : (
              <div className="w-100 flex justify-center">
                <span className="text-gray-500 text-3xl"> No Data found</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-100 flex justify-center mt-10">
        {(!loader || paginatedCountries.length) && (
          <Button
            variant="contained"
            size="large"
            sx={{ background: "var(--foreground)", borderRadius: 0 }}
            onClick={() => getpaginatedData()}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
};
export default CountryDatas;
