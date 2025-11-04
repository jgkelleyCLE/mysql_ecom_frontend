import { Link } from 'react-router-dom';

const CategoryCard = ({ title, image }) => {
  return (
    <Link to={`/category/${title}`}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover rounded-md shadow-md shadow-black/20 hover:scale-110"
        />
        <div className="bg-black/25 absolute top-0 left-0 z-10 w-full h-full rounded-md hover:bg-black/5 transition duration-200"></div>
        <h1 className="absolute bottom-1 right-2 text-white text-3xl font-bold z-10">{title}</h1>
      </div>
    </Link>
  );
};

export default CategoryCard;
