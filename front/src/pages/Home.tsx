import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from '../components/Product';
import { useProducts } from '../hooks/fetchProducts';
import "../styles/Home.css";

const HomePage: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="home-page">
      <header>
        <h1>Bienvenue sur Epikatana, la référence du katana</h1>
      </header>
      <main>
        <p>Bienvenue sur Epikatana, votre destination ultime pour trouver le katana parfait. Explorez notre boutique et plongez dans notre vaste collection de pièces uniques et authentiques. Que vous soyez un amateur passionné d'arts martiaux ou un collectionneur chevronné, vous trouverez sûrement votre perle rare ici.</p>
        <div className="slider">
          <Slider {...settings}>
            {products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                photo={product.photo}
              />
            ))}
          </Slider>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
