

document.addEventListener('DOMContentLoaded', function () {

   
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu    = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('aberto');
            menuToggle.setAttribute(
                'aria-expanded',
                navMenu.classList.contains('aberto') ? 'true' : 'false'
            );
        });

       
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('aberto');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

       
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('aberto');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

   
    const elementosFade = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observador = new IntersectionObserver(
            function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('visivel');
                        observador.unobserve(entrada.target); // anima só uma vez
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        elementosFade.forEach(function (el) {
            observador.observe(el);
        });
    } else {
       
        elementosFade.forEach(function (el) {
            el.classList.add('visivel');
        });
    }

    
    const secoes   = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function destacarNavLink() {
        var scrollY = window.pageYOffset;

        secoes.forEach(function (secao) {
            var topo    = secao.offsetTop - 100;
            var altura  = secao.offsetHeight;
            var id      = secao.getAttribute('id');

            if (scrollY >= topo && scrollY < topo + altura) {
                navLinks.forEach(function (link) {
                    link.style.color = '';
                    link.style.backgroundColor = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--azul)';
                        link.style.backgroundColor = 'var(--azul-claro)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', destacarNavLink, { passive: true });
    destacarNavLink(); 

});
