export default function Logos() {
  const logos = [
    { url: "/logos/versace.png" },
    { url: "/logos/zara.png" },
    { url: "/logos/gucci.png" },
    { url: "/logos/prada.png" },
    { url: "/logos/ck.png" },
  ];

  return (
    <div className="px-global bg-black">
      <div className="container mx-auto">
        <div className="py-10 lg:py-11">
          <div className="flex flex-wrap gap-y-4 gap-x-8 items-center justify-center lg:justify-between">
            {logos.map((logo) => (
              <img src={logo.url} className="max-w-25 max-h-7" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
