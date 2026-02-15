# 🎯 SmartPrep - Interview Preparation Platform

A comprehensive, interactive web-based platform designed to help developers prepare for technical interviews across multiple domains. SmartPrep offers a clean, intuitive interface with hundreds of curated interview questions covering everything from Data Structures & Algorithms to System Design.

![SmartPrep](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Platform](https://img.shields.io/badge/Platform-Web-orange)

🌐 **[Live Demo](https://alhusso.com/smartprep/)** - Try SmartPrep now!

## ✨ Features

- **18+ Technical Topics** - Comprehensive coverage of Java, Spring, JavaScript, React, DSA, System Design, and more
- **Rich Question Bank** - Hundreds of carefully curated interview questions with detailed answers
- **Difficulty Levels** - Questions categorized as Easy, Medium, or Hard
- **Code Examples** - Practical code implementations for technical questions
- **Progress Tracking** - Track your preparation progress with local storage persistence
- **Smart Navigation** - Easy navigation between questions with keyboard shortcuts
- **Shuffle Mode** - Randomize questions to test your knowledge effectively
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI/UX** - Modern, distraction-free interface focused on learning

## 📚 Topics Covered

### Backend Development
- ☕ **Java** - Core Java concepts and best practices
- 🍃 **Spring Framework** - Spring Core, IoC, AOP
- 🍃 **Spring Boot** - Auto-configuration, annotations, best practices
- 🔐 **Spring Security** - Authentication, authorization, JWT
- 🗃️ **Spring Data JPA** - ORM, repositories, relationships

### Frontend Development
- 💛 **JavaScript** - ES6+, closures, promises, async/await
- 📘 **TypeScript** - Types, interfaces, generics
- ⚛️ **React.js** - Components, hooks, state management
- 📱 **React Native** - Mobile app development

### Database & Storage
- 🗄️ **RDBMS** - Relational database concepts
- 🗄️ **SQL** - Queries, joins, indexes, optimization
- 🗄️ **MySQL** - MySQL-specific features and database design

### Computer Science Fundamentals
- 🧮 **DSA** - Data structures and algorithms
- 🏗️ **System Design** - Scalability, architecture patterns

### DevOps & Architecture
- 🐳 **Docker** - Containerization and DevOps practices
- 🔧 **Microservices** - Microservices architecture patterns
- 🔗 **REST API** - RESTful design principles

### Soft Skills
- 🎯 **Behavioral** - Behavioral interview questions and STAR method

## 🚀 Getting Started

### Online Access

You can access SmartPrep directly at: **[https://alhusso.com/smartprep/](https://alhusso.com/smartprep/)**

No installation required! Just open the link in your browser and start practicing.

### Local Installation

#### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for running the local server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alhussaintalukder/SmartPrep.git
   cd SmartPrep
   ```

2. **Start the application**

   **On Windows (PowerShell):**
   ```powershell
   .\start.ps1
   ```

   **On Windows (Command Prompt):**
   ```cmd
   start.bat
   ```

   **On macOS/Linux:**
   ```bash
   python3 -m http.server 8088
   ```

3. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8088`

### Stopping the Server

**On Windows:**
```powershell
.\stop.ps1
```

**On macOS/Linux:**
Press `Ctrl + C` in the terminal running the server

## 💡 How to Use

1. **Select a Topic** - Click on any topic from the left sidebar to load its questions
2. **Navigate Questions** - Use the Previous/Next buttons or click question numbers at the bottom
3. **View Content** - Switch between Answer, Explanation, and Code Example tabs
4. **Track Progress** - Mark questions as complete to track your preparation progress
5. **Shuffle Questions** - Use the shuffle button to randomize question order for better learning
6. **Monitor Progress** - Check your overall completion percentage in the sidebar

### Keyboard Shortcuts

- `←` Previous Question
- `→` Next Question
- `Space` Mark as Complete

## 📁 Project Structure

```
SmartPrep/
├── index.html              # Main HTML file
├── script.js               # Core application logic
├── style.css               # Styling and layout
├── start.bat               # Windows startup script (CMD)
├── start.ps1               # Windows startup script (PowerShell)
├── stop.ps1                # Windows stop script
├── data/                   # Question data files
│   ├── java.json
│   ├── spring-boot.json
│   ├── javascript.json
│   ├── react.json
│   ├── dsa.json
│   ├── system-design.json
│   └── ... (more topics)
└── README.md               # This file
```

## 📝 Data Format

Questions are stored in JSON format with the following structure:

```json
{
  "topic": "Topic Name",
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "answer": "Detailed answer with key points",
      "explanation": "Additional explanation if needed",
      "difficulty": "Easy|Medium|Hard",
      "code": "// Optional code example"
    }
  ]
}
```

### Adding New Questions

1. Navigate to the appropriate JSON file in the `data/` folder
2. Add your question following the format above
3. Refresh the browser to see your changes

### Creating a New Topic

1. Create a new JSON file in the `data/` folder (e.g., `golang.json`)
2. Add the topic structure with questions
3. Update the `topics` array in `script.js`:
   ```javascript
   { id: 'golang', name: 'Go Programming', icon: '🐹', file: 'data/golang.json' }
   ```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Progress persistence
- **Python HTTP Server** - Local development server
- **JSON** - Data storage format

## 🎨 Features in Detail

### Progress Tracking
Your progress is automatically saved in your browser's local storage. You can mark questions as complete, and the system will:
- Track completed questions per topic
- Display overall progress percentage
- Persist your progress across browser sessions
- Highlight completed questions

### Responsive Design
SmartPrep is fully responsive and provides an optimal viewing experience across:
- Desktop computers (1920px+)
- Laptops (1366px - 1920px)
- Tablets (768px - 1366px)
- Mobile devices (320px - 768px)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add New Questions** - Submit PRs with new questions in existing topics
2. **Create New Topics** - Add entirely new technical topics
3. **Fix Bugs** - Report or fix any issues you find
4. **Improve UI/UX** - Suggest or implement design improvements
5. **Documentation** - Help improve documentation

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for comprehensive, accessible interview preparation
- Built with ❤️ for the developer community
- Special thanks to all contributors

## � Links

- **Live Application**: [https://alhusso.com/smartprep/](https://alhusso.com/smartprep/)
- **GitHub Repository**: [https://github.com/alhussaintalukder/SmartPrep](https://github.com/alhussaintalukder/SmartPrep)
- **Main Website**: [https://alhusso.com](https://alhusso.com)

## �📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Happy Learning! 🚀**

*SmartPrep - Your Smart Way to Prepare for Technical Interviews*
