const ArticleSkeleton = () => {
  return (
    <div>
      <div className="p-4 md:p-14 h-full flex flex-col gap-1 animate-pulse">
        <h1 className="text-3xl font-bold w-2/3 h-7 bg-slate-400"></h1>
        <p className="w-24 h-5 bg-slate-400"></p>
        <p className="text-md flex gap-2 items-center">
          From <p className="h-3 w-14 bg-slate-400"></p>
        </p>
        <div className="relative">
          <div className="text-xl line-clamp-4 h-56 bg-slate-300" />
          <span className="gradient-fade"></span>
        </div>
        <div className="flex gap-3 text-lg text-gray-600 ">
          <button className="link-hover hover:text-black">Read More...</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
