import Logos from "@/components/Logos";
import ProductList from "@/components/ProductList";

import { newArrivals, topSelling, productStyles } from "@/data/product";

const Home = () => {
  return (
    <>
      <div className="bg-grey-primary px-global">
        <div className="container mx-auto">
          <h1 className="typo-h1">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        </div>
      </div>
      <Logos />
      <div className="px-global">
        <div className="container mx-auto">
          <div className="mt-12 mb-10 lg:mt-18 lg:mb-16">
            <h2 className="typo-h2 text-center mb-8">New Arrivals</h2>
            <ProductList products={newArrivals} />
            <div className="flex mt-6 lg:mt-9 lg:justify-center">
              <div className="grow lg:grow-0">
                <button className="w-full py-4 px-13 border rounded-[62px] font-medium">
                  <span className="lg:min-w-28 block">View All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-global">
        <div className="container mx-auto">
          <div className="my-10 lg:my-16 bg-black/10 h-px w-full"></div>
        </div>
      </div>
      <div className="px-global">
        <div className="container mx-auto">
          <div className="mt-10 mb-12 lg:mt-16 lg:mb-20">
            <h2 className="typo-h2 text-center mb-8">Top Selling</h2>
            <ProductList products={topSelling} />
            <div className="flex mt-6 lg:mt-9 lg:justify-center">
              <div className="grow lg:grow-0">
                <button className="w-full py-4 px-13 border rounded-[62px] font-medium">
                  <span className="lg:min-w-28 block">View All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-global">
        <div className="container mx-auto">
          <div className="bg-grey-primary pt-10 pb-7 px-6 rounded-[1.25rem] lg:py-18 lg:px-16 lg:rounded-[2.5rem]">
            <h2 className="typo-h2 text-center">BROWSE BY dress STYLE</h2>
            <div className="mt-7 flex gap-y-4 flex-col lg:grid lg:grid-cols-13 lg:gap-5">
              {productStyles.map((productStyle) => (
                <div className="h-48 bg-white rounded-3xl py-4 px-6 relative lg:h-72 lg:col-span-8 lg:first:col-span-5 lg:last:col-span-5">
                  <span className="text-2xl capitalize font-bold z-10 relative">{productStyle.name}</span>
                  <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
                    <img className="w-full h-full object-cover" src={productStyle.img} alt={productStyle.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-global">
        <div className="container mx-auto">
          <div className="my-12 lg:my-20">
            <h2 className="typo-h2">OUR HAPPY CUSTOMERS</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
