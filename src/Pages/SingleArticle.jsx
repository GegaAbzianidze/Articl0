import { useNavigate, useParams } from "react-router-dom";
import SingleArticleCard from "../Components/SingleArticleCard";
import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import SingleArticleSkeleton from "../Skeletons/SingleArticleSkeleton";

const SingleArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("Articl0")
          .select()
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Failed to fetch article data");
        }

        if (data) {
          setArticle(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
        navigate("/", { replace: true });
      }
    };

    fetchSingleArticle();
  }, [id, navigate]);

  return (
    <div className="px-12 md:px-52 lg:px-64 xl:px-[450px]">
      {article ? (
        <SingleArticleCard item={article} />
      ) : (
        <SingleArticleSkeleton />
      )}
      <hr className="my-10" />
      <div className="flex justify-center items-center">
        <h1 className="text-md flex gap-2 font-sans text-gray-500 mb-10">
          Published with <p className="font-bold">Articl0</p>
        </h1>
      </div>
    </div>
  );
};

export default SingleArticle;
