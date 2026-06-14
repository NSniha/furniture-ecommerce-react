import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <section className="min-h-screen bg-[#f8f8f6] px-6 pb-24 pt-32">
      <div className="mx-auto max-w-[1380px]">
        <h1 className="text-[64px] text-[#111111]">
          Shop
        </h1>

        <Link
          to="/shop-details/1"
          className="mt-10 inline-flex bg-[#111111] px-6 py-4 text-white no-underline"
        >
          View Shop Details
        </Link>
      </div>
    </section>
  );
};

export default Shop;