import Articles from "../Components/Articles/Articles";

const Article = () => {
  return (
    <div>
      <div className="py-14 flex flex-col">
        <h1 className="justify-center text-center gap-2 flex text-xl text-gray-600 flex-col md:flex-row">
          Want to join in? Respond to our{" "}
          <p className="underline">weekly writing prompts,</p> open to everyone.
        </h1>
        <div className="flex gap-3 mt-5 justify-center">
          <h2 className="flex text-xl text-gray-400">
            #<a className="hover:link-hover text-blue-600">Poetry</a>
          </h2>
          <h2 className="flex text-xl text-gray-400">
            #<a className="hover:link-hover text-blue-600">Journal</a>
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center mb-5">
        <hr className="w-1/3" />
      </div>
      <Articles />
    </div>
  );
};

export default Article;
