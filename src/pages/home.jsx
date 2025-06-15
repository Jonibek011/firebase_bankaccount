function home() {
  return (
    <div className=" grid grid-cols-2 grid-rows-10 min-h-screen h-[130vh] min-w-full gap-2 md:gap-5 py-5 md:py-10">
      <div className="border border-red-500 col-span-full">1</div>
      <div className="border border-red-500 row-span-2">2</div>
      <div className="border border-red-500 row-span-2">3</div>
      <div className="border border-red-500 col-span-full row-span-5">4</div>
      <div className="border border-red-500 row-span-2">5</div>
      <div className="border border-red-500 row-span-2">6</div>
    </div>
  );
}

export default home;
