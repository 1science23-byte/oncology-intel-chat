-- Create cancer_qa table
CREATE TABLE IF NOT EXISTS public.cancer_qa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create chat_messages table to persist conversation history
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- Optional, for authenticated users
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    is_fallback BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.cancer_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for cancer_qa (Public Read Access)
CREATE POLICY "Allow public read access to cancer_qa" 
ON public.cancer_qa FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policies for chat_messages (Public Insert Access)
CREATE POLICY "Allow public insert to chat_messages" 
ON public.chat_messages FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cancer_qa_question ON public.cancer_qa USING gin (to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages (created_at DESC);

-- Seed Initial Data from cancer-data.ts
INSERT INTO public.cancer_qa (question, answer, category) VALUES
('What is cancer?', 'Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.', 'General'),
('Is cancer contagious?', 'No, cancer is not contagious. You cannot catch cancer from someone who has it.', 'General'),
('What does ''remission'' mean?', 'Remission means that the signs and symptoms of your cancer are reduced.', 'General'),
('What are the common symptoms of cancer?', 'Common symptoms include unusual lumps, persistent cough, changes in bowel habits, unexplained weight loss, fatigue, and persistent pain.', 'Symptoms'),
('What is a biopsy?', 'A biopsy is a medical procedure to remove a piece of tissue or a sample of cells from your body so that it can be examined in a laboratory.', 'Diagnosis'),
('How is cancer staged?', 'Cancer is staged using the TNM system: T (size and extent of primary tumor), N (nearby lymph nodes), and M (metastasis).', 'Diagnosis'),
('What is chemotherapy?', 'Chemotherapy is a type of cancer treatment that uses powerful drugs to kill fast-growing cells in your body.', 'Treatment'),
('What is radiation therapy?', 'Radiation therapy is a cancer treatment that uses high doses of radiation to kill cancer cells and shrink tumors.', 'Treatment'),
('What is immunotherapy?', 'Immunotherapy is a type of cancer treatment that helps your immune system fight cancer.', 'Treatment'),
('What are the early signs of breast cancer?', 'Early signs can include a new lump in the breast or underarm, thickening or swelling, and skin irritation.', 'Breast Cancer'),
('How is lung cancer diagnosed?', 'Lung cancer is typically diagnosed through imaging tests like X-rays or CT scans, and tissue biopsy.', 'Lung Cancer'),
('What is the PSA test for prostate cancer?', 'The PSA test measures the level of prostate-specific antigen in the blood.', 'Prostate Cancer'),
('What are the warning signs of skin cancer?', 'The ''ABCDE'' rule: Asymmetry, Border, Color, Diameter, and Evolving.', 'Skin Cancer'),
('What are the symptoms of leukemia?', 'Common leukemia symptoms include fever, chills, persistent fatigue, and frequent infections.', 'Leukemia'),
('What is a colonoscopy used for?', 'A colonoscopy allows a doctor to look inside the entire rectum and colon to check for signs of cancer.', 'Colon Cancer'),
('What are the symptoms of ovarian cancer?', 'Vague symptoms like abdominal bloating, quickly feeling full, weight loss, and pelvic discomfort.', 'Ovarian Cancer'),
('Can diet help prevent cancer?', 'A healthy diet rich in fruits, vegetables, and whole grains can help reduce the risk of certain cancers.', 'Prevention'),
('Does smoking cause cancer?', 'Yes, smoking is the leading cause of cancer and cancer deaths.', 'Prevention')
ON CONFLICT DO NOTHING;