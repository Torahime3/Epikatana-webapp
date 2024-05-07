import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";

const HomePage: React.FC = () => {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="bg_image_red"> </div>
      <div className="home-page">
        <div className="title">
          <h1>Epikatana, la reference du katana</h1>
        </div>
        <div className="body">
          <p>Bienvenue sur Epikatana, votre destination ultime pour trouver le katana parfait. Explorez notre boutique et plongez dans notre vaste collection de pièces uniques et authentiques. Que vous soyez un amateur passionné d'arts martiaux ou un collectionneur chevronné, vous trouverez sûrement votre perle rare ici.</p>
          <div className="slider">
            <Slider {...settings}>
              <div>
                <img src="https://images.unsplash.com/photo-1662826321315-c72a74f871c0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="katana" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1671015522549-e7aa41ded44f?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="katana" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1711725637816-b0755c582c86?q=80&w=3133&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="katana" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1673714220645-674fcab11e62?q=80&w=3155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="katana" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1713766056256-9cb07ceda9e5?q=80&w=3014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="katana" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1542367787-4baf35f3037d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="katana" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
