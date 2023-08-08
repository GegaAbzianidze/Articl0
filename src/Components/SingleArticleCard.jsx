import PropTypes from "prop-types";

const SingleArticleCard = ({ item }) => {
  const date = new Date(item.created_at);
  const formattedDate = date.toLocaleDateString();
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold font-sans">{item.Title}</h1>
      <h2 className="text-xl text-gray-600 font-sans">{formattedDate}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: item.Article }}
        className="prose text-xl font-sans"
      />
    </div>
  );
};

export default SingleArticleCard;

SingleArticleCard.propTypes = {
  item: PropTypes.object.isRequired,
};
