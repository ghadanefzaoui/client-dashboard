import React, { Suspense, useEffect, useState } from "react";
import ContentBox from "../components/contents/ContentBox";
import DisplaySection from "../components/DisplaySection";
import LoadingIndicator from "../components/LoadingIndicator";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import configs from "../configs.json";
import MoneyIcon from "../assets/images/money.svg";
import MoneyReceivedIcon from "../assets/images/money-received.svg";
import Button from "../components/Button";

const TransactionsProductPreview = React.lazy(
  () => import("../components/products/TransactionsProductPreview")
);

interface TransactionsTypes {
  date: string;
  time: string;
  image: string;
  price: number;
  status: string;
  productId: number;
}

const PaymentPage: React.FC = () => {
  const [transactionsList, setTransactionsList] = useState<TransactionsTypes[]>(
    []
  );

  // Fetch transaction
  useEffect(() => {
    fetch(`/data/transactions.json`)
      .then((res) => res.json())
      .then(({ data }) => {
        setTransactionsList(data);
      });
  }, []);

  return (
    <PageWrapper>
      <div className="w-full">
        <div>
          <h1 className="text-lg text-black-100 font-bold leading-5">
            Payments
          </h1>
          <p className="text-black-300 leading-5">
            Welcome back {configs.userName.split(" ")[0]}, Your payment status
            looking good.
          </p>
        </div>

        {/* Payment profile */}
        <ContentBox name="Payment profile">
          <div className="border-b text-black mb-5"></div>
          <div className="px-5 pb-5">
            <div className="grid grid-cols-2 text-white">
              <span className="py-2 mr-5 border-b text-black">
                Type:
              </span>
              <span className="py-2 border-b text-black">
                Visa (Primary)
              </span>

              <span className="py-2 mr-5 border-b text-black">
                Number:
              </span>
              <span className="py-2 border-b text-black">
                43xxxxxxxxxxxxx2
              </span>

              <span className="py-2 mr-5 border-b text-black">
                Exp Date:
              </span>
              <span className="py-2 border-b text-black">5/5/24</span>

              <span className="py-2 mr-5 border-b text-black">
                Codeholder Name:
              </span>
              <span className="py-2 border-b text-black">
                Aryna sabalenka
              </span>
            </div>

            <div className="mt-5">
              <Button className="bg-glitch-orange">
                <span className="material-icons text-lg">add</span>
                <span className="ml-1">Add New</span>
              </Button>
            </div>
          </div>
        </ContentBox>

        <ContentBox name="Online Payments" showSearch>
          <>
            <div className="border-b text-black">
              {/* Sort payment */}
              <SortByTag
                tags={["On hold (0)", "Payouts (1)", "Refunds (0)"]}
                defaultActiveIndex={1}
              />
            </div>

            {/* Products list */}
            <div className="mt-5"></div>
            <Suspense fallback={<LoadingIndicator />}>
              <ul className="px-5 bg-transparent">
                <li
                        className="block mt-4 pb-4 border-b text-black last:border-none"
                      >
                        <TransactionsProductPreview
                          orderId={1}
                          date="2025-01-10"
                          time="03:45 PM"
                          image="https://i.pinimg.com/originals/24/bb/e6/24bbe63026ae59fe39ae8a61d9fe5798.png"
                          price={120}
                          status="Signed"
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

export default PaymentPage;
