// script.js
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Страница1_merged.pdf';
    link.download = 'Резюме_Алексей_Петров.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showProjectDetails(projectId) {
    const projects = {
        1: {
            title: "Портфолио сайт",
            description: "Современный адаптивный сайт-портфолио с использованием HTML5, CSS3 и JavaScript. Реализована полная доступность (A11y), семантическая разметка, прогрессивное улучшение. Сайт оптимизирован для всех устройств и проходит все проверки Lighthouse.",
            code: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Портфолио</title>
    <style>
        /* CSS код проекта */
        :root {
            --primary: #6366f1;
            --gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
        }
        
        .hero {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 4rem;
            align-items: center;
        }
    </style>
</head>
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    
    <script>
        // JavaScript функциональность
        function initAnimations() {
            // Анимации при скролле
        }
    </script>
</body>
</html>`
        },
        2: {
            title: "Todo приложение",
            description: "Интерактивное приложение для управления задачами с использованием Local Storage для сохранения данных. Реализованы функции добавления, редактирования, удаления и фильтрации задач. Чистая архитектура и модульный код.",
            code: `class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }
    
    addTask(text) {
        const task = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        this.tasks.push(task);
        this.save();
        this.render();
    }
    
    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        );
        this.save();
        this.render();
    }
    
    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}`
        },
        3: {
            title: "Интернет-магазин",
            description: "Прототип интернет-магазина на React с корзиной покупок, фильтрацией товаров и динамической подгрузкой данных. Использованы современные хуки, контекст для управления состоянием и оптимизированная работа с API.",
            code: `import React, { useState, useEffect, createContext } from 'react';

const CartContext = createContext();

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(setProducts);
    }, []);
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
        <div className="product-grid">
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}`
        }
    };

    const project = projects[projectId];
    if (project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalCode').textContent = project.code;
        document.getElementById('projectModal').style.display = 'block';
        openTab('description');
    }
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Плавная прокрутка
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Валидация формы
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
            input.style.boxShadow = 'none';
        }
    });
    
    if (isValid) {
        alert('Сообщение успешно отправлено!');
        e.target.reset();
    } else {
        alert('Пожалуйста, заполните все обязательные поля');
    }
});

// Анимация прогресс-баров
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skill = entry.target;
            const progressBar = skill.querySelector('.skill__progress div');
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 300);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill').forEach(skill => {
    observer.observe(skill);
});

// Закрытие модалки по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Закрытие модалки по клику вне контента
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});
