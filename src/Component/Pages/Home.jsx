import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import FoodCard from "../../Shared/FoodCard";
import { ArrowRight, Heart, Users, Utensils, Globe } from "lucide-react";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/foods") 
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, []);

  const featuredFoods = foods
    .filter((food) => food.status === "available")
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-10">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          ShareBite - Share More, Waste Less 🍽️
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A community-driven food sharing platform to reduce food waste and feed people in need.
        </p>
        <Link
          to="/available-foods"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Explore Available Foods <ArrowRight />
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-center">
        <div>
          <Users className="mx-auto text-green-500" size={36} />
          <h4 className="font-bold text-lg">1200+</h4>
          <p className="text-gray-500">Registered Users</p>
        </div>
        <div>
          <Utensils className="mx-auto text-green-500" size={36} />
          <h4 className="font-bold text-lg">3500+</h4>
          <p className="text-gray-500">Food Donations</p>
        </div>
        <div>
          <Globe className="mx-auto text-green-500" size={36} />
          <h4 className="font-bold text-lg">15</h4>
          <p className="text-gray-500">Serving Regions</p>
        </div>
        <div>
          <Heart className="mx-auto text-green-500" size={36} />
          <h4 className="font-bold text-lg">99%</h4>
          <p className="text-gray-500">Positive Feedback</p>
        </div>
      </div>

      {/* Featured Foods Section */}
        {/* Featured Foods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Foods</h2>
              <p className="text-xl text-gray-600">Fresh food available in your community</p>
            </div>
            <Link 
              to="/available-foods"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
