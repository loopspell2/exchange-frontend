import Image from "next/image";
// import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      {/* <Navbar/> */}
      <div className="flex flex-col justify-center items-center">
        <div className="mt-10 p-4 text-5xl">
          Get direct access to Exchange
        </div>
        <div className="m-4 text-3xl w-7/12 text-center">
          Our high throughput APIs connect you to the deepest pool of liquidity of any regulated crypto spot exchange.
        </div>
        <div className="mx-5 p-5">
          <Image
            src="/exchange-hero.png"
            width={1000}
            height={800}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
