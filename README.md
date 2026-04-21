# 🚀 Tredence – HR Workflow Designer (Prototype)

A **React-based HR Workflow Designer** that allows admins to visually create, configure, and simulate internal workflows such as onboarding, approvals, and automation pipelines.

This project is built as part of the **Tredence Full Stack Engineering Intern Case Study**.

---

## 📌 Features

### 🧩 Workflow Canvas (React Flow)
- Drag-and-drop interface for workflow creation
- Connect nodes with edges
- Delete/edit nodes and connections
- Auto-validation (e.g., Start node must be first)

### 🔷 Custom Node Types
- **Start Node** – Entry point  
- **Task Node** – Human tasks  
- **Approval Node** – Decision points  
- **Automated Node** – System-triggered actions  
- **End Node** – Completion  

### 📝 Node Configuration Panel
Each node includes dynamic forms:
- Controlled inputs
- Configurable fields
- Type-safe state handling
- Extendable architecture

### 🔌 Mock API Layer
- `GET /automations` → Fetch automation actions  
- `POST /simulate` → Simulate workflow execution  

### 🧪 Workflow Sandbox
- Serialize workflow to JSON  
- Simulate execution via API  
- Display step-by-step logs  
- Validate graph structure  

---

## 🏗️ Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | React / Next.js / Vite |
| State Mgmt   | React Hooks / Context |
| Flow Engine  | React Flow |
| Styling      | Tailwind CSS |
| API Layer    | Mock APIs (JSON Server / MSW) |
| Language     | TypeScript |

---

## 📂 Project Structure

```
src/
│── components/        # UI components
│── nodes/             # Custom workflow nodes
│── hooks/             # Reusable hooks
│── services/          # API layer
│── utils/             # Helper functions
│── pages/             # App pages
│── types/             # TypeScript interfaces
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/GlitchZap/Tredence.git
cd Tredence
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Development Server
```bash
npm run dev
```

---

## 🧠 Architecture Overview

This project follows **clean and scalable frontend architecture**:

- Separation of concerns:
  - Canvas logic
  - Node logic
  - API logic
- Modular component design
- Reusable hooks for state & logic
- Strong TypeScript typing for workflow nodes
- Extensible node system (easy to add new node types)

---

## 🔄 Workflow Execution Logic

1. User builds workflow using nodes  
2. Workflow is converted to JSON  
3. JSON is sent to `/simulate` API  
4. API returns execution steps  
5. UI displays step-by-step results  

---

## ⚖️ Design Decisions

- **React Flow** chosen for graph-based UI  
- **TypeScript** for scalability & type safety  
- **Mock APIs** to simulate backend behavior  
- **Controlled forms** for predictable state handling  
- **Modular nodes** for extensibility  

---

## 🚧 What’s Implemented

✅ Workflow canvas with drag-drop  
✅ Multiple node types  
✅ Node editing panel  
✅ Mock API integration  
✅ Workflow simulation panel  

---

## ⏳ What Can Be Improved

- Export / Import workflow as JSON  
- Undo / Redo functionality  
- Auto-layout for nodes  
- Visual error indicators  
- Mini-map and zoom controls  
- Node versioning  

---

## 📊 Evaluation Criteria

This project focuses on:

- React architecture & modularity  
- React Flow usage (nodes, edges, layout)  
- Complex form handling  
- API abstraction  
- Scalability of design  
- Clean code & structure  

---

## 🌟 Future Enhancements (Optional)

- Workflow templates  
- Drag-and-drop improvements  
- Real backend integration (FastAPI / Node.js)  
- Role-based workflow execution  
- Advanced validation engine  
- Performance optimization for large graphs  

---

## 🖼️ Screenshots (Add Your Own)

> Add screenshots or GIFs here to showcase:
- Workflow Canvas  
- Node Configuration Panel  
- Simulation Panel  

Example:
```
![Workflow Canvas](./screenshots/canvas.png)
```

---

## 🧪 Testing

- Unit Testing: Jest / React Testing Library  
- E2E Testing (Optional): Cypress / Playwright  

---

## 👨‍💻 Author

**Aayush Kumar**  
- GitHub: https://github.com/GlitchZap  
- Engineering Student | Full Stack Developer  

---

## 📄 License

This project is for educational and internship evaluation purposes.