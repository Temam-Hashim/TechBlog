import "./about.css";

function about() {
  const images = [
    {
      id: 1,
      url: "https://picsum.photos/299/",
    },
    {
      id: 2,
      url: "https://picsum.photos/298/",
    },
    {
      id: 3,
      url: "https://picsum.photos/297/",
    },
    {
      id: 4,
      url: "https://picsum.photos/296/",
    },
    {
      id: 5,
      url: "https://picsum.photos/295/",
    },
    {
      id: 6,
      url: "https://picsum.photos/294/",
    },
    {
      id: 7,
      url: "https://picsum.photos/293/",
    },
    {
      id: 8,
      url: "https://picsum.photos/292/",
    },
  ];
  return (
    <div className="about">
      <div class="col-md-3"></div>
      <div className="row views">
        <img src="https://picsum.photos/900/200" className="topImage" alt="" />
        <div className="col-md-3 mission">
          <h4 className="main-title">Our Mission</h4>
          <h4 className="sub-title">What we thrives to Accomplish</h4>
          <p className="desc">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. lorem ipsum may be
            used as a placeholder before final copy is available.
          </p>
        </div>
        <div className="col-md-3 about-us">
          <h4 className="main-title">About Tcoder</h4>
          <h4 className="sub-title">What Makes Us Different</h4>
          <p className="desc">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. lorem ipsum may be
            used as a placeholder before final copy is available.
          </p>
        </div>
        <div className="col-md-3 vission">
          <h4 className="main-title">Our Vision</h4>
          <h4 className="sub-title">What is future Prospect</h4>
          <p className="desc">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. lorem ipsum may be
            used as a placeholder before final copy is available.
          </p>
        </div>
        <div className="middle">
          <h1 className="middleTitle text-center">OUR PEOPLES.</h1>
        </div>
        <div className="bottom">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active peopleTab"
                id="pills-all-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-all"
                type="button"
                role="tab"
                aria-controls="pills-all"
                aria-selected="true"
              >
                All
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-executive-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-executive"
                type="button"
                role="tab"
                aria-controls="pills-executive"
                aria-selected="false"
              >
                Executive
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-sales-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-sales"
                type="button"
                role="tab"
                aria-controls="pills-sales"
                aria-selected="false"
              >
                Sales
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-client-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-client"
                type="button"
                role="tab"
                aria-controls="pills-client"
                aria-selected="false"
              >
                Client Services
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-creative-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-creative"
                type="button"
                role="tab"
                aria-controls="pills-creative"
                aria-selected="false"
              >
                Creative Services
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-content-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-content"
                type="button"
                role="tab"
                aria-controls="pills-content"
                aria-selected="false"
              >
                Contents
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-technology-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-technology"
                type="button"
                role="tab"
                aria-controls="pills-technology"
                aria-selected="false"
              >
                Technology
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link peopleTab"
                id="pills-demand-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-demand"
                type="button"
                role="tab"
                aria-controls="pills-demand"
                aria-selected="false"
              >
                Demand Generation
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            {/*   all */}
            <div
              className="tab-pane fade show active"
              id="pills-all"
              role="tabpanel"
              aria-labelledby="pills-all-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* sales */}
            <div
              className="tab-pane fade"
              id="pills-sales"
              role="tabpanel"
              aria-labelledby="pills-sales-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* executive */}
            <div
              className="tab-pane fade"
              id="pills-executive"
              role="tabpanel"
              aria-labelledby="pills-executive-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* client */}
            <div
              className="tab-pane fade"
              id="pills-client"
              role="tabpanel"
              aria-labelledby="pills-client-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* creative  */}
            <div
              className="tab-pane fade"
              id="pills-creative"
              role="tabpanel"
              aria-labelledby="pills-creative-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* content */}
            <div
              className="tab-pane fade"
              id="pills-content"
              role="tabpanel"
              aria-labelledby="pills-content-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* technology */}
            <div
              className="tab-pane fade"
              id="pills-technology"
              role="tabpanel"
              aria-labelledby="pills-technology-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            {/* demand */}
            <div
              className="tab-pane fade"
              id="pills-demand"
              role="tabpanel"
              aria-labelledby="pills-demand-tab"
            >
              <div className="row">
                {images.map((image) => (
                  <div className="col-md-3 displayImage" key={image.id}>
                    <img className="people-image" src={image.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;
