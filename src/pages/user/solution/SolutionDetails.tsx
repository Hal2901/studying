import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import CardItem from "../../../components/CardItem";
import ProductCard from "../../../components/ProductCard";
import SliderProposeItem from "../../../components/SliderProposeItem";
import TitlePage from "../../../components/TitlePage";
import { productService } from "../../../services/product/productService";
import { solutionService } from "../../../services/solution/solutionService";
import { productTypeRoot } from "../../../types/productType";
import { solutionType } from "../../../types/solutionType";
import { listBreads } from "../../../utils/common";
import { Params, SizePage } from "../../../utils/constants";
import { publicPath } from "../../../utils/routers";
import NoContent from "../../NoContent";

const SolutionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<solutionType>();
  const [listData, setListData] = useState<solutionType[]>();
  const [listProducts, setListProducts] = useState<productTypeRoot[]>();

  const param: Params = {
    page: 0,
    size: SizePage * 2,
    sort: "id,desc",
  };
  const handleViewDetails = (id: number) => {
    navigate(`${publicPath.solution.index}/${id}`);
  };
  const handleFetchDetails = async (id: number) => {
    try {
      const result = await solutionService.getDetailsSolution(id);
      setData(result);
    } catch (error) {}
  };
  const fetchDataSolutions = async (idCate: number) => {
    try {
      const { total, data } = await solutionService.getListSolutionsOther(
        param,
        { idCate, idSolution: +id! }
      );
      setListData(data);
    } catch (error) {
      setListData(undefined);
    }
  };
  const fetchProducts = async () => {
    try {
      const { total, data } = await productService.getProducts(param);
      setListProducts(data);
    } catch (error) {}
  };
  useEffect(() => {
    if (id) {
      handleFetchDetails(+id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      fetchDataSolutions(data.idCategory);
    }
  }, [data, id]);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Banner typeBanner="SOLUTION" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        <div>
          <p className="lg:text-40 text-3xl font-semibold mb-10">
            {data?.title}
          </p>
          <div
            className="mb-10"
            dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}
          ></div>
        </div>
        <TitlePage text="related_pr" />

        {listProducts ? (
          <SliderProposeItem
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            typeCard="products"
          >
            {listProducts.map((product, indexP) => {
              return (
                <SwiperSlide key={indexP}>
                  <ProductCard onClickPr={() => {}} item={product} />
                </SwiperSlide>
              );
            })}
          </SliderProposeItem>
        ) : (
          <NoContent />
        )}

        {listData && listData?.length > 0 && (
          <>
            <TitlePage text="proposed_solutions" />
            <SliderProposeItem
              slidesPerView={1}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
            >
              {listData.map((solution, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CardItem
                      handleButton={() => handleViewDetails(solution.id!)}
                      item={solution}
                    />
                  </SwiperSlide>
                );
              })}
            </SliderProposeItem>
          </>
        )}
      </div>
    </div>
  );
};

export default SolutionDetails;
