document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.courses-grid');
  if (!grid) return;

  const filterBtns = document.querySelectorAll('.filter-btn');
  let coursesData = [];

  // Загружаем данные из JSON
  fetch('data/courses.json')
    .then(res => res.json())
    .then(data => {
      coursesData = data;
      renderCourses(data);
    })
    .catch(err => console.error('Ошибка загрузки курсов:', err));

  function renderCourses(courses) {
    grid.innerHTML = '';
    courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'card course-card';
      card.dataset.category = course.category;

      const tagClass = `course-card__tag--${course.category}`;
      const tagText = {
        beginner: 'Начальный',
        intermediate: 'Средний',
        advanced: 'Продвинутый'
      }[course.category];

      card.innerHTML = `
        <div class="card__img">
          <img src="${course.image}" alt="${course.title}">
        </div>
        <div class="card__body">
          <span class="course-card__tag ${tagClass}">${tagText}</span>
          <h3 class="card__title">${course.title}</h3>
          <p class="card__text">${course.description}</p>
          <div class="course-card__meta">
            <span>🕐 ${course.duration}</span>
            <span>📊 ${course.level}</span>
          </div>
          <div class="card__footer">
            <span class="card__price">${course.price.toLocaleString('ru-RU')} ₽</span>
            <a href="course-detail.html?id=${course.id}" class="btn btn--primary btn--sm">Подробнее</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // Фильтрация
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;
      if (category === 'all') {
        renderCourses(coursesData);
      } else {
        const filtered = coursesData.filter(c => c.category === category);
        renderCourses(filtered);
      }
    });
  });
});