import { Container, Row, Col } from "react-bootstrap";

const HowToUseSection: React.FC = () => {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #f9f1e6, #ffffff)",
      }}
    >
      <Container>
        {/* Heading */}
        <h2
          className="text-center fw-bold mb-5 px-2"
          style={{ color: "#0c776f" }}
        >
          How to Use PlanningEarth ChequeService
        </h2>

        <Row className="align-items-center">
          {/* IMAGE */}
          <Col
            xs={12}
            md={6}
            className="mb-4 mb-md-0 text-center"
          >
            <img
              src="/print-page.png"
              alt="How to Print Cheque"
              className="img-fluid rounded shadow"
              style={{
                maxHeight: "420px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Col>

          {/* STEPS */}
          <Col xs={12} md={6}>
            {/* STEP 1 */}
            <div className="mb-4 d-flex align-items-start gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#0c776f",
                  color: "#fff",
                  fontSize: "0.9rem",
                }}
              >
                1
              </div>
              <div>
                <h6 className="fw-bold mb-1">Login & Select Bank</h6>
                <p className="text-muted mb-0 small">
                  Login to your account and choose the bank & cheque format you
                  want to use.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="mb-4 d-flex align-items-start gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#0c776f",
                  color: "#fff",
                  fontSize: "0.9rem",
                }}
              >
                2
              </div>
              <div>
                <h6 className="fw-bold mb-1">Enter Cheque Details</h6>
                <p className="text-muted mb-0 small">
                  Fill payee name, date, amount (numbers & words) and other
                  cheque details.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="mb-4 d-flex align-items-start gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#0c776f",
                  color: "#fff",
                  fontSize: "0.9rem",
                }}
              >
                3
              </div>
              <div>
                <h6 className="fw-bold mb-1">Preview & Align</h6>
                <p className="text-muted mb-0 small">
                  Preview cheque layout and adjust alignment to perfectly match
                  your cheque book.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#0c776f",
                  color: "#fff",
                  fontSize: "0.9rem",
                }}
              >
                4
              </div>
              <div>
                <h6 className="fw-bold mb-1">Print Instantly</h6>
                <p className="text-muted mb-0 small">
                  Insert your cheque in the printer and print clean,
                  professional cheques in seconds.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HowToUseSection;
