import { useParams } from "react-router-dom";

const ShopDetails = () => {
  const { productId } = useParams();

  return (
    <section className="min-h-screen bg-[#f8f8f6] px-6 pb-24 pt-32">
      <div className="mx-auto max-w-[1380px]">
        <h1 className="text-[64px] text-[#111111]">
          Shop Details
        </h1>

        <p className="mt-5 text-[20px] text-[#666666]">
          Product ID: {productId}
        </p>
      </div>
    </section>
  );
};

export default ShopDetails;