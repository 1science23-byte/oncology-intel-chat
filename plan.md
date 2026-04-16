# OncoProtocol AI - Specialized Clinical Cancer Information Assistant

## 1. Objective
Build a specialized cancer information assistant, **OncoProtocol AI**, featuring a "standard level strict" Q&A database of over 9,000 records and a clinical AI fallback mechanism. The focus is on clinical accuracy, precision, and adherence to medical information standards.

## 2. Technical Stack
- React 19 + Vite
- Tailwind CSS (Clinical theme: Slate/Cyan/Blue)
- Lucide React (Icons)
- Framer Motion (Animations)
- Sonner (Notifications)
- Shadcn UI (Components)

## 3. Component Architecture
- `src/App.tsx`: Main entry point.
- `src/components/Chat/ChatInterface.tsx`: Core chat logic and initial state.
- `src/components/Chat/ChatHeader.tsx`: Title, branding, and medical disclaimer.
- `src/components/Chat/MessageList.tsx`: Conversation history display.
- `src/components/Chat/ChatInput.tsx`: User input with suggestions.
- `src/lib/chat-service.ts`: Clinical search logic and AI Group API fallback simulation.
- `src/data/cancer-data.ts`: Strict, clinically-vetted Q&A database.

## 4. Features & UX
- **Clinical Precision**: Q&A data rewritten to meet "standard level strict" requirements.
- **Search Simulation**: Weighted keyword matching over the 9,000+ record database.
- **AI Fallback**: Simulated responses from the "AI Group API" for complex queries.
- **Medical Disclaimer**: Integrated header-level and persistent disclaimers.
- **Responsive Design**: Mobile-first architecture with professional aesthetics.

## 5. Implementation Steps
1. **Rename Project**: Update all branding and text to "OncoProtocol AI".
2. **Strict Data Integration**: Update `cancer-data.ts` with clinically-precise Q&A pairs.
3. **Refine UI**: Ensure the chat interface reflects a professional clinical assistant.
4. **Update Fallbacks**: Ensure fallback messages align with the strict information standard.
5. **Final Validation**: Ensure all components work correctly with the new data structure.