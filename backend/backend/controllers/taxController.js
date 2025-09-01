// Tax slabs
const slabs = [
  { upto: 350000, rate: 0 },
  { upto: 750000, rate: 0.05 },
  { upto: 1250000, rate: 0.10 },
  { upto: 2500000, rate: 0.25 },
  { upto: Infinity, rate: 0.30 }
];

// Deduction limits
const deductionsLimit = {
  "80c": 150000,
  "80d": 50000,
  "80e": 200000
};

function calculateSlabTax(income) {
  let tax = 0;
  let prevLimit = 0;

  for (let slab of slabs) {
    if (income > slab.upto) {
      tax += (slab.upto - prevLimit) * slab.rate;
      prevLimit = slab.upto;
    } else {
      tax += (income - prevLimit) * slab.rate;
      break;
    }
  }

  return tax;
}

exports.calculateTax = (req, res) => {
  try {
    let { income, deductions } = req.body;
    if (!income || income < 0) {
      return res.status(400).json({ error: "Invalid income" });
    }

    // apply deductions
    let totalDeductions = 0;
    if (deductions) {
      for (let key in deductions) {
        const allowed = deductionsLimit[key] || 0;
        totalDeductions += Math.min(deductions[key] || 0, allowed);
      }
    }

    let taxableIncome = Math.max(0, income - totalDeductions);

    let tax = calculateSlabTax(taxableIncome);

    res.json({
      income,
      deductions,
      totalDeductions,
      taxableIncome,
      tax
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
