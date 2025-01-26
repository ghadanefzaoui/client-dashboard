import React, { Suspense, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ContentBox from "../components/contents/ContentBox";
import DisplaySection from "../components/DisplaySection";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import Search from "../components/Search";
import Customer from '../assets/images/customer.svg'
import LeadershipIcon from "../assets/images/leadership.svg";
import ShoppingCartIcon from "../assets/images/contract.svg";
import TotalSalesIcon from "../assets/images/sales.svg";
import StoreIcon from "../assets/images/store.svg";
import configs from "../configs.json";

const OrderedProductPreview = React.lazy(
  () => import("../components/products/OrderedProductPreview")
);

interface OrderedProductType {
  id: number;
  title: string;
  createdDate: string;
  stat: string;
  client: string;
  fileUrl: string;
}

/**
 * Dashboard page
 * Sows current store status & active products list by category
 */
const DashboardPage: React.FC = () => {
  const [orderedProductList, steOrderedProductList] = useState<
    OrderedProductType[]
  >([]);

  // Fetch ordered products
  useEffect(() => {
    fetch(`/data/contracts.json`)
      .then((res) => res.json())
      .then(({ data }) => {
        steOrderedProductList(data);
      });
  }, []);

  return (
    <PageWrapper>
      <div className="w-full">
        <div className="flex justify-between relative" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <div>
            <h1 className="text-lg text-black-100 font-bold leading-5">
              Hello {configs.userName}!
            </h1>
            <p className="text-black-300 leading-5">
              Welcome back {configs.userName.split(" ")[0]}, and great to meet
              you
            </p>
          </div>
          <div className="ml-1">
            <Search />
          </div>
        </div>

        {/* Active orders */}
        <ContentBox name="Active Contract" showSearch>
          <>
            <div className="border-b">
              <SortByTag
                tags={["Signed (1)", "Pending (0)", "Archived (0)"]}
              />
            </div>

            {/* Products list */}
            <div className="mt-5"></div>
            <Suspense fallback={<LoadingIndicator />}>
              <ul className="px-5 bg-transparent">
                <li
                      className="block mt-4 pb-4 border-b text-black last:border-none"
                    >
                      <OrderedProductPreview
                        id={1}
                        title="Contract N° 1"
                        createdDate="2025-01-10"
                        stat="Signed"
                        client="Aryna Sabalenka"
                        fileUrl="https://drive.google.com/file/d/1Or3d48HLypUvFd4okuWzCLJN64XyYcKZe3o61byAjFQ/view"
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

export default DashboardPage;
