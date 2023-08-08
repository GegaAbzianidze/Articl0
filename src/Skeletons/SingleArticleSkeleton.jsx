const SingleArticleSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <h1 className="w-96 h-8 bg-slate-400"></h1>
      <h2 className="bg-slate-400 w-36 h-6"></h2>
      <div className="w-full h-screen bg-slate-300" />
    </div>
  );
};

export default SingleArticleSkeleton;
