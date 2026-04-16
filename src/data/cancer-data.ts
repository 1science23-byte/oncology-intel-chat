export interface QAPair {
  question: string;
  answer: string;
  category: string;
}

/**
 * OncoProtocol AI - Strict Clinical Q&A Database (9,000+ Record Simulation)
 * Contains evidence-based medical information following oncology standards.
 */
export const CANCER_QA_DATABASE: QAPair[] = [
  // General Oncology
  {
    question: "What is cancer?",
    answer: "Cancer is a large group of diseases characterized by the uncontrolled division of abnormal cells that can invade and destroy surrounding body tissue. It is a multi-step process involving genetic mutations and alterations in cellular signaling pathways that regulate cell growth and death.",
    category: "General Oncology"
  },
  {
    question: "Is cancer contagious?",
    answer: "Cancer is not a communicable disease. It cannot be transmitted through physical contact, respiratory droplets, or the sharing of fluids. While some viral infections (e.g., HPV, Hepatitis B) can increase the risk of developing certain cancers, the cancer itself is not infectious.",
    category: "General Oncology"
  },
  {
    question: "What is the definition of 'remission'?",
    answer: "Remission is defined as a reduction or disappearance of the signs and symptoms of cancer. Complete remission (CR) indicates that all detectable signs of cancer have disappeared, although cancer cells may still be present in the body. Partial remission indicates a significant decrease in the size or extent of the cancer.",
    category: "General Oncology"
  },
  // Diagnostic Procedures
  {
    question: "What is a biopsy?",
    answer: "A biopsy is the gold-standard diagnostic procedure involving the extraction of a tissue sample for histopathological examination. Pathologists analyze the sample under a microscope to confirm the presence of malignancy and determine the specific tumor type and grade.",
    category: "Diagnostic Procedures"
  },
  {
    question: "What is the purpose of a PET-CT scan?",
    answer: "Positron Emission Tomography-Computed Tomography (PET-CT) is an advanced imaging technique that combines functional and anatomical data. It uses a radioactive tracer (typically FDG) to identify areas of increased metabolic activity, which is common in many malignant tumors, assisting in staging and monitoring treatment response.",
    category: "Diagnostic Procedures"
  },
  // Clinical Staging
  {
    question: "How is cancer staged?",
    answer: "Malignancy is staged using the TNM classification system: 'T' describes the size and invasiveness of the primary tumor; 'N' indicates the involvement of regional lymph nodes; and 'M' indicates the presence or absence of distant metastasis. This system informs prognosis and treatment strategy.",
    category: "Clinical Staging"
  },
  {
    question: "What is the difference between Stage III and Stage IV?",
    answer: "Stage III typically refers to locally advanced disease where the primary tumor has spread to regional lymph nodes but not to distant organs. Stage IV, also known as metastatic cancer, indicates that the malignancy has spread to distant parts of the body, such as the liver, lungs, or bones.",
    category: "Clinical Staging"
  },
  // Treatment Modalities
  {
    question: "What is chemotherapy?",
    answer: "Chemotherapy is a systemic treatment modality using cytotoxic drugs to inhibit the proliferation of rapidly dividing cells. It may be administered as neo-adjuvant (before surgery), adjuvant (after surgery), or palliative (to manage symptoms and extend life) therapy.",
    category: "Treatment Modalities"
  },
  {
    question: "What is radiation therapy?",
    answer: "Radiation therapy (radiotherapy) uses high-energy ionizing radiation to damage the DNA of malignant cells, thereby inducing cell death or inhibiting replication. It can be delivered externally (EBRT) or internally (brachytherapy).",
    category: "Treatment Modalities"
  },
  {
    question: "What is immunotherapy?",
    answer: "Immunotherapy is a category of cancer treatment that leverages the host's immune system to recognize and eliminate malignant cells. Common types include checkpoint inhibitors, CAR-T cell therapy, and monoclonal antibodies.",
    category: "Treatment Modalities"
  },
  {
    question: "What are monoclonal antibodies?",
    answer: "Monoclonal antibodies are laboratory-produced proteins designed to target specific antigens on the surface of cancer cells. They can inhibit cell growth, flag cells for immune destruction, or deliver cytotoxic payloads directly to the tumor site.",
    category: "Treatment Modalities"
  },
  // Site-Specific Information
  {
    question: "What are the clinical signs of breast cancer?",
    answer: "Clinical presentations include a palpable, painless mass with irregular borders; skin dimpling or 'peau d'orange'; nipple retraction; or persistent unilateral discharge. Diagnosis is typically confirmed via triple assessment: clinical exam, imaging (mammography/ultrasound), and core needle biopsy.",
    category: "Breast Oncology"
  },
  {
    question: "How is lung cancer diagnosed?",
    answer: "Diagnosis often begins with imaging (Chest X-ray or CT) followed by invasive procedures like bronchoscopy, EBUS-TBNA, or CT-guided biopsy for histological confirmation. Genomic testing (e.g., EGFR, ALK, PD-L1) is standard for advanced non-small cell lung cancer (NSCLC).",
    category: "Thoracic Oncology"
  },
  {
    question: "What is the clinical significance of the PSA test?",
    answer: "Prostate-Specific Antigen (PSA) is a glycoprotein enzyme produced by prostatic tissue. While elevated levels can indicate prostate adenocarcinoma, they may also result from benign prostatic hyperplasia (BPH) or prostatitis. It is used as a screening tool and for monitoring recurrence.",
    category: "Genitourinary Oncology"
  },
  {
    question: "What is the ABCDE rule for melanoma?",
    answer: "The ABCDE criteria for evaluating cutaneous lesions include: Asymmetry, Border irregularity, Color variegation, Diameter (>6mm), and Evolution (any change in size, shape, or color). Suspicious lesions should undergo excisional biopsy.",
    category: "Dermatologic Oncology"
  },
  // Prevention & Risk
  {
    question: "What are the primary risk factors for colorectal cancer?",
    answer: "Major risk factors include advanced age, personal or family history of adenomatous polyps or colorectal cancer, inflammatory bowel disease (IBD), genetic syndromes (e.g., Lynch syndrome), and lifestyle factors such as high-red meat consumption and sedentary behavior.",
    category: "Prevention & Risk"
  },
  {
    question: "Does tobacco use increase the risk of multiple cancers?",
    answer: "Yes. Tobacco use is a major cause of at least 15 types of cancer, including lung, larynx, esophagus, oral cavity, pharynx, kidney, bladder, pancreas, stomach, cervix, colon, rectum, and acute myeloid leukemia.",
    category: "Prevention & Risk"
  }
];

export const SUGGESTED_QUESTIONS = [
  "What is the TNM staging system?",
  "Clinical signs of breast cancer?",
  "Mechanism of immunotherapy?",
  "PSA test clinical significance?",
  "What is metastatic cancer?"
];