import { clsx } from "clsx";
import { Country, ICountry, IState, State } from "country-state-city";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import DropdownSelect from "../../../components/DropdownSelect";
import { InputElement } from "../../../components/InputElement";
import TitlePage from "../../../components/TitlePage";
import { partnerService } from "../../../services/partnerService";
import { PartnerCompanyType } from "../../../types/PartnerType";
import { listBreads, listPartnerFake } from "../../../utils/common";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import PartnerMapItem from "./component/PartnerMapItem";
import { useTranslation } from "react-i18next";
import { productService } from "../../../services/product/productService";
import { Params, SizePage } from "../../../utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

type PartnerType = {
  name: string;
  type: string;
};
const typePartners: PartnerType[] = [
  {
    name: "distributor_partner",
    type: "Distributor",
  },
  {
    name: "AGENCY",
    type: "AGENCY",
  },
  {
    name: "LSI",
    type: "LSI",
  },
];

const listCountries = Country.getAllCountries();
const Partner = () => {
  const { t } = useTranslation();
  const [linkMap, setLinkMap] = useState<string>(listPartnerFake[0].linkMap);
  const [partners, setPatners] = useState<PartnerCompanyType[]>([]);
  const [listProducts, setListProduct] = useState<
    { id: number; nameProduct: string }[]
  >([]);

  const [cities, setCities] = useState<IState[]>();
  const [countries, setCountries] = useState<ICountry[]>(listCountries);

  const [country, setCountry] = useState<ICountry>();
  const [keyPartner, setKeyPartner] = useState<PartnerType>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [city, setCity] = useState<IState>();
  const [idProduct, setIdProduct] = useState<number>();
  const [keySearch, setKeySearch] = useState<string>("");

  const queryParam = {
    city: city?.isoCode,
    distributor: keyPartner?.type,
    page: currentPage - 1,
    size: SizePage,
  };

  const getListPartnerCompanies = async (params: any, reFetch?: boolean) => {
    try {
      const { total, data } = await partnerService.getPartnersCompany(params);
      setTotalPage(Math.ceil(total / SizePage));
      reFetch
        ? setPatners(data)
        : setPatners((prevState) => [...prevState, ...data]);
    } catch (error) {}
  };

  const handleResetData = () => {
    setPatners([]);
    setListProduct([]);
    setCurrentPage(1);
    setIdProduct(undefined);
  };

  const fetchMoreCategories = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1);
    } else {
      setHasMore(false);
    }
  };
  const fetProductByCity = async (params: any) => {
    try {
      const result = await productService.getProductSelectDistributor(params);
      setListProduct(result);
    } catch (error) {}
  };
  const fetProductByIdPartner = async (id: number) => {
    try {
      const result = await productService.getProductSelectByIdPartner({
        idPartner: id,
      });
      setListProduct(result);
    } catch (error) {}
  };
  const handleChoseCountry = (countryParam: ICountry) => {
    if (countryParam.isoCode === country?.isoCode) {
      setCountry(undefined);
      setCities(undefined);
      handleResetData();
      getListPartnerCompanies(queryParam, true);
    } else {
      const cities = State.getStatesOfCountry(countryParam.isoCode);
      cities && setCities(cities);
      setCountry(countryParam);
      handleResetData();
    }
    setKeyPartner(undefined);
    setCity(undefined);
    // setIdProduct(undefined);
  };

  const handleChoseCity = (cityItem: IState) => {
    setKeyPartner(undefined);
    setCity(cityItem);
    if (city && city.isoCode === cityItem.isoCode) {
      return;
    }
    handleResetData();
  };

  const handleChosePartner = (partner: PartnerType) => {
    if (partner.type === keyPartner?.type) {
      setKeyPartner(undefined);
    } else {
      setKeyPartner(partner);
    }
    handleResetData();
    setListProduct([]);
  };
  const handleClickPartner = (value: PartnerCompanyType) => {
    if (value.city && value.nation && value.map) {
      setLinkMap(value.map);
      if (keySearch !== "") return;

      setIdProduct(+value.id!);
      if (city && city.isoCode === value.city) {
        console.log("aaaaa");
        return;
      } else {
        const coutry = Country.getCountryByCode(value.nation);
        const listCities = State.getStatesOfCountry(value.nation);
        const city = State.getStateByCodeAndCountry(value.city, value.nation);
        setCity(city);
        setCountry(coutry);
        setCities(listCities);
        setPatners([]);
        setCurrentPage(1);
      }
    }
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeySearch(value);
    handleResetData();
    setCountry(undefined);
    setCity(undefined);
    setKeyPartner(undefined);
  };

  const handleDebounce = useCallback(
    debounce(
      (key: string, params: Params) => handleSearchPartner(key, params),
      1000
    ),
    []
  );

  const handleSearchPartner = async (keySearch: string, params: Params) => {
    try {
      const { total, data } = await partnerService.searchPartnersCompany(
        keySearch,
        params
      );
      setTotalPage(Math.ceil(total / SizePage));
      setPatners((prevState) => [...prevState, ...data]);
    } catch (error) {}
  };

  useEffect(() => {
    if (keySearch === "") {
      handleDebounce.cancel();
      getListPartnerCompanies(queryParam);
    } else {
      handleDebounce(keySearch, {
        page: currentPage - 1,
        size: SizePage,
        sort: "id,desc",
      });
    }
  }, [city, keyPartner, currentPage, keySearch]);

  useEffect(() => {
    if (!idProduct) {
      keyPartner?.type &&
        fetProductByCity({ city: city?.isoCode, type: keyPartner?.type });
    } else {
      fetProductByIdPartner(idProduct);
    }
  }, [city, keyPartner, idProduct]);
  return (
    <div>
      <Banner typeBanner="PARTNER" />
      <Breadcrumb listBreads={listBreads} />

      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10">
        <TitlePage text={"title_list_partner"} />
        <div className="">
          <div className="grid grid-cols-6 gap-6 mb-6 h-full">
            <div className="2xl:col-span-2 col-span-6">
              <InputElement
                placeholder={t("search_partner")}
                reSearch={true}
                value={keySearch}
                onChange={(e) => handleInputSearch(e)}
              />
            </div>
            <div className="w-full xl:col-span-1 md:col-span-2 col-span-6 z-50">
              <DropdownSelect
                name={country ? country.name : "country"}
                className="w-full"
                classOverlay=""
              >
                {countries &&
                  keySearch === "" &&
                  countries.map((itemCountry, indexCountry) => {
                    return (
                      <div
                        key={indexCountry}
                        className={clsx(
                          "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                          {
                            "bg-active text-white":
                              country &&
                              country.isoCode === itemCountry?.isoCode,
                          }
                        )}
                        onClick={() => handleChoseCountry(itemCountry)}
                      >
                        {itemCountry.name}
                      </div>
                    );
                  })}
              </DropdownSelect>
            </div>
            <div className="w-full xl:col-span-1 md:col-span-2 col-span-6 z-30">
              <DropdownSelect
                name={city ? city.name : "city"}
                className="w-full"
                classOverlay=""
              >
                {cities &&
                  keySearch === "" &&
                  cities.map((cityItem, indexCity) => {
                    return (
                      <div
                        key={indexCity}
                        className={clsx(
                          "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                          {
                            "bg-active text-white":
                              city && city?.isoCode === cityItem.isoCode,
                          }
                        )}
                        onClick={() => handleChoseCity(cityItem)}
                      >
                        {cityItem.name}
                      </div>
                    );
                  })}
              </DropdownSelect>
            </div>

            <div className="w-full xl:col-span-1 md:col-span-2 col-span-6 z-20">
              <DropdownSelect
                name={"partner"}
                className="w-full xl:col-span-1 md:col-span-2 col-span-6"
              >
                {keySearch === "" &&
                  typePartners.map((partner, indexPartner) => {
                    return (
                      <div
                        key={indexPartner}
                        className={clsx(
                          "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                          {
                            "bg-active text-white":
                              keyPartner && keyPartner.type === partner.type,
                          }
                        )}
                        onClick={() => handleChosePartner(partner)}
                      >
                        {t(partner.name)}
                      </div>
                    );
                  })}
              </DropdownSelect>
            </div>
            <div className="w-full xl:col-span-1 md:col-span-2 col-span-6 z-10">
              <DropdownSelect
                name="product"
                className="w-full xl:col-span-1 md:col-span-2 col-span-6 "
              >
                {keySearch === "" && listProducts?.length > 0 ? (
                  listProducts.map((pr, indexPr) => {
                    return (
                      <div
                        className="h-12 w-full flex items-center px-6  hover:bg-active hover:text-white line-clamp-1"
                        key={indexPr}
                      >
                        {pr.nameProduct}
                      </div>
                    );
                  })
                ) : (
                  <div className="h-12 w-full flex items-center px-6  hover:bg-active hover:text-white">
                    {t("no_pr")}
                  </div>
                )}
              </DropdownSelect>
            </div>
          </div>

          {partners.length === 0 ? (
            <NoContent />
          ) : (
            <div className="shadow-normal bg-white p-4 grid lg:grid-cols-3 grid-cols-1 xl:h-[900px] lg:h-600 h-auto  overflow-hidden">
              <div
                id="scrollableDiv"
                className="lg:max-h-full lg:mb-0 mb-10 flex flex-wrap xl:h-[868px] h-600 overflow-y-scroll hidden-scroll"
              >
                <InfiniteScroll
                  dataLength={partners.length}
                  next={fetchMoreCategories}
                  hasMore={hasMore}
                  loader={<Loading />}
                  scrollableTarget="scrollableDiv"
                >
                  {partners.map((partner, index) => {
                    return (
                      <div
                        key={index}
                        className="lg:w-full md:w-1/2 w-full h-auto border-b"
                      >
                        <PartnerMapItem
                          onChangeLinkMap={() => handleClickPartner(partner)}
                          item={partner}
                          className={""}
                        />
                      </div>
                    );
                  })}
                </InfiniteScroll>
              </div>
              <div className="col-span-2 lg:h-full h-600 ">
                <iframe
                  className="w-full h-full"
                  src={linkMap}
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partner;
