// SmartPrep - Interview Preparation App

// Topic configuration
const topics = [
    { id: 'java', name: 'Java', icon: '☕', file: 'data/java.json' },
    { id: 'spring-framework', name: 'Spring Framework', icon: '🍃', file: 'data/spring-framework.json' },
    { id: 'spring-boot', name: 'Spring Boot', icon: '🍃', file: 'data/spring-boot.json' },
    { id: 'spring-security', name: 'Spring Security', icon: '🔐', file: 'data/spring-security.json' },
    { id: 'spring-data-jpa', name: 'Spring Data JPA', icon: '🗃️', file: 'data/spring-data-jpa.json' },
    { id: 'javascript', name: 'JavaScript', icon: '💛', file: 'data/javascript.json' },
    { id: 'typescript', name: 'TypeScript', icon: '📘', file: 'data/typescript.json' },
    { id: 'react', name: 'React.js', icon: '⚛️', file: 'data/react.json' },
    { id: 'react-native', name: 'React Native', icon: '📱', file: 'data/react-native.json' },
    { id: 'rdbms', name: 'RDBMS', icon: '🗄️', file: 'data/rdbms.json' },
    { id: 'sql', name: 'SQL', icon: '🗄️', file: 'data/sql.json' },
    { id: 'dsa', name: 'DSA', icon: '🧮', file: 'data/dsa.json' },
    { id: 'system-design', name: 'System Design', icon: '🏗️', file: 'data/system-design.json' },
    { id: 'microservices', name: 'Microservices', icon: '🔧', file: 'data/microservices.json' },
    { id: 'mysql', name: 'MySQL & Database', icon: '🗄️', file: 'data/mysql.json' },
    { id: 'rest-api', name: 'REST API', icon: '🔗', file: 'data/rest-api.json' },
    { id: 'docker', name: 'Docker & DevOps', icon: '🐳', file: 'data/docker.json' },
    { id: 'behavioral', name: 'Behavioral', icon: '🎯', file: 'data/behavioral.json' }
];

// State management
let currentTopic = null;
let currentQuestions = [];
let currentIndex = 0;
let completedQuestions = JSON.parse(localStorage.getItem('smartprep_completed') || '{}');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTopicList();
    updateOverallProgress();
});

// Render topic list in sidebar
function renderTopicList() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = topics.map(topic => `
        <li>
            <a href="#" onclick="loadTopic('${topic.id}')" id="topic-${topic.id}">
                <span>${topic.icon}</span>
                ${topic.name}
                <span class="count" id="count-${topic.id}">...</span>
            </a>
        </li>
    `).join('');

    // Load question counts
    topics.forEach(topic => loadQuestionCount(topic));
}

// Load question count for a topic
async function loadQuestionCount(topic) {
    try {
        const response = await fetch(topic.file);
        const data = await response.json();
        document.getElementById(`count-${topic.id}`).textContent = data.questions.length;
    } catch (error) {
        document.getElementById(`count-${topic.id}`).textContent = '0';
    }
}

// Load a topic
async function loadTopic(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    try {
        const response = await fetch(topic.file);
        const data = await response.json();
        
        currentTopic = topic;
        currentQuestions = data.questions;
        currentIndex = 0;

        // Update active state in sidebar
        document.querySelectorAll('.topic-list li a').forEach(a => a.classList.remove('active'));
        document.getElementById(`topic-${topicId}`).classList.add('active');

        // Update UI
        document.getElementById('currentTopic').textContent = topic.name;
        renderQuestionNumbers();
        displayQuestion();
        updateProgress();

    } catch (error) {
        console.error('Error loading topic:', error);
        alert('Error loading questions. Please try again.');
    }
}

// Display current question
function displayQuestion() {
    if (!currentQuestions.length) return;

    const question = currentQuestions[currentIndex];
    
    // Update question
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionCounter').textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    
    // Update difficulty badge
    const badge = document.getElementById('difficultyBadge');
    badge.textContent = question.difficulty || 'Medium';
    badge.className = `difficulty-badge ${(question.difficulty || 'medium').toLowerCase()}`;

    // Update answer
    document.getElementById('answerText').innerHTML = formatText(question.answer);
    
    // Update explanation
    document.getElementById('explanationText').innerHTML = formatText(question.explanation || 'No additional explanation available.');
    
    // Update code example
    const codeText = document.getElementById('codeText');
    if (question.code) {
        codeText.textContent = question.code;
        document.getElementById('codeTab').style.display = 'block';
    } else {
        codeText.textContent = '// No code example for this question';
        document.getElementById('codeTab').style.display = 'none';
    }

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === currentQuestions.length - 1;

    // Update complete button
    updateCompleteButton();
    
    // Update active question number
    updateActiveNumber();

    // Show answer tab by default
    showTab('answer');
}

// Format text with rich HTML structure for better readability
function formatText(text) {
    if (!text) return '';
    
    const lines = text.split('\n').filter(line => line.trim());
    let html = '<div class="answer-content">';
    let currentList = null;
    let listItems = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check if line is a title (ends with colon and next line might be bullets)
        if (line.endsWith(':') && !line.startsWith('•') && !line.match(/^\d+\./)) {
            // Close any open list
            if (currentList) {
                html += formatList(currentList, listItems);
                currentList = null;
                listItems = [];
            }
            
            // Check if it's a main title or subtitle based on context
            const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
            const isMainTitle = nextLine.startsWith('•') || nextLine.match(/^\d+\./);
            
            if (isMainTitle) {
                html += `<h3 class="answer-title">${escapeHtml(line.slice(0, -1))}</h3>`;
            } else {
                html += `<h4 class="answer-subtitle">${escapeHtml(line)}</h4>`;
            }
        }
        // Bullet point list item
        else if (line.startsWith('•')) {
            if (currentList !== 'bullet') {
                // Close previous list if different type
                if (currentList) {
                    html += formatList(currentList, listItems);
                    listItems = [];
                }
                currentList = 'bullet';
            }
            listItems.push(line.substring(1).trim());
        }
        // Numbered list item
        else if (line.match(/^\d+\./)) {
            if (currentList !== 'numbered') {
                // Close previous list if different type
                if (currentList) {
                    html += formatList(currentList, listItems);
                    listItems = [];
                }
                currentList = 'numbered';
            }
            listItems.push(line.replace(/^\d+\.\s*/, ''));
        }
        // Regular paragraph
        else {
            // Close any open list
            if (currentList) {
                html += formatList(currentList, listItems);
                currentList = null;
                listItems = [];
            }
            
            // Format inline elements
            let formattedLine = formatInlineElements(line);
            html += `<p class="answer-paragraph">${formattedLine}</p>`;
        }
    }
    
    // Close any remaining open list
    if (currentList) {
        html += formatList(currentList, listItems);
    }
    
    html += '</div>';
    return html;
}

function formatList(type, items) {
    if (items.length === 0) return '';
    
    if (type === 'bullet') {
        let html = '<ul class="answer-list">';
        items.forEach(item => {
            html += `<li class="answer-list-item">${formatInlineElements(item)}</li>`;
        });
        html += '</ul>';
        return html;
    } else if (type === 'numbered') {
        let html = '<ol class="answer-ordered-list">';
        items.forEach(item => {
            html += `<li class="answer-ordered-list-item">${formatInlineElements(item)}</li>`;
        });
        html += '</ol>';
        return html;
    }
    return '';
}

function formatInlineElements(text) {
    // Escape HTML first
    text = escapeHtml(text);
    
    // Format code snippets (text in backticks)
    text = text.replace(/`([^`]+)`/g, '<code class="answer-code-inline">$1</code>');
    
    // Make text after colon bold (like "Method call: this is bold")
    text = text.replace(/^([^:]+):/g, '<strong>$1:</strong>');
    
    return text;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Navigate to previous question
function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuestion();
    }
}

// Navigate to next question
function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        displayQuestion();
    }
}

// Go to specific question
function goToQuestion(index) {
    currentIndex = index;
    displayQuestion();
}

// Render question numbers grid
function renderQuestionNumbers() {
    const grid = document.getElementById('numbersGrid');
    grid.innerHTML = currentQuestions.map((q, i) => {
        const isCompleted = isQuestionCompleted(currentTopic.id, i);
        return `
            <button class="number-btn ${isCompleted ? 'completed' : ''}" 
                    onclick="goToQuestion(${i})" 
                    id="num-${i}">
                ${i + 1}
            </button>
        `;
    }).join('');
}

// Update active question number
function updateActiveNumber() {
    document.querySelectorAll('.number-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentIndex);
    });
}

// Show tab content
function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${tabName}Tab`).classList.add('active');

    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(`${tabName}Pane`).classList.add('active');
}

// Toggle question completion
function toggleComplete() {
    if (!currentTopic) return;

    const key = `${currentTopic.id}-${currentIndex}`;
    
    if (!completedQuestions[currentTopic.id]) {
        completedQuestions[currentTopic.id] = [];
    }

    const index = completedQuestions[currentTopic.id].indexOf(currentIndex);
    if (index > -1) {
        completedQuestions[currentTopic.id].splice(index, 1);
    } else {
        completedQuestions[currentTopic.id].push(currentIndex);
    }

    // Save to localStorage
    localStorage.setItem('smartprep_completed', JSON.stringify(completedQuestions));

    // Update UI
    updateCompleteButton();
    updateActiveNumber();
    renderQuestionNumbers();
    updateProgress();
    updateOverallProgress();
}

// Check if question is completed
function isQuestionCompleted(topicId, questionIndex) {
    return completedQuestions[topicId]?.includes(questionIndex) || false;
}

// Update complete button state
function updateCompleteButton() {
    const btn = document.getElementById('markCompleteBtn');
    const isCompleted = isQuestionCompleted(currentTopic?.id, currentIndex);
    
    btn.textContent = isCompleted ? '✓ Completed' : '✓ Mark as Complete';
    btn.classList.toggle('completed', isCompleted);
}

// Update topic progress
function updateProgress() {
    if (!currentTopic) return;

    const completed = completedQuestions[currentTopic.id]?.length || 0;
    const total = currentQuestions.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${completed} / ${total} completed`;
}

// Update overall progress across all topics
async function updateOverallProgress() {
    let totalCompleted = 0;
    let totalQuestions = 0;

    for (const topic of topics) {
        try {
            const response = await fetch(topic.file);
            const data = await response.json();
            totalQuestions += data.questions.length;
            totalCompleted += completedQuestions[topic.id]?.length || 0;
        } catch (error) {
            // Skip if file doesn't exist
        }
    }

    const percentage = totalQuestions > 0 ? (totalCompleted / totalQuestions) * 100 : 0;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${totalCompleted} / ${totalQuestions} completed`;
}

// Shuffle questions
function shuffleQuestions() {
    if (!currentQuestions.length) return;

    // Fisher-Yates shuffle
    for (let i = currentQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentQuestions[i], currentQuestions[j]] = [currentQuestions[j], currentQuestions[i]];
    }

    currentIndex = 0;
    renderQuestionNumbers();
    displayQuestion();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevQuestion();
    if (e.key === 'ArrowRight') nextQuestion();
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleComplete();
    }
});
