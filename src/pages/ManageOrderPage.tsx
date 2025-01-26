import React, { Suspense, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ContentBox from "../components/contents/ContentBox";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import configs from "../configs.json";

const OrderedProductPreview = React.lazy(
  () => import("../components/products/OrderedProductPreview")
);

interface ContractType {
  id: number;
  title: string;
  createdDate: string;
  stat: string;
  client: string;
  fileUrl: string;
}

/**
 * Manage order page
 */
const ManageOrderPage: React.FC = () => {
  const [contractList, setContractList] = useState<ContractType[]>([]);

  // Fetch ordered products
  useEffect(() => {
    fetch("/data/contracts.json")
      .then((res) => res.json())
      .then(({ data }) => {
        setContractList(data);
      });
  }, []);

  return (
    <PageWrapper>
      <ContentBox name="Manage Contracts" showSearch>
        <>
          <div className="border-b border-b-glitch-box">
            <SortByTag
              tags={["Signed (1)", "Pending (0)", "Archived (0)"]}
            />
          </div>

          {/* Products list */}
          <div className="mt-5"></div>
          <Suspense fallback={<LoadingIndicator />}>
            <ul className="px-5 bg-transparent">
                  <li
                    className="block mt-4 pb-4 border-b border-b-glitch-box last:border-none"
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
    </PageWrapper>
  );
};

export default ManageOrderPage;
