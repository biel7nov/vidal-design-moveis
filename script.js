/**
 * VIDAL DESIGN & MÓVEIS — interações
 */
const WHATSAPP = '5521964232146';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Top nav aparece após sair do hero
  const topnav = document.getElementById('topnav');
  const hero = document.getElementById('inicio');
  const onScroll = () => {
    topnav.classList.toggle('visible', window.scrollY > hero.offsetHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Menu mobile
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('topnavLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('open');
  }));

  // Animação de entrada
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Filtros da galeria
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.g-item');
  const applyFilter = (value) => {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === value));
    items.forEach(it => it.classList.toggle('hidden', value !== 'all' && it.dataset.category !== value));
  };
  buttons.forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  // Cards de ambientes filtram a galeria
  document.querySelectorAll('[data-filter-link]').forEach(card => {
    card.addEventListener('click', () => applyFilter(card.dataset.filterLink));
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const close = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-full]').forEach(el => {
    el.addEventListener('click', () => {
      lbImg.src = el.dataset.full;
      lbCap.textContent = el.dataset.cap || '';
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  document.getElementById('lbClose').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Máscara de telefone
  const phone = document.getElementById('whatsapp');
  phone.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0) v = v.replace(/^(\d{0,2})/, '($1');
    e.target.value = v;
  });

  // Formulário → WhatsApp
  document.getElementById('quoteForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const tel = phone.value.trim();
    const room = document.getElementById('roomType').value;
    const details = document.getElementById('details').value.trim();

    let msg = `Olá, Vidal Design & Móveis! Vim pelo site.\n\n`;
    msg += `*Nome:* ${name}\n*WhatsApp:* ${tel}\n*Ambiente:* ${room}\n`;
    if (details) msg += `*Detalhes:* ${details}\n`;
    msg += `\nGostaria de um orçamento.`;

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  });
});
