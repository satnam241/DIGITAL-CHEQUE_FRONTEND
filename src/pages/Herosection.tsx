import React from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate("/plans"); 
  };
  return (
    <section
      className="bg-#ffffff text-[#00a274] mt-5"
      style={{ backgroundColor: "#ffffff", color: "rgb(12 119 111)" }}
    >
      {/* Heading */}
      <h2 className="text-center mb-5 fw-bold">
        Say goodbye to handwritten cheques forever
      </h2>
  
      {/* Image Section */}
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={7}>
            <Carousel fade interval={2500} className="shadow rounded">
              <Carousel.Item>
                <img
                  src="/SBI-Bank-Cheque.jpg"
                  alt="Digital Cheque Sample 1"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/Axis-Bank-Cheque.jpg"
                  alt="Digital Cheque Sample 2"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/SBI-Bank-Cheque.jpg"
                  alt="Digital Cheque Sample 3"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/Axis-Bank-Cheque.jpg"
                  alt="Digital Cheque Sample 4"
                  className="d-block w-100 rounded"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
  
      {/* Tagline Section */}
      <div
        className="text-white text-center py-3 mt-4"
        style={{ backgroundColor: "#002141" }}
      >
        <h5 className="fw-bold">
          PlanningEarth ChequeService – The Smarter, Faster & More Reliable Way to
          Print Cheques
        </h5>
      </div>
  
      {/* Features Section */}
      <Container
        className="text-center py-4"
        style={{ backgroundColor: "#febfcc" }}
      >
        <Row>
          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon1-b.png"
              alt="Quick Smart Cheques"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">
              Generate Cheques Instantly — Accurate, Smart & Hassle-Free
            </p>
          </Col>
  
          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon2-b.png"
              alt="Use Normal Cheques"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">
              Works Seamlessly with Your Regular Cheque Books
            </p>
          </Col>
  
          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon3-b.png"
              alt="No Smudges"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">
              Clean Prints, Zero Errors — No Smudges or Overwriting
            </p>
          </Col>
  
          <Col md={3} sm={6} className="mb-3">
            <img
              src="/icon4-b.png"
              alt="Compatible Printers"
              className="mb-2"
              style={{ height: "60px" }}
            />
            <p className="fw-bold text-dark">
              Compatible with All Standard Inkjet & Laser Printers
            </p>
          </Col>
        </Row>
      </Container>
  
      {/* Benefits Section */}
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "white" }}
      >
        <Container className="text-center">
          <h3 className="fw-bold text-primary mb-4">
            Why Choose PlanningEarth CheuqeService?
          </h3>
          <Row className="text-start">
            {/* Left Column */}
            <Col md={6} className="mb-3 text-dark">
              <p>✅ Manage Multiple Accounts & Bank Profiles with Ease</p>
              <p>✅ Get Professionally Printed Cheques Every Time</p>
              <p>✅ Access Ready-to-Use Cheque Templates Online</p>
              <p>
                ✅ Works Perfectly with Your Existing Computer & Printer Setup
              </p>
            </Col>
  
            {/* Right Column */}
            <Col md={6} className="mb-3 text-dark">
              <p>✅ Print Complete or Partial Cheques Effortlessly</p>
              <p>✅ Track All Issued Cheques Instantly</p>
              <p>✅ Centralized Cheque Management Dashboard</p>
              <p>✅ Quick Backup & Secure Data Restoration</p>
              <p>✅ Supports Manual, Post-Dated & Repetitive Cheques</p>
            </Col>
          </Row>
  
          {/* Download Button */}
          <div className="mt-4">
            <Button
              variant="dark"
              size="lg"
              className="fw-bold"
              onClick={handleTryNow}
            >
              TRY NOW
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
  
}
  
export default HeroSection;

