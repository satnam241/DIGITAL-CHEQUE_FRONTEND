import React from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate("/plans"); 
  };
  return (
    <section className="bg-#ffffff text-[#00a274] mt-5"
    style={{ backgroundColor: "#ffffff", color: "#00a274" }}>
      {/* Heading */}
      <h2 className="text-center mb-5 fw-bold">
        Say bye-bye to hand-written cheques
      </h2>

      {/* Image Section */}
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={7}>
            <Carousel fade interval={2500} className="shadow rounded">
              <Carousel.Item>
                <img
                  src="/SBI-Bank-Cheque.jpg"
                  alt="Cheque Sample 1"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/Axis-Bank-Cheque.jpg"
                  alt="Cheque Sample 2"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/SBI-Bank-Cheque.jpg"
                  alt="Cheque Sample 3"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/Axis-Bank-Cheque.jpg"
                  alt="Cheque Sample 4"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
   

      {/* Tagline Section */}
      <div className="text-white text-center py-3 mt-4"
      style={{ backgroundColor: "#002141"}}>
        <h5 className="fw-bold">
          ChequeMan – Smart & Easy Software for Cheque Printing
        </h5>
      </div>

      {/* Features Section */}
      <Container className="text-center py-4" style={{ backgroundColor: "#febfcc" }}>
        <Row>
          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon1-b.png"
              alt="Quick Smart Cheques"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">Quick, Smart, Error-free Cheques</p>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon2-b.png"
              alt="Use Normal Cheques"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">Use normal Cheques for printing</p>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon3-b.png"
              alt="No Smudges"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">No smudges, No overwriting</p>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon4-b.png"
              alt="Compatible Printers"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">
              Compatible with most standard printers
            </p>
          </Col>
        </Row>
      </Container>

      {/* Benefits Section */}
      <div className="container-fluid py-5" style={{ backgroundColor: "white" }}>
        <Container className="text-center">
          <h3 className="fw-bold text-primary mb-4">Benefits of ChequeMan</h3>
          <Row className="text-start">
            {/* Left Column */}
            <Col md={6} className="mb-3 text-dark justify-start ml-5 justify-flex">
              <p>✅ Supports multiple Account Holders & Banks</p>
              <p>✅ Professionally printed cheques - enhances image</p>
              <p>✅ Bulk Printing - EMI, Batch, Excel Import</p>
              <p>✅ Web import of ready to use cheque formats</p>
              <p>✅ Works in existing environment of computer and printer</p>
            </Col>

            {/* Right Column */}
            <Col md={6} className="mb-3 text-dark justify-start mr-1 justify-flex">
              <p>✅ Printing of incomplete cheques</p>
              <p>✅ Information on issued cheques at fingertips</p>
              <p>✅ Managing all cheques from a single point</p>
              <p>
                ✅ Backup & Restoration of Data (including scanned Cheque
                formats)
              </p>
              <p>✅ Manual cheques, Post-dated cheques</p>
            </Col>
          </Row>

          {/* Download Button */}
          <div className="mt-4">
          <Button variant="dark" size="lg" className="fw-bold" onClick={handleTryNow}>
      TRY NOW
    </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;


