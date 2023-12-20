import React, { Fragment } from "react"; // Import React and Fragment from the 'react' library
import './styles/Home.css' // Import an external CSS file

function Home() {
  return (
    <Fragment>
      {/* Start of the Home component */}
      <section className="container-home-center-img">
        <div className="overlay">
          <div className="container-home-logo">
            <span className="container-home-logo-span">
              {" "}
              SALES{" "}
              <span>
                {/* Create a span with a font-awesome icon */}
                <i className="fa-solid fa-star"></i>
              </span>
              APP{" "}
            </span>
          </div>
        </div>
      </section>
      {/* End of the Home component */}
    </Fragment>
  );
}

export { Home }; // Export the Home component for use in other parts of the application
