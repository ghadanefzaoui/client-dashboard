import React, { Suspense, useEffect, useState } from "react";
import ContentBox from "../components/contents/ContentBox";
import LoadingIndicator from "../components/LoadingIndicator";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import configs from "../configs.json";

const Product = React.lazy(() => import("../components/products/Product"));

interface ProductType {
  name: string;
  units: number;
  price: number;
  inStock: boolean;
  image: string;
}

/**
 * Product page shows all user created posts
 * Users can make product available on unavailable by clicking on chackbox
 */
const ProductPage: React.FC = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  return (
    <PageWrapper>
      <div className="w-full">
        <div>
          <h1 className="text-lg text-black-100 font-bold leading-5">
            Cars & Services
          </h1>
        </div>

        <ContentBox name="Active Products" showSearch>
          <>
            <div className="border-b border-b-glitch-box">
              <SortByTag tags={["Cars", "Services"]} />
            </div>

            {/* Products list */}
            <div className="mt-5"></div>
            <Suspense fallback={<LoadingIndicator />}>
              <ul className="px-5 bg-transparent">
                <li
                        className="block mt-4 pb-4 border-b border-b-glitch-box last:border-none"
                      >
                        <Product
                          name="BMW M4"
                          price={120}
                          image="https://i.pinimg.com/originals/24/bb/e6/24bbe63026ae59fe39ae8a61d9fe5798.png"
                          inStock={true}
                          units={1}
                        />
                      </li>
              </ul>
            </Suspense>
          </>
        </ContentBox>
      </div>
    </PageWrapper>
  );
};

export default ProductPage;
