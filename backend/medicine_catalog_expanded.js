const medicines = [
  // Cardiology
  {
    name: "Rosuvas (Rosuvastatin) 10mg",
    manufacturer: "Sun Pharma",
    composition: ["Rosuvastatin 10mg"],
    detailedComposition: [{
      ingredient: "Rosuvastatin",
      quantity: 10,
      unit: "mg",
      howToUse: "Take once daily, usually at night.",
      sideEffects: "Muscle pain, headache, nausea.",
      storage: "Store in a cool, dry place."
    }],
    clinicalOverview: {
      uses: "Lowers high cholesterol and reduces the risk of heart disease.",
      mechanism: "HMG-CoA reductase inhibitor that reduces cholesterol production in the liver.",
      pregnancyCategory: "Category X",
      alcoholWarning: "Caution, increase risk of liver issues."
    },
    department: "Cardiology",
    description: "Statin medication for cholesterol management."
  },
  {
    name: "Clopilet (Clopidogrel) 75mg",
    manufacturer: "Sun Pharma",
    composition: ["Clopidogrel 75mg"],
    detailedComposition: [{
      ingredient: "Clopidogrel",
      quantity: 75,
      unit: "mg",
      howToUse: "Take once daily with or without food.",
      sideEffects: "Bleeding, bruising, stomach upset.",
      storage: "Protect from moisture."
    }],
    clinicalOverview: {
      uses: "Prevents blood clots in patients with recent heart attack or stroke.",
      mechanism: "Antiplatelet agent that stops platelets from sticking together.",
      pregnancyCategory: "Category B",
      alcoholWarning: "May increase bleeding risk."
    },
    department: "Cardiology",
    description: "Blood thinner to prevent stroke and heart attack."
  },
  {
    name: "Concor (Bisoprolol) 5mg",
    manufacturer: "Merck",
    composition: ["Bisoprolol 5mg"],
    detailedComposition: [{
      ingredient: "Bisoprolol",
      quantity: 5,
      unit: "mg",
      howToUse: "Take once daily in the morning.",
      sideEffects: "Fatigue, cold extremities, dizziness.",
      storage: "Room temperature."
    }],
    clinicalOverview: {
      uses: "Treats high blood pressure and heart failure.",
      mechanism: "Beta-blocker that slows heart rate and reduces blood pressure.",
      pregnancyCategory: "Category C",
      alcoholWarning: "May cause excessive blood pressure drop."
    },
    department: "Cardiology",
    description: "Beta-blocker for hypertension and heart health."
  },
  // Anti-Diabetic
  {
    name: "Glycomet-GP 1",
    manufacturer: "USV",
    composition: ["Glimepiride 1mg", "Metformin 500mg"],
    detailedComposition: [
      { ingredient: "Glimepiride", quantity: 1, unit: "mg", howToUse: "Take before breakfast." },
      { ingredient: "Metformin", quantity: 500, unit: "mg", howToUse: "Take with food." }
    ],
    clinicalOverview: {
      uses: "Management of Type 2 diabetes mellitus.",
      mechanism: "Glimepiride increases insulin secretion; Metformin improves insulin sensitivity.",
      pregnancyCategory: "Category C",
      alcoholWarning: "Increases risk of lactic acidosis."
    },
    department: "General",
    description: "Combination oral hypoglycemic for diabetes control."
  },
  {
    name: "Jalra-M 50/500",
    manufacturer: "Novartis",
    composition: ["Vildagliptin 50mg", "Metformin 500mg"],
    detailedComposition: [
      { ingredient: "Vildagliptin", quantity: 50, unit: "mg" },
      { ingredient: "Metformin", quantity: 500, unit: "mg" }
    ],
    clinicalOverview: {
      uses: "Treatment of Type 2 diabetes when metformin alone is insufficient.",
      mechanism: "DPP-4 inhibitor combined with Biguanide.",
      pregnancyCategory: "Category C",
      alcoholWarning: "Avoid excessive intake."
    },
    department: "General",
    description: "Advanced combination therapy for diabetes."
  },
  // Dermatology
  {
    name: "Panderm + Cream",
    manufacturer: "Macleods",
    composition: ["Clobetasol", "Ofloxacin", "Ornidazole", "Terbinafine"],
    detailedComposition: [
      { ingredient: "Clobetasol", quantity: 0.05, unit: "%" },
      { ingredient: "Ofloxacin", quantity: 0.75, unit: "%" },
      { ingredient: "Ornidazole", quantity: 2, unit: "%" },
      { ingredient: "Terbinafine", quantity: 1, unit: "%" }
    ],
    clinicalOverview: {
      uses: "Treats various skin infections (bacterial, fungal, mixed).",
      mechanism: "Combination of steroid, antibiotic, antiprotozoal, and antifungal.",
      pregnancyCategory: "Category C",
      alcoholWarning: "Safe topical use."
    },
    department: "Dermatology",
    description: "Multipurpose skin cream for infections."
  },
  {
    name: "Tretin-0.025% Gel",
    manufacturer: "Hegde",
    composition: ["Tretinoin 0.025%"],
    detailedComposition: [{
      ingredient: "Tretinoin",
      quantity: 0.025,
      unit: "%",
      howToUse: "Apply a small amount to clean, dry skin at night.",
      sideEffects: "Skin peeling, redness, dryness.",
      storage: "Below 25°C."
    }],
    clinicalOverview: {
      uses: "Treatment of acne and reduces fine wrinkles.",
      mechanism: "Retinoid that increases skin cell turnover.",
      pregnancyCategory: "Category X",
      alcoholWarning: "Safe topical use."
    },
    department: "Dermatology",
    description: "Retinoid gel for acne and skin texture."
  },
  {
    name: "Candid-B Cream",
    manufacturer: "Glenmark",
    composition: ["Clotrimazole", "Beclomethasone"],
    detailedComposition: [
      { ingredient: "Clotrimazole", quantity: 1, unit: "%" },
      { ingredient: "Beclomethasone", quantity: 0.025, unit: "%" }
    ],
    clinicalOverview: {
      uses: "Treats fungal skin infections with inflammation.",
      mechanism: "Antifungal combined with a steroid.",
      pregnancyCategory: "Category C"
    },
    department: "Dermatology",
    description: "Effective cream for fungal infections like ringworm."
  },
  // ENT
  {
    name: "Allegra 120mg",
    manufacturer: "Sanofi",
    composition: ["Fexofenadine 120mg"],
    detailedComposition: [{
      ingredient: "Fexofenadine",
      quantity: 120,
      unit: "mg",
      howToUse: "Take once daily with water.",
      sideEffects: "Headache, drowsiness.",
      storage: "Store at room temperature."
    }],
    clinicalOverview: {
      uses: "Relief of allergy symptoms like sneezing, runny nose, itchy eyes.",
      mechanism: "Non-sedating second-generation antihistamine.",
      pregnancyCategory: "Category C",
      alcoholWarning: "Caution advised."
    },
    department: "ENT",
    description: "High-efficacy, non-drowsy allergy relief."
  },
  {
    name: "Otrivin Adult Nasal Spray",
    manufacturer: "GSK",
    composition: ["Xylometazoline 0.1%"],
    detailedComposition: [{
      ingredient: "Xylometazoline",
      quantity: 0.1,
      unit: "%",
      howToUse: "1-2 sprays in each nostril, max 3 times daily.",
      sideEffects: "Local irritation, dry nose.",
      storage: "Store below 30°C."
    }],
    clinicalOverview: {
      uses: "Fast relief from nasal congestion.",
      mechanism: "Nasal decongestant that shrinks blood vessels in the nose.",
      pregnancyCategory: "Category C",
      alcoholWarning: "No interaction."
    },
    department: "ENT",
    description: "Rapid-acting nasal decongestant for colds and allergies."
  },
  // Antibiotics
  {
    name: "Taxim-O 200",
    manufacturer: "Alkem",
    composition: ["Cefixime 200mg"],
    detailedComposition: [{
      ingredient: "Cefixime",
      quantity: 200,
      unit: "mg",
      howToUse: "Take after food as prescribed.",
      sideEffects: "Diarrhea, stomach pain.",
      storage: "Room temperature."
    }],
    clinicalOverview: {
      uses: "Treats bacterial infections of ear, throat, and urinary tract.",
      mechanism: "Third-generation cephalosporin antibiotic.",
      pregnancyCategory: "Category B"
    },
    department: "General",
    description: "Broad-spectrum oral antibiotic."
  },
  {
    name: "Zifi-CV 200",
    manufacturer: "FDC",
    composition: ["Cefixime 200mg", "Clavulanic Acid 125mg"],
    detailedComposition: [
      { ingredient: "Cefixime", quantity: 200, unit: "mg" },
      { ingredient: "Clavulanic Acid", quantity: 125, unit: "mg" }
    ],
    clinicalOverview: {
      uses: "Treats resistant bacterial infections.",
      mechanism: "Antibiotic combined with beta-lactamase inhibitor.",
      pregnancyCategory: "Category B"
    },
    department: "General",
    description: "Antibiotic for skin, respiratory, and urinary infections."
  },
  // Pain and Orthopaedics
  {
    name: "Zerodol-SP",
    manufacturer: "Ipca",
    composition: ["Aceclofenac 100mg", "Paracetamol 325mg", "Serratiopeptidase 15mg"],
    detailedComposition: [
      { ingredient: "Aceclofenac", quantity: 100, unit: "mg" },
      { ingredient: "Paracetamol", quantity: 325, unit: "mg" },
      { ingredient: "Serratiopeptidase", quantity: 15, unit: "mg" }
    ],
    clinicalOverview: {
      uses: "Relief of pain and inflammation in joints and muscles.",
      mechanism: "NSAIDs combined with an enzyme that reduces swelling.",
      pregnancyCategory: "Category D in 3rd trimester",
      alcoholWarning: "Increases risk of stomach bleeding."
    },
    department: "Orthopaedics",
    description: "Powerful triple-action pain reliever for inflammation."
  },
  {
    name: "Etorica-90",
    manufacturer: "Micro Labs",
    composition: ["Etoricoxib 90mg"],
    detailedComposition: [{
      ingredient: "Etoricoxib",
      quantity: 90,
      unit: "mg",
      howToUse: "Take once daily for the prescribed duration.",
      sideEffects: "Edema, dizziness, headache.",
      storage: "Cool, dry place."
    }],
    clinicalOverview: {
      uses: "Treats osteoarthritis, rheumatoid arthritis, and gout.",
      mechanism: "Selective COX-2 inhibitor that reduces pain and inflammation.",
      pregnancyCategory: "Category D",
      alcoholWarning: "Increases cardiovascular risk."
    },
    department: "Orthopaedics",
    description: "Modern NSAID for long-term chronic pain management."
  },
  // Paediatrics
  {
    name: "Crocin 120 Suspension",
    manufacturer: "GSK",
    composition: ["Paracetamol 120mg/5ml"],
    detailedComposition: [{
      ingredient: "Paracetamol",
      quantity: 120,
      unit: "mg",
      howToUse: "Dosage based on weight/age of the child.",
      sideEffects: "Minimal side effects when used correctly.",
      storage: "Below 25°C."
    }],
    clinicalOverview: {
      uses: "Relieving fever and mild pain in children.",
      mechanism: "Analgesic and antipyretic action.",
      pregnancyCategory: "Category B",
      alcoholWarning: "N/A (Paediatric)"
    },
    department: "Paediatrics",
    description: "Standard fever medicine for infants and children."
  },
  {
    name: "Zincovit Syrup",
    manufacturer: "Apex",
    composition: ["Multivitamins", "Minerals", "Zinc"],
    detailedComposition: [
      { ingredient: "Multivitamins", quantity: 5, unit: "ml" },
      { ingredient: "Zinc", quantity: 5, unit: "mg" }
    ],
    clinicalOverview: {
      uses: "Nutritional supplement for growth and immunity in children.",
      mechanism: "Provides essential vitamins and trace elements.",
      pregnancyCategory: "Category A"
    },
    department: "Paediatrics",
    description: "Complete multivitamin and mineral supplement for kids."
  },
  // Adding more to reach ~50 entries (simplified versions for brevity in script)
  { name: "Shelcal 500", manufacturer: "Torrent", department: "Orthopaedics", description: "Calcium and Vitamin D3 supplement.", composition: ["Calcium 500mg", "Vitamin D3 250IU"] },
  { name: "Liv-52 DS", manufacturer: "Himalaya", department: "General", description: "Ayurvedic liver tonic.", composition: ["Herbal Extracts"] },
  { name: "Cetzine 10mg", manufacturer: "GSK", department: "ENT", description: "Antihistamine for allergy.", composition: ["Cetirizine 10mg"] },
  { name: "L-Hist 5mg", manufacturer: "Alkem", department: "ENT", description: "Allergy relief.", composition: ["Levocetirizine 5mg"] },
  { name: "Azee 500", manufacturer: "Cipla", department: "General", description: "Azithromycin antibiotic.", composition: ["Azithromycin 500mg"] },
  { name: "Cipox 500", manufacturer: "Cipla", department: "General", description: "Ciprofloxacin antibiotic.", composition: ["Ciprofloxacin 500mg"] },
  { name: "Metrogyl 400", manufacturer: "J.B. Chemicals", department: "General", description: "Antibacterial and antiprotozoal.", composition: ["Metronidazole 400mg"] },
  { name: "Avil 25mg", manufacturer: "Sanofi", department: "General", description: "Antihistamine for reactions.", composition: ["Pheniramine 25mg"] },
  { name: "Digene Gel", manufacturer: "Abbott", department: "General", description: "Antacid syrup.", composition: ["Magnesium Hydroxide", "Simethicone"] },
  { name: "Mucaine Gel", manufacturer: "Pfizer", department: "General", description: "Antacid with anaesthetic effect.", composition: ["Oxetacaine", "Aluminium Hydroxide"] },
  { name: "Cremaffin", manufacturer: "Abbott", department: "General", description: "Laxative for constipation.", composition: ["Liquid Paraffin", "Milk of Magnesia"] },
  { name: "Duphalac", manufacturer: "Abbott", department: "General", description: "Lactulose solution for constipation.", composition: ["Lactulose 10g/15ml"] },
  { name: "Zevit Capsule", manufacturer: "Zydus", department: "General", description: "Zinc and Vitamin B-Complex.", composition: ["Vitamin B-Complex", "Zinc"] },
  { name: "Becosules", manufacturer: "Pfizer", department: "General", description: "Vitamin B-Complex with Vitamin C.", composition: ["Vitamin B-Complex", "Vitamin C"] },
  { name: "Evion 400", manufacturer: "Merck", department: "General", description: "Vitamin E supplement.", composition: ["Vitamin E 400mg"] },
  { name: "Vitamode 10mg", manufacturer: "Mankind", department: "General", description: "Vildagliptin for diabetes.", composition: ["Vildagliptin 10mg"] },
  { name: "Galvus 50mg", manufacturer: "Novartis", department: "General", description: "Premium diabetes medication.", composition: ["Vildagliptin 50mg"] },
  { name: "Humalog Mix", manufacturer: "Eli Lilly", department: "General", description: "Insulin analogue.", composition: ["Insulin Lispro"] },
  { name: "Lantus SoloStar", manufacturer: "Sanofi", department: "General", description: "Long-acting insulin pen.", composition: ["Insulin Glargine"] },
  { name: "Monocef 1g", manufacturer: "Aristo", department: "General", description: "Ceftriaxone injection.", composition: ["Ceftriaxone 1g"] },
  { name: "Zantac 150", manufacturer: "Glaxo", department: "General", description: "Acid reducer (Ranitidine).", composition: ["Ranitidine 150mg"] },
  { name: "Aciloc 150", manufacturer: "Cadila", department: "General", description: "Popular acid reducer.", composition: ["Ranitidine 150mg"] },
  { name: "Sucrafil Syrup", manufacturer: "Fourrts", department: "General", description: "Coating agent for ulcers.", composition: ["Sucralfate 1g/10ml"] },
  { name: "Gelusil MPS", manufacturer: "Pfizer", department: "General", description: "Antacid and anti-gas.", composition: ["Aluminium Hydroxide", "Magnesium Hydroxide"] },
  { name: "Rantac 150", manufacturer: "J.B. Chemicals", department: "General", description: "Acid block medication.", composition: ["Ranitidine 150mg"] },
  { name: "Erythrocin 250", manufacturer: "Abbott", department: "General", description: "Erythromycin antibiotic.", composition: ["Erythromycin 250mg"] },
  { name: "Roxid 150", manufacturer: "Alembic", department: "General", description: "Roxithromycin antibiotic.", composition: ["Roxithromycin 150mg"] },
  { name: "Glynase 5mg", manufacturer: "Pfizer", department: "General", description: "Glipizide for diabetes.", composition: ["Glipizide 5mg"] },
  { name: "Daonil 5mg", manufacturer: "Sanofi", department: "General", description: "Glibenclamide for diabetes.", composition: ["Glibenclamide 5mg"] },
  { name: "Amix 500", manufacturer: "Macleods", department: "General", description: "Amoxicillin capsule.", composition: ["Amoxicillin 500mg"] },
  { name: "Claribid 250", manufacturer: "Abbott", department: "General", description: "Clarithromycin antibiotic.", composition: ["Clarithromycin 250mg"] },
  { name: "Oflox 200", manufacturer: "Cipla", department: "General", description: "Ofloxacin antibiotic.", composition: ["Ofloxacin 200mg"] },
  { name: "Lanol ER 650", manufacturer: "Micro Labs", department: "General", description: "Extended release paracetamol.", composition: ["Paracetamol 650mg"] },
  { name: "Arflur-P", manufacturer: "FDC", department: "Orthopaedics", description: "Aceclofenac + Paracetamol.", composition: ["Aceclofenac 100mg", "Paracetamol 325mg"] },
  { name: "Hifenac-P", manufacturer: "Intas", department: "Orthopaedics", description: "Muscle and joint pain relief.", composition: ["Aceclofenac 100mg", "Paracetamol 325mg"] }
];

module.exports = medicines;
