import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { USER_AUTH, ENDPOINTS } from "../utils/constant";

interface BankLayout {
  date: { top: string; right: string; letterSpacing?: string };
  payto: { top: string; left: string };
  words: { top: string; left: string };
  number: { top: string; right: string };
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

  const bankLayouts: Record<string, BankLayout> = {
    sbi: {
      date: { top: "14mm", right: "-10mm", letterSpacing: "3mm" },
      payto: { top: "27mm", left: "55mm" },
      words: { top: "35mm", left: "55mm" },
      number: { top: "44mm", right: "2mm" },
    },
    axis: {
      date: { top: "14mm", right: "-10mm", letterSpacing: "2.7mm" },
      payto: { top: "27mm", left: "55mm" },
      words: { top: "35mm", left: "55mm" },
      number: { top: "44mm", right: "2mm" },
    },
    pnb: {
      date: { top: "15mm", right: "-12mm", letterSpacing: "2.8mm" },
      payto: { top: "26mm", left: "55mm" },
      words: { top: "34mm", left: "55mm" },
      number: { top: "44mm", right: "-2mm" },
    },
    hdfc: {
      date: { top: "14mm", right: "-14mm", letterSpacing: "3mm" },
      payto: { top: "26mm", left: "55mm" },
      words: { top: "34mm", left: "55mm" },
      number: { top: "44mm", right: "-3mm" },
    },
    indusind: {
      date: { top: "16mm", right: "-12mm", letterSpacing: "3mm" },
      payto: { top: "26mm", left: "55mm" },
      words: { top: "34mm", left: "55mm" },
      number: { top: "44mm", right: "-3mm" },
    },
    kotak: {
      date: { top: "16mm", right: "-11mm", letterSpacing: "3mm" },
      payto: { top: "26mm", left: "50mm" },
      words: { top: "34mm", left: "50mm" },
      number: { top: "44mm", right: "1mm" },
    },
    boi: {
      date: { top: "17mm", right: "-13mm", letterSpacing: "3mm" },
      payto: { top: "29mm", left: "50mm" },
      words: { top: "37mm", left: "55mm" },
      number: { top: "44mm", right: "-2mm" },
    },
  };

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
    const convertHundreds = (n: number) => {
      let result = "";
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      }
      if (n > 0) result += ones[n] + " ";
      return result;
    };

    let result = "";
    const crores = Math.floor(number / 10000000),
      lakhs = Math.floor((number % 10000000) / 100000),
      thousands = Math.floor((number % 100000) / 1000),
      hundreds = number % 1000;

    if (crores) result += convertHundreds(crores) + "Crore ";
    if (lakhs) result += convertHundreds(lakhs) + "Lakh ";
    if (thousands) result += convertHundreds(thousands) + "Thousand ";
    if (hundreds) result += convertHundreds(hundreds);
    return result.trim() + " Only";
  };

  const handleInputChange = (field: keyof ChequeData, value: string) => {
    if ((field === "date" || field === "amountNumber") && !/^[0-9]*$/.test(value)) return;
    setChequeData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "amountNumber") updated.amountWords = numberToWords(value);
      return updated;
    });
  };

  const formatAmountWords = (words: string) => {
    if (!words) return "";
    const arr = words.trim().split(/\s+/);
    let formatted = "*** ";
    for (let i = 0; i < arr.length; i++) {
      formatted += arr[i] + " ";
      if ((i + 1) % 8 === 0) formatted += "\n\n";
    }
    formatted += "/-";
    return formatted.trim();
  };

  const getCurrentLayout = (): BankLayout => bankLayouts[selectedBank];

  // ✅ Direct print (no preview)
  const handlePrint = () => {
    if (!chequeData.date || !chequeData.payTo || !chequeData.amountNumber) {
      alert("Please fill Date, Pay To, and Amount fields before printing.");
      return;
    }

    const layout = getCurrentLayout();
    const chequeHTML = `
      <div class="cheque" style="width:210mm; height:100mm; position:relative; background:#fff;">
        <div style="position:absolute; top:${layout.date.top}; right:${layout.date.right}; letter-spacing:${layout.date.letterSpacing}">
          ${chequeData.date}
        </div>
        <div style="position:absolute; top:${layout.payto.top}; left:${layout.payto.left}">
          ${chequeData.payTo}
        </div>
        <div style="position:absolute; top:${layout.words.top}; left:${layout.words.left}; white-space:pre-line;">
          ${formatAmountWords(chequeData.amountWords)}
        </div>
        <div style="position:absolute; top:${layout.number.top}; right:${layout.number.right}">
          *** ${chequeData.amountNumber} /-
        </div>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Cheque</title>
          <style>
            @page {
              size: 210mm 100mm;
              margin: 0mm;
            }
            body {
              margin: 0;
              padding: 0;
              background: #fff;
              -webkit-print-color-adjust: exact;
            }
          </style>
        </head>
        <body>${chequeHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

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
    <main
      className="d-flex flex-column align-items-center justify-content-start p-3"
      style={{
        background: "#f9f1e6",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
          background: "#ffffffcc",
        }}
      >
        <div
          className="text-center p-4"
          style={{
            background: "#0B7456",
            color: "#fff",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <h2 className="mb-2 fw-bold">Smart Cheque Printer</h2>
          <p className="mb-0 opacity-75">Enter cheque details below</p>
        </div>

        <div className="card-body p-4">
          <div className="mb-3">
            <label className="form-label fw-semibold">Date (DDMMYYYY)</label>
            <input
              type="text"
              className="form-control rounded-2"
              value={chequeData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              maxLength={8}
              placeholder="15122024"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Pay To</label>
            <input
              type="text"
              className="form-control rounded-2"
              value={chequeData.payTo}
              onChange={(e) => handleInputChange("payTo", e.target.value)}
              placeholder="Recipient name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Amount (₹)</label>
            <input
              type="text"
              className="form-control rounded-2"
              value={chequeData.amountNumber}
              onChange={(e) => handleInputChange("amountNumber", e.target.value)}
              placeholder="1500"
            />
          </div>

          <div className="alert alert-success py-2 rounded-2">
            <strong>Amount in Words:</strong> {chequeData.amountWords || "—"}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Bank</label>
            <select
              className="form-select rounded-2"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="sbi">State Bank of India</option>
              <option value="axis">Axis Bank</option>
              <option value="pnb">Punjab National Bank</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="indusind">IndusInd Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
              <option value="boi">Bank of India</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100 mt-4"
            style={{ background: "#0B7456", borderColor: "#0B7456" }}
            onClick={handlePrint}
          >
            Print Cheque
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChequePrinter;
