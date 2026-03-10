
window.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded');

    // плавная прокрутка колесом (вместо резкой стандартной прокрутки)
    // отключает пассивное колесо, чтобы можно было анимировать прокрутку
    let targetScroll = window.scrollY;
    let isAnimatingScroll = false;

    function animateScroll() {
        const current = window.scrollY;
        const delta = targetScroll - current;
        const step = delta * 1; // коэффициент сглаживания (увеличено для более быстрой прокрутки)

        if (Math.abs(delta) < 0.5) {
            isAnimatingScroll = false;
            return;
        }

        window.scrollTo(0, current + step);
        requestAnimationFrame(animateScroll);
    }

    window.addEventListener('wheel', event => {
        event.preventDefault();

        targetScroll += event.deltaY;
        targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));

        if (!isAnimatingScroll) {
            isAnimatingScroll = true;
            requestAnimationFrame(animateScroll);
        }
    }, { passive: false });





    // кнопка для возврата на главную страницу
    const homeButtons = document.querySelectorAll('.home-button');
    homeButtons.forEach(button => {
        button.addEventListener('click', event => {
            window.location.href = 'index.html';
        });
    });

  
    // присваивание функции к нажатию любой кнопки установки
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault(); 
            const href = button.closest('a')?.href;
            showInstallAlert(href);
        });
    });
});


// сама функция при нажатии на кнопку установки 
function showInstallAlert(downloadLink) {
    const overlay = document.createElement('div'); // создание основнго окна
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 1000;

    const dialog = document.createElement('div'); // создание диалогового окна
    dialog.style.backgroundColor = '#fff';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '5px';
    dialog.style.textAlign = 'center';
    dialog.style.minWidth = '500px';
    dialog.style.height = '150px';

    const message = document.createElement('p'); // вывод основго сообщения 
    message.textContent = 'Нажмите на кнопку "Установить", чтобы начать загрузку';
 
    const installBtn = document.createElement('button'); // кнопка установки
    installBtn.textContent = 'Установить';
    installBtn.style.fontSize = '30px';
    installBtn.addEventListener('click', () => {
        overlay.remove();
        if (downloadLink) {
            window.location.href = downloadLink;
        }
    });

    const cancelBtn = document.createElement('button'); // кнопка отмепны 
    cancelBtn.textContent = 'Отмена';
    cancelBtn.style.marginLeft = '10px';
    cancelBtn.style.fontSize = '30px';
    cancelBtn.addEventListener('click', () => overlay.remove());

    dialog.appendChild(message);
    dialog.appendChild(installBtn);
    dialog.appendChild(cancelBtn);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
}
