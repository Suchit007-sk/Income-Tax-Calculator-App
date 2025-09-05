import React, { useState } from "react";
import axios from "axios";

function TaxForm() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState({ "80c": "", "80d": "", "80e": "" });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tax/calculate", {
        income: Number(income),
        deductions: {
          "80c": Number(deductions["80c"]),
          "80d": Number(deductions["80d"]),
          "80e": Number(deductions["80e"]),
        },
      });
      setResult(res.data);
    } catch (err) {
      alert("Error calculating tax");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Income Tax Calculator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Annual Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="form-control mb-3"
          />

          {["80c", "80d", "80e"].map((ded) => (
            <input
              key={ded}
              type="number"
              placeholder={`Deduction ${ded}`}
              value={deductions[ded]}
              onChange={(e) => setDeductions({ ...deductions, [ded]: e.target.value })}
              className="form-control mb-2"
            />
          ))}

          <button className="btn btn-primary w-100 mt-3">Calculate Tax</button>
        </form>

        {result && (
          <div className="alert alert-info mt-4">
            <h5>Results:</h5>
            <p>Income: ₹{result.income}</p>
            <p>Total Deductions: ₹{result.totalDeductions}</p>
            <p>Taxable Income: ₹{result.taxableIncome}</p>
            <p><strong>Total Tax: ₹{result.tax}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaxForm;
