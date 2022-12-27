import "./Header.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/category");
      setCats(res.data);
    };
    getCategory();
  }, []);

  return (
    <div className="header">
      {/* <div className='headerTitle'>
        <span className='titleSm'>Node</span>
        <span className='titleLg'>Javascript</span>
      </div> */}
      {/* <img className='headerImg' src={'https://picsum.photos/200'} alt=''/> */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 slider-image"
              src="https://picsum.photos/803/340"
              alt="First slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3 className="sliderTitle">TemxTech Blogger</h3>
              <p className="sliderText">
                Find all our bloggers for latest blog update and edition
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 slider-image"
              src="https://picsum.photos/802/340"
              alt="Second slide"
            />

            <div className="carousel-caption d-none d-md-block">
              <h3 className="sliderTitle">Latest Post</h3>
              <p className="sliderText">
                Our latest post available weekly for our follower.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 slider-image"
              src="https://picsum.photos/801/34"
              alt="Third slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3 className="text-capitalize sliderTitle">Follow Us</h3>
              <p className="sliderText">
                Make sure to follow us on social media and other platform
              </p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className="topics row">
        <ul className="topicItems">
          {cats.map((cat) => (
            <Link
              to={`/?cat=${cat.name}`}
              // params={{ error: error }}
              className="Link"
              key={cat._id}
            >
              <li className="topicLists">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
