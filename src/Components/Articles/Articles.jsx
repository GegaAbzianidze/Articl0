import { useEffect, useState } from "react";
import ArticlesCard from "./ArticlesCard";
import { supabase } from "../../SupabaseClient";
import ArticleSkeleton from "../../Skeletons/ArticleSkeleton";

const Articles = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("Articl0").select("*");

      if (error) {
        console.log(error);
      }

      if (data) {
        setData(data);
        console.log(data);
      }
    };
    getData();
  }, []);

  if (data.length === 0)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 px-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index}>
            <ArticleSkeleton />
          </div>
        ))}
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-6">
        {data.map((article) => (
          <div key={article.id} className="borderCenter">
            <ArticlesCard item={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
