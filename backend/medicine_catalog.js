const medicines = [
  { 
    name: 'Crocin Advance 500mg', 
    manufacturer: 'GSK', 
    composition: ['Paracetamol 500mg'], 
    detailedComposition: [{ 
      ingredient: 'Paracetamol', 
      quantity: 500, 
      unit: 'mg',
      howToUse: 'Take one tablet every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.',
      sideEffects: 'Nausea, allergic skin rashes (rare).',
      precautions: 'Severe liver damage or allergic reactions may occur if over-consumed.',
      interactions: 'Avoid alcohol and other paracetamol-containing products.',
      storage: 'Store below 30°C in a dry place.'
    }],
    clinicalOverview: {
      uses: 'Used for fast relief of fever and pain, including headache, toothache, and body ache.',
      mechanism: 'It works by inhibiting the production of prostaglandins in the brain that cause pain and fever.',
      contraindications: 'Severe liver disease or hypersensitivity to paracetamol.',
      sideEffects: 'Rarely causes rashes or blood disorders.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Avoid alcohol as it increases liver toxicity risk.',
      drivingWarning: 'No known impairing effects on driving.',
      lactationWarning: 'Safe if used in moderation; consult a doctor.'
    },
    department: 'General', 
    description: 'Fast acting relief for pain and fever.' 
  },
  { 
    name: 'Dolo 650', 
    manufacturer: 'Micro Labs', 
    composition: ['Paracetamol 650mg'], 
    detailedComposition: [{ 
      ingredient: 'Paracetamol', 
      quantity: 650, 
      unit: 'mg',
      howToUse: 'Usually one tablet 3-4 times daily.',
      precautions: 'Use with caution in patients with liver or kidney impairment.',
      storage: 'Keep out of reach of children.'
    }],
    clinicalOverview: {
      uses: 'Indicated for symptomatic relief from fever and mild to moderate pain.',
      mechanism: 'Analgesic and antipyretic action through prostaglandin synthesis inhibition.',
      contraindications: 'Liver failure, allergy to paracetamol.',
      sideEffects: 'Mild gastrointestinal discomfort in some sensitive individuals.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Dangerous interaction potential with high doses.',
      drivingWarning: 'Generally safe.',
      lactationWarning: 'Safe with caution.'
    },
    department: 'General', 
    description: 'Used for fever and mild to moderate pain.' 
  },
  { 
    name: 'Augmentin 625 Duo', 
    manufacturer: 'GSK', 
    composition: ['Amoxicillin 500mg', 'Clavulanic Acid 125mg'], 
    detailedComposition: [
      { 
        ingredient: 'Amoxicillin', 
        quantity: 500, 
        unit: 'mg',
        howToUse: 'Take at the start of a meal to minimize gastrointestinal intolerance.',
        sideEffects: 'Diarrhea, nausea, skin rash.',
        precautions: 'History of penicillin allergy is a critical contraindication.',
        interactions: 'May reduce effectiveness of oral contraceptives.',
        storage: 'Store in a cool, dry place.'
      },
      { 
        ingredient: 'Clavulanic Acid', 
        quantity: 125, 
        unit: 'mg',
        howToUse: 'Consumed as part of the combination tablet.',
        sideEffects: 'Occasional indigestion.',
        precautions: 'None specific when taken in combination.',
        storage: 'Sensitive to moisture.'
      }
    ],
    clinicalOverview: {
      uses: 'Short-term treatment of bacterial infections including upper/lower respiratory tract, skin, and urinary tract infections.',
      mechanism: 'Amoxicillin kills bacteria by preventing cell wall synthesis. Clavulanic acid blocks enzymes (beta-lactamases) that bacteria produce to destroy amoxicillin.',
      contraindications: 'Penicillin allergy, history of amoxicillin-clavulanate-associated jaundice.',
      sideEffects: 'Common side effects include diarrhea, nausea, and fungal infections (thrush).',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Avoid alcohol during antibiotic course.',
      drivingWarning: 'May cause dizziness in rare cases.',
      lactationWarning: 'Excreted in small amounts; monitor infant for diarrhea.'
    },
    department: 'General', 
    description: 'Powerful antibiotic for severe bacterial infections.' 
  },
  { 
    name: 'Pan-40', 
    manufacturer: 'Alkem', 
    composition: ['Pantoprazole 40mg'], 
    detailedComposition: [{ 
      ingredient: 'Pantoprazole', 
      quantity: 40, 
      unit: 'mg',
      howToUse: 'Take one hour before breakfast on an empty stomach.',
      sideEffects: 'Diarrhea, headache, dizziness.',
      precautions: 'Long-term use may increase risk of bone fractures.',
      storage: 'Store protected from light and moisture.'
    }],
    clinicalOverview: {
      uses: 'Treatment of gastroesophageal reflux disease (GERD) and stomach ulcers.',
      mechanism: 'A proton pump inhibitor (PPI) that reduces the amount of acid produced in the stomach.',
      contraindications: 'Hypersensitivity to pantoprazole or other benzimidazoles.',
      sideEffects: 'Generally well-tolerated; potential vitamin B12 deficiency with chronic use.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Can increase acid production, potentially worsening the condition.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult physician.'
    },
    department: 'General', 
    description: 'Used to treat acidity and heartburn.' 
  },
  { 
    name: 'Citrozen (Cetirizine) 10mg', 
    manufacturer: 'Dr Reddy', 
    composition: ['Cetirizine 10mg'], 
    detailedComposition: [{ 
      ingredient: 'Cetirizine', 
      quantity: 10, 
      unit: 'mg',
      howToUse: 'Take once daily, usually in the evening with or without food.',
      sideEffects: 'Sleepiness, tiredness, dry mouth.',
      precautions: 'Do not consume with alcohol. Avoid driving if feeling drowsy.',
      storage: 'Store at room temperature.'
    }],
    clinicalOverview: {
      uses: 'Used for the relief of symptoms of hay fever and other allergies (e.g. sneezing, runny nose).',
      mechanism: 'An antihistamine that works by blocking a natural substance (histamine) that the body makes during an allergic reaction.',
      contraindications: 'Severe kidney failure, hypersensitivity to cetirizine.',
      sideEffects: 'Common side effects include fatigue and dizziness.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'CRITICAL: Do not consume alcohol; causes extreme drowsiness.',
      drivingWarning: 'CAUTION: Avoid driving if you feel sleepy.',
      lactationWarning: 'Not advised.'
    },
    department: 'ENT', 
    description: 'Relief from allergic symptoms like sneezing and runny nose.' 
  },
  { 
    name: 'Aspirin 75mg (Ecosprin)', 
    manufacturer: 'USV', 
    composition: ['Aspirin 75mg'], 
    detailedComposition: [{ 
      ingredient: 'Aspirin', 
      quantity: 75, 
      unit: 'mg',
      howToUse: 'Take after a meal with a glass of water.',
      sideEffects: 'Stomach upset, increased bleeding risk.',
      precautions: 'Not recommended for children under 16 years.',
      storage: 'Keep in a dry place.'
    }],
    clinicalOverview: {
      uses: 'Primarily used to prevent heart attacks and strokes in at-risk patients.',
      mechanism: 'Irreversibly inhibits cyclooxygenase, preventing the formation of blood clots.',
      contraindications: 'Active stomach ulcers, bleeding disorders.',
      sideEffects: 'GI irritation, prolonged bleeding time.',
      pregnancyCategory: 'Category D in 3rd trimester',
      alcoholWarning: 'Increases risk of gastric bleeding.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'Cardiology', 
    description: 'Antiplatelet medication used to prevent blood clots.' 
  },
  { 
    name: 'Metformin 500mg', 
    manufacturer: 'Sun Pharma', 
    composition: ['Metformin 500mg'], 
    detailedComposition: [{ 
      ingredient: 'Metformin', 
      quantity: 500, 
      unit: 'mg',
      howToUse: 'Take with meals to reduce stomach side effects.',
      sideEffects: 'Nausea, diarrhea, metallic taste.',
      precautions: 'Inform doctor if you have kidney or liver issues.',
      storage: 'Keep at room temperature.'
    }],
    clinicalOverview: {
      uses: 'First-line medication for the treatment of type 2 diabetes.',
      mechanism: 'Lowers blood glucose by decreasing hepatic glucose production and increasing insulin sensitivity.',
      contraindications: 'Severe renal impairment, metabolic acidosis.',
      sideEffects: 'GI upset is common; rare risk of lactic acidosis.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Can increase risk of lactic acidosis; limit intake.',
      drivingWarning: 'Safe unless blood sugar becomes too low.',
      lactationWarning: 'Safe; consult doctor.'
    },
    department: 'General', 
    description: 'Used to control blood sugar levels in Type 2 diabetes.' 
  },
  { 
    name: 'Atorva 10mg (Atorvastatin)', 
    manufacturer: 'Zydus', 
    composition: ['Atorvastatin 10mg'], 
    detailedComposition: [{ 
      ingredient: 'Atorvastatin', 
      quantity: 10, 
      unit: 'mg',
      howToUse: 'Take at night for maximum effectiveness.',
      sideEffects: 'Muscle pain, liver enzyme changes, digestive issues.',
      precautions: 'Regular liver function tests recommended.',
      storage: 'Store below 25°C.'
    }],
    clinicalOverview: {
      uses: 'Lowers high cholesterol and triglyceride levels; reduces risk of heart attack.',
      mechanism: 'An HMG-CoA reductase inhibitor (statin) that limits cholesterol production in the liver.',
      contraindications: 'Active liver disease, pregnancy, breastfeeding.',
      sideEffects: 'Myalgia (muscle pain) is the most common concern.',
      pregnancyCategory: 'Category X: Do not use during pregnancy.',
      alcoholWarning: 'Increases risk of liver side effects.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Contraindicated.'
    },
    department: 'Cardiology', 
    description: 'Statin medication for cholesterol management.' 
  },
  { 
    name: 'Azithral 500 (Azithromycin)', 
    manufacturer: 'Alembic', 
    composition: ['Azithromycin 500mg'], 
    detailedComposition: [{ 
      ingredient: 'Azithromycin', 
      quantity: 500, 
      unit: 'mg',
      howToUse: 'Take once daily for 3 to 5 days as prescribed.',
      sideEffects: 'Diarrhea, vomiting, abdominal pain.',
      precautions: 'Inform doctor of any heart rhythm issues.',
      storage: 'Cool, dry place.'
    }],
    clinicalOverview: {
      uses: 'Treats bacterial infections like pneumonia, bronchitis, and skin infections.',
      mechanism: 'A macrolide antibiotic that stops bacterial growth by inhibiting protein synthesis.',
      contraindications: 'Hypersensitivity to macrolides; history of jaundice.',
      sideEffects: 'GI symptoms are most common.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'No direct interaction; alcohol may slow recovery from infection.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General', 
    description: 'Strong antibiotic for respiratory and skin infections.' 
  },
  { 
    name: 'Telma 40 (Telmisartan)', 
    manufacturer: 'Glenmark', 
    composition: ['Telmisartan 40mg'], 
    detailedComposition: [{ 
      ingredient: 'Telmisartan', 
      quantity: 40, 
      unit: 'mg',
      howToUse: 'Take with or without food at the same time daily.',
      sideEffects: 'Dizziness, fatigue, back pain.',
      precautions: 'Monitor potassium levels in blood.',
      storage: 'Protect from moisture.'
    }],
    clinicalOverview: {
      uses: 'Treats high blood pressure and reduces risk of heart attack.',
      mechanism: 'An Angiotensin II Receptor Blocker (ARB) that prevents narrowing of blood vessels.',
      contraindications: 'Severe liver or kidney disease; pregnancy.',
      sideEffects: 'Generally well-tolerated.',
      pregnancyCategory: 'Category D: Can harm the unborn baby.',
      alcoholWarning: 'Can cause blood pressure to drop significantly.',
      drivingWarning: 'Safe unless dizziness occurs.',
      lactationWarning: 'Not recommended.'
    },
    department: 'Cardiology', 
    description: 'Used to lower high blood pressure.' 
  },
  { 
    name: 'Zifi 200 (Cefixime)', 
    manufacturer: 'FDC', 
    composition: ['Cefixime 200mg'], 
    detailedComposition: [{ 
      ingredient: 'Cefixime', 
      quantity: 200, 
      unit: 'mg',
      howToUse: 'Take the full course as prescribed.',
      sideEffects: 'Loose stools, stomach ache, gas.',
      precautions: 'History of colitis should be reported.',
      storage: 'Room temperature away from sunlight.'
    }],
    clinicalOverview: {
      uses: 'Treats typhoid fever, UTI, and respiratory tract infections.',
      mechanism: 'Third-generation cephalosporin that kills bacteria by cell wall destruction.',
      contraindications: 'Cephalosporin or penicillin allergy.',
      sideEffects: 'Mainly gastrointestinal.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Avoid as a general precaution during illness.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe; consult doctor.'
    },
    department: 'General', 
    description: 'Antibiotic for typhoid and urinary infections.' 
  },
  { 
    name: 'Combiflam', 
    manufacturer: 'Sanofi', 
    composition: ['Ibuprofen 400mg', 'Paracetamol 325mg'], 
    detailedComposition: [
      { 
        ingredient: 'Ibuprofen', 
        quantity: 400, 
        unit: 'mg',
        howToUse: 'Take after a meal to protect the stomach.',
        sideEffects: 'Heartburn, nausea.',
        precautions: 'Avoid if you have asthma or heart disease.',
        storage: 'Store in a cool place.'
      },
      { 
        ingredient: 'Paracetamol', 
        quantity: 325, 
        unit: 'mg',
        howToUse: 'Symptomatic relief component.',
        sideEffects: 'Rash (rare).',
        storage: 'Dry place.'
      }
    ],
    clinicalOverview: {
      uses: 'Relief of pain and inflammation in muscles, joints, and dental procedures.',
      mechanism: 'Ibuprofen reduces inflammation via COX inhibition; Paracetamol reduces pain and fever.',
      contraindications: 'Active stomach ulcers, severe heart failure.',
      sideEffects: 'Digestive issues are common if taken on an empty stomach.',
      pregnancyCategory: 'Category D in 3rd trimester',
      alcoholWarning: 'May increase risk of stomach bleeding.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General', 
    description: 'Combination pain reliever for muscular and joint pain.' 
  },
  { 
    name: 'Voveran SR 100', 
    manufacturer: 'Novartis', 
    composition: ['Diclofenac 100mg'], 
    detailedComposition: [{ 
      ingredient: 'Diclofenac', 
      quantity: 100, 
      unit: 'mg',
      howToUse: 'Swallow whole; do not crush or chew.',
      sideEffects: 'Stomach pain, nausea, dizziness.',
      precautions: 'Monitor kidney and heart health during long-term use.',
      storage: 'Protect from heat.'
    }],
    clinicalOverview: {
      uses: 'Management of chronic pain, arthritis, and acute injuries.',
      mechanism: 'Non-steroidal anti-inflammatory drug (NSAID) that blocks prostaglandin synthesis.',
      contraindications: 'Coronary artery bypass graft (CABG) surgery; active bleeding.',
      sideEffects: 'Potential GI and cardiovascular risks.',
      pregnancyCategory: 'Category D in 3rd trimester',
      alcoholWarning: 'Increases risk of stomach ulcers.',
      drivingWarning: 'Safe unless dizziness occurs.',
      lactationWarning: 'Use with caution.'
    },
    department: 'Orthopaedics', 
    description: 'Sustained-release pain reliever for joint and bone pain.' 
  },
  { 
    name: 'Levocetirizine 5mg', 
    manufacturer: 'Mankind', 
    composition: ['Levocetirizine 5mg'], 
    detailedComposition: [{ 
      ingredient: 'Levocetirizine', 
      quantity: 5, 
      unit: 'mg',
      howToUse: 'Take one daily preferably in the evening.',
      sideEffects: 'Sleepiness, dry mouth.',
      precautions: 'Caution in patients with kidney dysfunction.',
      storage: 'Store at room temperature.'
    }],
    clinicalOverview: {
      uses: 'Used for the relief of symptoms of perennial and seasonal allergic rhinitis.',
      mechanism: 'An H1-antihistamine that prevents the action of histamine.',
      contraindications: 'End-stage renal disease; hypersensitivity to levocetirizine.',
      sideEffects: 'Drowsiness is less common than with first-gen antihistamines.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Do not take with alcohol; increases sedation.',
      drivingWarning: 'Caution advised.',
      lactationWarning: 'Passes into breast milk.'
    },
    department: 'ENT', 
    description: 'Allergy relief for runny nose and watery eyes.' 
  },
  { 
    name: 'Atarax 25mg (Hydroxyzine)', 
    manufacturer: 'Dr Reddy', 
    composition: ['Hydroxyzine 25mg'], 
    detailedComposition: [{ 
      ingredient: 'Hydroxyzine', 
      quantity: 25, 
      unit: 'mg',
      howToUse: 'Follow dosage exactly; usually taken multiple times daily for itching.',
      sideEffects: 'Significant sedation, dry mouth.',
      precautions: 'Avoid in elderly due to confusion risk.',
      storage: 'Store in a tight container.'
    }],
    clinicalOverview: {
      uses: 'Relief of anxiety and tension; also used for allergic skin manifestations like hives.',
      mechanism: 'Blocks histamine receptors and exhibits central nervous system depressant activity.',
      contraindications: 'Early pregnancy; hypersensitivity to hydroxyzine.',
      sideEffects: 'Strong sedative effect.',
      pregnancyCategory: 'Category X in early pregnancy.',
      alcoholWarning: 'Dangerous Interaction: Severe respiratory depression risk.',
      drivingWarning: 'PROHIBITED: High risk of sleepiness.',
      lactationWarning: 'Not advised.'
    },
    department: 'Dermatology', 
    description: 'Used for skin allergies and itching.' 
  },
  { 
    name: 'Ecosprin-AV 75', 
    manufacturer: 'USV', 
    composition: ['Aspirin 75mg', 'Atorvastatin 10mg'], 
    detailedComposition: [
      { 
        ingredient: 'Aspirin', 
        quantity: 75, 
        unit: 'mg',
        howToUse: 'Take after a meal.',
        sideEffects: 'Gastric irritation.',
        storage: 'Dry place.'
      },
      { 
        ingredient: 'Atorvastatin', 
        quantity: 10, 
        unit: 'mg',
        howToUse: 'Combined cardioprotective component.',
        sideEffects: 'Muscle ache (rare).',
        storage: 'Cool place.'
      }
    ],
    clinicalOverview: {
      uses: 'Prevention of heart attacks and strokes in patients with high cholesterol.',
      mechanism: 'Aspirin acts as an antiplatelet; Atorvastatin lowers cholesterol production.',
      contraindications: 'Bleeding disorders; active liver disease.',
      sideEffects: 'Muscle pain and stomach upset are the primary concerns.',
      pregnancyCategory: 'Category X (due to Statin component).',
      alcoholWarning: 'Increases risk of liver and stomach effects.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Contraindicated.'
    },
    department: 'Cardiology', 
    description: 'Combination medicine for heart protection and cholesterol.' 
  },
  { 
    name: 'Omee (Omeprazole) 20mg', 
    manufacturer: 'Alkem', 
    composition: ['Omeprazole 20mg'], 
    detailedComposition: [{ 
      ingredient: 'Omeprazole', 
      quantity: 20, 
      unit: 'mg',
      howToUse: 'Take on empty stomach, 30-60 mins before a meal.',
      sideEffects: 'Headache, diarrhea, gas.',
      precautions: 'Do not use for more than 14 days without advice.',
      storage: 'Protect from light.'
    }],
    clinicalOverview: {
      uses: 'Treats frequent heartburn, stomach ulcers, and GERD.',
      mechanism: 'Proton pump inhibitor that blocks acid production at the molecular level.',
      contraindications: 'Hypersensitivity to omeprazole.',
      sideEffects: 'Well tolerated for short-term use.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Can worsen acid reflux symptoms.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult physician.'
    },
    department: 'General', 
    description: 'Proton pump inhibitor for stomach acid reduction.' 
  },
  { 
    name: 'Gliclazide 80mg', 
    manufacturer: 'Micro Labs', 
    composition: ['Gliclazide 80mg'], 
    detailedComposition: [{ 
      ingredient: 'Gliclazide', 
      quantity: 80, 
      unit: 'mg',
      howToUse: 'Take with breakfast or the first main meal.',
      sideEffects: 'Low blood sugar, nausea, indigestion.',
      precautions: 'Monitor blood sugar levels regularly.',
      storage: 'Store in a dry place.'
    }],
    clinicalOverview: {
      uses: 'Type 2 diabetes mellitus when diet and exercise are not enough.',
      mechanism: 'A sulfonylurea that increases the amount of insulin released from the pancreas.',
      contraindications: 'Type 1 diabetes; severe kidney or liver disease.',
      sideEffects: 'Hypoglycemia is the primary risk.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Increases risk of severe low blood sugar.',
      drivingWarning: 'Caution: ensure blood sugar is stable before driving.',
      lactationWarning: 'Not advised.'
    },
    department: 'General', 
    description: 'Antidiabetic medication to improve insulin secretion.' 
  },
  { 
    name: 'Amlodipine 5mg', 
    manufacturer: 'Mankind', 
    composition: ['Amlodipine 5mg'], 
    detailedComposition: [{ 
      ingredient: 'Amlodipine', 
      quantity: 5, 
      unit: 'mg',
      howToUse: 'Take at the same time each day.',
      sideEffects: 'Swelling of ankles/feet, headache, flushing.',
      precautions: 'Report any worsening chest pain to doctor.',
      storage: 'Protect from light.'
    }],
    clinicalOverview: {
      uses: 'Treatment of hypertension (high blood pressure) and chronic stable angina.',
      mechanism: 'A calcium channel blocker that relaxes the muscles of your heart and blood vessels.',
      contraindications: 'Severe hypotension; hypersensitivity to dihydropyridines.',
      sideEffects: 'Peripheral edema (swelling) is common.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'May enhance the blood pressure lowering effect.',
      drivingWarning: 'Safe unless dizzy.',
      lactationWarning: 'Passes into milk; consult doctor.'
    },
    department: 'Cardiology', 
    description: 'Used for hypertension and angina.' 
  },
  { 
    name: 'Clarithromycin 250mg', 
    manufacturer: 'Alembic', 
    composition: ['Clarithromycin 250mg'], 
    detailedComposition: [{ 
      ingredient: 'Clarithromycin', 
      quantity: 250, 
      unit: 'mg',
      howToUse: 'May be taken with or without food.',
      sideEffects: 'Altered taste, nausea, diarrhea.',
      precautions: 'Caution in patients with coronary artery disease.',
      storage: 'Protect from light.'
    }],
    clinicalOverview: {
      uses: 'Treats bacterial infections like pharyngitis, tonsillitis, and skin infections.',
      mechanism: 'Macrolide antibiotic that inhibits bacterial protein synthesis.',
      contraindications: 'Concurrent use with certain statins or ergot alkaloids.',
      sideEffects: 'Standard GI side effects.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Caution advised.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult physician.'
    },
    department: 'Paediatrics', 
    description: 'Antibiotic for bacterial infections in adults and children.' 
  },
  { 
    name: 'Fexofenadine 120mg (Allegra)', 
    manufacturer: 'Sanofi', 
    composition: ['Fexofenadine 120mg'], 
    detailedComposition: [{ 
      ingredient: 'Fexofenadine', 
      quantity: 120, 
      unit: 'mg',
      howToUse: 'Take with water; avoid fruit juices as they reduce absorption.',
      sideEffects: 'Headache, drowsiness (rare), nausea.',
      precautions: 'Check with doctor if you have kidney disease.',
      storage: 'Room temperature.'
    }],
    clinicalOverview: {
      uses: 'Relief of symptoms associated with seasonal allergic rhinitis.',
      mechanism: 'Second-generation antihistamine that does not cross the blood-brain barrier.',
      contraindications: 'Hypersensitivity to fexofenadine.',
      sideEffects: 'Non-sedating in most patients.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Generally safe; caution always advised.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'Dermatology', 
    description: 'Non-sedating antihistamine for allergies.' 
  },
  { 
    name: 'Combiflam Plus', 
    manufacturer: 'Sanofi', 
    composition: ['Paracetamol 650mg', 'Caffeine 50mg'], 
    detailedComposition: [
      { 
        ingredient: 'Paracetamol', 
        quantity: 650, 
        unit: 'mg',
        howToUse: 'Relief for severe headaches.',
        sideEffects: 'Rash (rare).',
        storage: 'Dry place.'
      },
      { 
        ingredient: 'Caffeine', 
        quantity: 50, 
        unit: 'mg',
        howToUse: 'Enhances analgesic effect.',
        sideEffects: 'Insomnia, restlessness.',
        storage: 'Cool place.'
      }
    ],
    clinicalOverview: {
      uses: 'Targeted relief for severe headaches and migraines.',
      mechanism: 'Caffeine constricts blood vessels in the brain while Paracetamol elevates the pain threshold.',
      contraindications: 'Severe hypertension; heart rhythm disorders.',
      sideEffects: 'Jitteriness due to caffeine content.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Avoid; increases liver strain.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Caffeine passes into milk; use with caution.'
    },
    department: 'General', 
    description: 'Focused relief for severe headaches.' 
  },
  { 
    name: 'Asthalin (Salbutamol) Inhaler', 
    manufacturer: 'Cipla', 
    composition: ['Salbutamol 100mcg'], 
    detailedComposition: [{ 
      ingredient: 'Salbutamol', 
      quantity: 100, 
      unit: 'mcg',
      howToUse: 'Inhale through the mouth as directed during breathing difficulty.',
      sideEffects: 'Tremors, heart palpitations, headache.',
      precautions: 'Rinse mouth after use to prevent throat irritation.',
      storage: 'Keep away from heat and direct sunlight.'
    }],
    clinicalOverview: {
      uses: 'Quick-relief from asthma, COPD, and exercise-induced bronchospasm.',
      mechanism: 'A beta-2 agonist that relaxes the smooth muscles of the airways.',
      contraindications: 'Hypersensitivity to salbutamol.',
      sideEffects: 'Commonly causes fine tremors in hands.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'No direct interaction; avoid excessive intake.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General', 
    description: 'Relieves symptoms of asthma and COPD.' 
  },
  { 
    name: 'Montair 10 (Montelukast)', 
    manufacturer: 'Cipla', 
    composition: ['Montelukast 10mg'], 
    detailedComposition: [{ 
      ingredient: 'Montelukast', 
      quantity: 10, 
      unit: 'mg',
      howToUse: 'Take once daily in the evening for asthma or allergies.',
      sideEffects: 'Headache, stomach pain, mood changes.',
      precautions: 'Not for acute asthma attacks.',
      storage: 'Protect from light and moisture.'
    }],
    clinicalOverview: {
      uses: 'Prevention of asthma and relief of seasonal allergy symptoms.',
      mechanism: 'Leukotriene receptor antagonist that blocks substances causing airway swelling.',
      contraindications: 'Hypersensitivity to montelukast.',
      sideEffects: 'May cause neuropsychiatric events (mood/behavioral changes).',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Safe in moderation.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'ENT', 
    description: 'Used for asthma prevention and allergy relief.' 
  },
  { 
    name: 'Brufen 400 (Ibuprofen)', 
    manufacturer: 'Abbott', 
    composition: ['Ibuprofen 400mg'], 
    detailedComposition: [{ 
      ingredient: 'Ibuprofen', 
      quantity: 400, 
      unit: 'mg',
      howToUse: 'Take with food to minimize stomach upset.',
      sideEffects: 'Nausea, indigestion, stomach pain.',
      precautions: 'Caution in patients with history of ulcers.',
      storage: 'Keep at room temperature.'
    }],
    clinicalOverview: {
      uses: 'Relief of pain, inflammation, and fever.',
      mechanism: 'An NSAID that stops the body\'s production of chemicals causing pain and inflammation.',
      contraindications: 'Active peptic ulcer; severe heart, liver or kidney failure.',
      sideEffects: 'Risk of GI bleeding with chronic use.',
      pregnancyCategory: 'Category D in 3rd trimester',
      alcoholWarning: 'Increases risk of gastric bleeding.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe in low doses.'
    },
    department: 'General', 
    description: 'NSAID for pain and inflammation.' 
  },
  { 
    name: 'Folvite (Folic Acid) 5mg', 
    manufacturer: 'Pfizer', 
    composition: ['Folic Acid 5mg'], 
    detailedComposition: [{ 
      ingredient: 'Folic Acid', 
      quantity: 5, 
      unit: 'mg',
      howToUse: 'Take once daily or as directed by doctor.',
      sideEffects: 'Nausea, bloating, bitterness in mouth.',
      precautions: 'Do not take if you have B12 deficiency without medical advice.',
      storage: 'Cool, dry place.'
    }],
    clinicalOverview: {
      uses: 'Prevention and treatment of folate deficiency; essential during pregnancy.',
      mechanism: 'A type of B-vitamin needed for red blood cell production and DNA synthesis.',
      contraindications: 'Untreated B12 deficiency.',
      sideEffects: 'Generally very well tolerated.',
      pregnancyCategory: 'Category A: Essential and safe.',
      alcoholWarning: 'Alcohol interferes with folate absorption.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'Paediatrics', 
    description: 'Vitamin supplement for blood health.' 
  },
  {
    name: 'Calpol 500mg',
    manufacturer: 'GSK',
    composition: ['Paracetamol 500mg'],
    detailedComposition: [{
      ingredient: 'Paracetamol',
      quantity: 500,
      unit: 'mg',
      howToUse: 'Take every 4-6 hours as needed.',
      sideEffects: 'Minimal.',
      storage: 'Store below 30°C.'
    }],
    clinicalOverview: {
      uses: 'Relief of fever and mild pain in adults and children.',
      mechanism: 'Antipyretic and analgesic action.',
      contraindications: 'Severe liver damage.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Avoid alcohol.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'Trusted relief for fever and pain.'
  },
  {
    name: 'Sinarest New Tablet',
    manufacturer: 'Centaur',
    composition: ['Paracetamol 500mg', 'Phenylephrine 5mg', 'Chlorpheniramine 2mg'],
    detailedComposition: [
      { ingredient: 'Paracetamol', quantity: 500, unit: 'mg' },
      { ingredient: 'Phenylephrine', quantity: 5, unit: 'mg' },
      { ingredient: 'Chlorpheniramine', quantity: 2, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Used for common cold, nasal congestion, and allergic symptoms.',
      mechanism: 'Combination of analgesic, nasal decongestant and antihistamine.',
      contraindications: 'High blood pressure, severe heart disease.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Causes excessive sleepiness.',
      drivingWarning: 'CAUTION: Avoid driving.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'ENT',
    description: 'Relieves symptoms of cold and flu.'
  },
  {
    name: 'Vicks Action 500 Advanced',
    manufacturer: 'P&G',
    composition: ['Paracetamol 500mg', 'Phenylephrine 5mg', 'Caffeine 30mg'],
    detailedComposition: [
      { ingredient: 'Paracetamol', quantity: 500, unit: 'mg' },
      { ingredient: 'Phenylephrine', quantity: 5, unit: 'mg' },
      { ingredient: 'Caffeine', quantity: 30, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Relief from cold and flu symptoms including blocked nose and headache.',
      mechanism: 'Relieves pain, shrinks nasal blood vessels, and improves alertness.',
      contraindications: 'Hypersensitivity to ingredients.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Avoid alcohol.',
      drivingWarning: 'Monitor alertness.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General',
    description: 'Effective relief for common cold symptoms.'
  },
  {
    name: 'Okacet (Cetirizine 10mg)',
    manufacturer: 'Cipla',
    composition: ['Cetirizine 10mg'],
    detailedComposition: [{
      ingredient: 'Cetirizine',
      quantity: 10,
      unit: 'mg',
      howToUse: 'One tablet daily.',
      sideEffects: 'Drowsiness.',
      storage: 'Room temperature.'
    }],
    clinicalOverview: {
      uses: 'Allergy relief for hay fever and skin conditions.',
      mechanism: 'Antihistamine blocking H1 receptors.',
      contraindications: 'Severe kidney issues.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'DO NOT drink alcohol.',
      drivingWarning: 'Avoid driving if sleepy.',
      lactationWarning: 'Not advised.'
    },
    department: 'ENT',
    description: 'Fast-acting allergy relief.'
  },
  {
    name: 'Zyrtec 10mg',
    manufacturer: 'Dr Reddy',
    composition: ['Cetirizine 10mg'],
    detailedComposition: [{
      ingredient: 'Cetirizine',
      quantity: 10,
      unit: 'mg'
    }],
    clinicalOverview: {
      uses: 'Relief from sneezing, runny nose, and itchy eyes.',
      mechanism: 'Blocks histamine action.',
      contraindications: 'Severe renal impairment.',
      pregnancyCategory: 'Category B',
      alcoholWarning: 'Increases drowsiness.',
      drivingWarning: 'Caution required.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'ENT',
    description: 'Premium allergy relief.'
  },
  {
    name: 'Disprin 325mg',
    manufacturer: 'Reckitt',
    composition: ['Aspirin 325mg'],
    detailedComposition: [{
      ingredient: 'Aspirin',
      quantity: 325,
      unit: 'mg',
      howToUse: 'Dissolve in water before taking.'
    }],
    clinicalOverview: {
      uses: 'Pain relief for headaches, toothaches, and menstrual pain.',
      mechanism: 'NSAID that blocks pain signals.',
      contraindications: 'Bleeding disorders, asthma.',
      pregnancyCategory: 'Category D',
      alcoholWarning: 'Increases risk of stomach bleeding.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General',
    description: 'Dissolvable pain relief.'
  },
  {
    name: 'Saridon',
    manufacturer: 'Bayer',
    composition: ['Paracetamol 250mg', 'Propyphenazone 150mg', 'Caffeine 50mg'],
    detailedComposition: [
      { ingredient: 'Paracetamol', quantity: 250, unit: 'mg' },
      { ingredient: 'Propyphenazone', quantity: 150, unit: 'mg' },
      { ingredient: 'Caffeine', quantity: 50, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Effective against severe headaches and body aches.',
      mechanism: 'Triple action formula for fast pain relief.',
      contraindications: 'Peptic ulcers, glaucoma.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Avoid alcohol.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General',
    description: 'Advanced headache relief.'
  },
  {
    name: 'Limcee 500mg Chewable',
    manufacturer: 'Abbott',
    composition: ['Vitamin C (Ascorbic Acid) 500mg'],
    detailedComposition: [{
      ingredient: 'Vitamin C',
      quantity: 500,
      unit: 'mg'
    }],
    clinicalOverview: {
      uses: 'Vitamin C supplement for immunity and skin health.',
      mechanism: 'Acts as an antioxidant and cofactor in collagen synthesis.',
      contraindications: 'Kidney stones (high doses).',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'Vitamin C supplement for daily health.'
  },
  {
    name: 'Becosules Capsules',
    manufacturer: 'Pfizer',
    composition: ['B-Complex with Vitamin C'],
    detailedComposition: [
      { ingredient: 'Vitamin B1', quantity: 10, unit: 'mg' },
      { ingredient: 'Vitamin B2', quantity: 10, unit: 'mg' },
      { ingredient: 'Vitamin C', quantity: 150, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Treatment of Vitamin B-complex and C deficiency.',
      mechanism: 'Replenishes essential water-soluble vitamins.',
      contraindications: 'Hypersensitivity.',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'Comprehensive vitamin supplement.'
  },
  {
    name: 'Digene Gel Mint Flavor 200ml',
    manufacturer: 'Abbott',
    composition: ['Magnesium Hydroxide 25mg', 'Simethicone 25mg', 'Magnesium Aluminium Silicate Hydrate 50mg', 'Dried Aluminium Hydroxide Gel 300mg'],
    detailedComposition: [
      { ingredient: 'Aluminium Hydroxide', quantity: 300, unit: 'mg' },
      { ingredient: 'Magnesium Hydroxide', quantity: 25, unit: 'mg' },
      { ingredient: 'Simethicone', quantity: 25, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Relief from acidity, gas, heartburn, and bloated stomach.',
      mechanism: 'Neutralizes stomach acid and breaks down gas bubbles.',
      contraindications: 'Severe kidney disease.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Avoid as it may aggravate acidity.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'General',
    description: 'Antacid and antigas gel for fast relief.'
  },
  {
    name: 'Shelcal 500mg',
    manufacturer: 'Torrent',
    composition: ['Calcium Carbonate 500mg', 'Vitamin D3 250IU'],
    detailedComposition: [
      { ingredient: 'Calcium', quantity: 500, unit: 'mg' },
      { ingredient: 'Vitamin D3', quantity: 250, unit: 'IU' }
    ],
    clinicalOverview: {
      uses: 'Treatment of calcium and vitamin D deficiency and osteoporosis.',
      mechanism: 'Provides essential minerals for bone health.',
      contraindications: 'High calcium levels in blood/urine.',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'Orthopaedics',
    description: 'Calcium and Vitamin D3 supplement for bones.'
  },
  {
    name: 'Evion 400mg',
    manufacturer: 'Procter & Gamble',
    composition: ['Vitamin E (Tocopheryl Acetate) 400mg'],
    detailedComposition: [{
      ingredient: 'Vitamin E',
      quantity: 400,
      unit: 'mg'
    }],
    clinicalOverview: {
      uses: 'Vitamin E supplement for skin, hair, and muscle health.',
      mechanism: 'Strong antioxidant that protects cells from damage.',
      contraindications: 'Blood clotting disorders.',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'Antioxidant supplement for skin and health.'
  },
  {
    name: 'Neurobion Forte',
    manufacturer: 'P&G',
    composition: ['Vitamin B1 10mg', 'Vitamin B2 10mg', 'Vitamin B3 45mg', 'Vitamin B5 50mg', 'Vitamin B6 3mg', 'Vitamin B12 15mcg'],
    detailedComposition: [
      { ingredient: 'Vitamin B12', quantity: 15, unit: 'mcg' },
      { ingredient: 'Vitamin B1', quantity: 10, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Treatment of vitamin B deficiency and nerve damage.',
      mechanism: 'Supports healthy nerve function and metabolism.',
      contraindications: 'Hypersensitivity.',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'Vitamin B-complex for nerve health.'
  },
  {
    name: 'Electral Sachet 21.8g',
    manufacturer: 'FDC',
    composition: ['Oral Rehydration Salts (ORS)'],
    detailedComposition: [{
      ingredient: 'Electrolytes',
      quantity: 21.8,
      unit: 'g'
    }],
    clinicalOverview: {
      uses: 'Restoration of body fluids and electrolytes lost due to dehydration.',
      mechanism: 'Provides balanced glucose and electrolytes for rapid absorption.',
      contraindications: 'Kidney failure, intestinal obstruction.',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'WHO recommended oral rehydration salts.'
  },
  {
    name: 'Volini Gel 30g',
    manufacturer: 'Sun Pharma',
    composition: ['Diclofenac Diethylamine 1.16%', 'Linseed Oil 3%', 'Methyl Salicylate 10%', 'Menthol 5%'],
    detailedComposition: [
      { ingredient: 'Diclofenac', quantity: 1.16, unit: '%' },
      { ingredient: 'Menthol', quantity: 5, unit: '%' }
    ],
    clinicalOverview: {
      uses: 'Pain relief for back pain, joint pain, and muscle sprains.',
      mechanism: 'Topical NSAID that penetrates skin to reduce inflammation.',
      contraindications: 'External use only; do not apply on broken skin.',
      pregnancyCategory: 'Category C',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Consult doctor.'
    },
    department: 'Orthopaedics',
    description: 'Pain relief gel for musculoskeletal pain.'
  },
  {
    name: 'Liv 52 DS Tablet',
    manufacturer: 'Himalaya',
    composition: ['Himsra', 'Kasani', 'Mandur Bhasma', 'Kakamachi', 'Arjuna'],
    detailedComposition: [
      { ingredient: 'Herbal extracts', quantity: 100, unit: 'mg' }
    ],
    clinicalOverview: {
      uses: 'Liver protection and appetite stimulant.',
      mechanism: 'Ayurvedic formula to improve liver function.',
      contraindications: 'None known.',
      pregnancyCategory: 'Category A',
      alcoholWarning: 'Safe.',
      drivingWarning: 'Safe.',
      lactationWarning: 'Safe.'
    },
    department: 'General',
    description: 'Daily liver health supplement.'
  }
];

module.exports = medicines;
