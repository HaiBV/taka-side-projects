import Logos from "@/components/Logos";
import ProductCard from "@/components/ProductCard";

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
            <div className="grid grid-cols-7 lg:grid-cols-12 gap-4 lg:gap-5">
              {[...new Array(4).fill(0)].map((_, index) => (
                <div className="col-span-4 lg:col-span-3">
                  <ProductCard key={index} />
                </div>
              ))}
            </div>
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
            <div className="grid grid-cols-7 lg:grid-cols-12 gap-4 lg:gap-5">
              {[...new Array(4).fill(0)].map((_, index) => (
                <div className="col-span-4 lg:col-span-3">
                  <ProductCard key={index} />
                </div>
              ))}
            </div>
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
