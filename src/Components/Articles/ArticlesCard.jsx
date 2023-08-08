import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ArticlesCard = ({ item }) => {
  const navigate = useNavigate();
  const date = new Date(item.created_at);
  const formattedDate = date.toLocaleDateString();

  const Article = `<p>${item.Article}</p>`;

  return (
    <>
      <div className="p-4 md:p-14 h-full flex flex-col gap-1">
        <h1 className="text-3xl font-bold">{item.Title}</h1>
        <p className="text-xl font-light text-gray-500">{formattedDate}</p>
        <p className="text-md flex gap-2">
          From <p className="link text-blue-600">{item.Author}</p>
        </p>
        <div className="relative">
          <div
            dangerouslySetInnerHTML={{ __html: Article }}
            className="text-xl line-clamp-4 "
          />
          <span className="gradient-fade"></span>
        </div>
        <div className="flex gap-3 text-lg text-gray-600 ">
          <button
            className="link-hover hover:text-black"
            onClick={() => navigate(`article/${item.id}`)}
          >
            Read More...
          </button>
        </div>
      </div>
    </>
  );
};

export default ArticlesCard;

ArticlesCard.propTypes = {
  item: PropTypes.object.isRequired,
};
