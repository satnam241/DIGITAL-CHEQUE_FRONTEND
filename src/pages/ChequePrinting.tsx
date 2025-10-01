import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {USER_AUTH,ENDPOINTS } from "../utils/constant";
interface BankLayout {
  date: {
    top: string;
    right: string;
    letterSpacing?: string;
  };
  payto: {
    top: string;
    left: string;
  };
  words: {
    top: string;
    left: string;
  };
  number: {
    top: string;
    right: string;
  };
}

interface ChequeData {
  date: string;
  payTo: string;
  amountWords: string;
  amountNumber: string;
}

const ChequePrinter: React.FC = () => {
  const [chequeData, setChequeData] = useState<ChequeData>({
    date: "",
    payTo: "",
    amountWords: "",
    amountNumber: "",
  });

  const [selectedBank, setSelectedBank] = useState<string>("sbi");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);

  // ✅ Bank Layouts
  const bankLayouts: Record<string, BankLayout> = {
    sbi: {
      date: { top: "17mm", right: "-3mm", letterSpacing: "3.5mm" },
      payto: { top: "30mm", left: "30mm" },
      words: { top: "40mm", left: "24mm" },
      number: { top: "47mm", right: "6mm" },
    },
    axis: {
      date: { top: "16mm", right: "0mm", letterSpacing: "3.5mm" },
      payto: { top: "30mm", left: "30mm" },
      words: { top: "40mm", left: "24mm" },
      number: { top: "50mm", right: "6mm" },
    },
    pnb: {
      date: { top: "17mm", right: "-1mm", letterSpacing: "3.5mm" },
      payto: { top: "30mm", left: "30mm" },
      words: { top: "40mm", left: "24mm" },
      number: { top: "50mm", right: "3mm" },
    },
    hdfc: {
      date: { top: "16mm", right: "-5mm", letterSpacing: "3.7mm" },
      payto: { top: "30mm", left: "30mm" },
      words: { top: "40mm", left: "24mm" },
      number: { top: "50mm", right: "4mm" },
    },
    indusind: {
      date: { top: "18mm", right: "-5mm", letterSpacing: "3.7mm" },
      payto: { top: "30mm", left: "30mm" },
      words: { top: "40mm", left: "24mm" },
      number: { top: "50mm", right: "4mm" },
    },
    kotak: {
      date: { top: "18mm", right: "-4mm", letterSpacing: "3.7mm" },
      payto: { top: "30mm", left: "30mm" },
      words: { top: "41mm", left: "24mm" },
      number: { top: "50mm", right: "4mm" },
    },
    boi: {
      date: { top: "19mm", right: "-4mm", letterSpacing: "3.5mm" },
      payto: { top: "32mm", left: "30mm" },
      words: { top: "41mm", left: "24mm" },
      number: { top: "50mm", right: "5mm" },
    },
  };

  // ✅ Number to words conversion
  const numberToWords = (num: string): string => {
    if (!num || num === "0") return "";

    const number = parseInt(num);
    if (isNaN(number) || number < 0) return "";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertHundreds = (n: number): string => {
      let result = "";
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      }
      if (n > 0) {
        result += ones[n] + " ";
      }
      return result;
    };

    if (number === 0) return "Zero";

    let result = "";
    let croresPart = Math.floor(number / 10000000);
    let lakhsPart = Math.floor((number % 10000000) / 100000);
    let thousandsPart = Math.floor((number % 100000) / 1000);
    let hundredsPart = number % 1000;

    if (croresPart > 0) {
      result += convertHundreds(croresPart) + "Crore ";
    }
    if (lakhsPart > 0) {
      result += convertHundreds(lakhsPart) + "Lakh ";
    }
    if (thousandsPart > 0) {
      result += convertHundreds(thousandsPart) + "Thousand ";
    }
    if (hundredsPart > 0) {
      result += convertHundreds(hundredsPart);
    }

    return result.trim() + " Only";
  };

  // ✅ Input Handler
  const handleInputChange = (field: keyof ChequeData, value: string) => {
    if ((field === "date" || field === "amountNumber") && !/^[0-9]*$/.test(value)) {
      return;
    }

    setChequeData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "amountNumber") {
        updated.amountWords = numberToWords(value);
      }

      return updated;
    });
  };

  // ✅ Preview Handler
  const handlePreview = () => {
    if (!chequeData.date || !chequeData.payTo || !chequeData.amountNumber) {
      alert("Please fill Date, Pay To, and Amount fields.");
      return;
    }
    setIsPreviewVisible(true);
  };

  // ✅ Print Handler
  const handlePrint = () => {
    if (!isPreviewVisible) {
      alert("Please preview the cheque first.");
      return;
    }
    window.print();
  };

  // ✅ Format Words
  const formatAmountWords = (words: string): string => {
    if (!words) return "";
    const wordsArray = words.trim().split(/\s+/);
    let formatted = "*** ";
    for (let i = 0; i < wordsArray.length; i++) {
      formatted += wordsArray[i] + " ";
      if ((i + 1) % 8 === 0) formatted += "\n\n";
    }
    formatted += "***";
    return formatted.trim();
  };

  const getCurrentLayout = (): BankLayout => bankLayouts[selectedBank];

  // ✅ Styles
  const chequeStyles = {
    date: {
      position: "absolute" as const,
      fontSize: "14px",
      fontFamily: "Courier New, monospace",
      ...getCurrentLayout().date,
    },
    payto: {
      position: "absolute" as const,
      fontSize: "14px",
      fontFamily: "Courier New, monospace",
      ...getCurrentLayout().payto,
    },
    words: {
      position: "absolute" as const,
      fontSize: "14px",
      fontFamily: "Courier New, monospace",
      whiteSpace: "pre-line" as const,
      ...getCurrentLayout().words,
    },
    number: {
      position: "absolute" as const,
      fontSize: "14px",
      fontFamily: "Courier New, monospace",
      ...getCurrentLayout().number,
    },
  };

  // ✅ Fetch Data Once
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await api(`${USER_AUTH}${ENDPOINTS.CHEQUE_PRINTING}`);
        if (data) {
          setChequeData({
            date: data.date || "",
            payTo: data.payTo || "",
            amountNumber: data.amountNumber || "",
            amountWords: numberToWords(data.amountNumber || ""),
          });
        }
      } catch (err) {
        console.error("Error fetching cheque data:", err);
      }
    };

    getData();
  }, []);

  return (
    <>
      {/* --- Your CSS code remains same, बस background bug हटा दिया है --- */}
      <style>{`
        .form-floating > .form-control {
          height: 4rem;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          font-size: 1rem;
          padding-top: 1.625rem;
          transition: all 0.3s ease;
          background: #ffffff; /* ✅ Fix */
          border-color: #007050; /* ✅ Fix */
        }
      `}</style>

      {/* --- Form UI --- */}
      <div className="main-container">
        <div className="glass-card no-print">
          <h1 className="main-title">Smart Cheque Printer</h1>
          <p className="subtitle">
            Enter amount in numbers, words will be generated automatically
          </p>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="date"
              value={chequeData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              placeholder="15122024"
              maxLength={8}
            />
            <label htmlFor="date">Date (DDMMYYYY) - Numbers only</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="payTo"
              value={chequeData.payTo}
              onChange={(e) => handleInputChange("payTo", e.target.value)}
              placeholder="Enter recipient name"
            />
            <label htmlFor="payTo">Pay To</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="amountNumber"
              value={chequeData.amountNumber}
              onChange={(e) => handleInputChange("amountNumber", e.target.value)}
              placeholder="1500"
            />
            <label htmlFor="amountNumber">Amount (₹) - Numbers only</label>
          </div>

          <div
            className={`auto-words-display ${
              !chequeData.amountWords ? "empty" : ""
            }`}
            style={{
              border: "2px solid #007050",
              borderRadius: "12px",
              padding: "12px",
              marginTop: "12px",
            }}
          >
            <div>
              <strong>Amount in Words:</strong>
              <br />
              {chequeData.amountWords ||
                "Enter amount in numbers above to see words here..."}
            </div>
          </div>

          <div className="form-floating">
            <select
              className="form-select"
              id="bankSelect"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="sbi">State Bank of India (SBI)</option>
              <option value="axis">Axis Bank</option>
              <option value="pnb">Punjab National Bank (PNB)</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="indusind">IndusInd Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
              <option value="boi">Bank Of India</option>
            </select>
            <label htmlFor="bankSelect">Select Bank</label>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button
              type="button"
              className="btn btn-modern flex-fill"
              style={{ backgroundColor: "#007050", borderColor: "#007050" }}
              onClick={handlePreview}
            >
              Preview Cheque
            </button>
            <button
              type="button"
              className="btn btn-modern flex-fill"
              style={{ backgroundColor: "#007050", borderColor: "#007050" }}
              onClick={handlePrint}
              disabled={!isPreviewVisible}
            >
              Print Cheque
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Preview */}
      {isPreviewVisible && (
        <div className="text-center">
          <h2 className="preview-title">📋 Cheque Preview</h2>
          <div className="cheque-container">
            <div className="cheque">
              <div style={chequeStyles.date}>{chequeData.date}</div>
              <div style={chequeStyles.payto}>{chequeData.payTo}</div>
              <div style={chequeStyles.words}>
                {formatAmountWords(chequeData.amountWords)}
              </div>
              <div style={chequeStyles.number}>
                *** {chequeData.amountNumber} ***
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChequePrinter;
