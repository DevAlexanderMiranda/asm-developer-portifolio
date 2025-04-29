// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    // Immediately hide the preloader after a brief delay
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Ativar animações após o preloader
            document.querySelectorAll('.reveal-text').forEach(el => {
                el.classList.add('revealed');
            });
        }, 300);
    }, 300);
});

// Cursor personalizado
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Efeito de hover nos links e botões
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
            cursorFollower.style.borderWidth = '1px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderWidth = '2px';
        });
    });
});

// Navbar scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Ativação do menu de navegação
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function activateNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === 'studying' && link.getAttribute('href') === '#certificates')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);
window.addEventListener('load', activateNavLink);

// Animação de entrada dos elementos
const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    
    elementsToAnimate.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Formulário de contato com Web3Forms
document.addEventListener('DOMContentLoaded', function() {
const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const closePopup = document.getElementById('closePopup');

if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
        
            // Mudar texto do botão para indicar que está enviando
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Resetar formulário
        contactForm.reset();
                    
                    // Mostrar notificação de sucesso
                    successPopup.classList.add('active');
                    
                    // Fechar notificação automaticamente após 2 segundos (a barra já tem animação de 2s)
                    setTimeout(() => {
                        successPopup.classList.remove('active');
                    }, 2000);
                } else {
                    alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            })
            .finally(() => {
                // Restaurar botão
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Atualizar ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeToggles = document.querySelectorAll('.theme-toggle');
const themeIcons = document.querySelectorAll('.theme-toggle i');

// Verificar tema salvo
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

// Alternar tema
themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
});

function updateThemeIcons(theme) {
    themeIcons.forEach(icon => {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

