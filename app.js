/* menu mobilne */
(function(){
  const h=document.querySelector('.ham'),p=document.getElementById('panel'); if(!h||!p)return;
  const ustaw=o=>{h.setAttribute('aria-expanded',o);p.classList.toggle('otwarte',o);document.body.style.overflow=o?'hidden':''};
  h.addEventListener('click',()=>ustaw(h.getAttribute('aria-expanded')!=='true'));
  p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>ustaw(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')ustaw(false)});
  matchMedia('(min-width:1061px)').addEventListener('change',e=>{if(e.matches)ustaw(false)});
})();

/* dolny pasek na telefonie: dopiero po przewinieciu za przyciski w hero */
(function(){
  const m=document.querySelector('.mob'),c=document.querySelector('.hero-cta'); if(!m||!c||!('IntersectionObserver' in window))return;
  const k=document.getElementById('kontakt');
  let zaHero=false,wKontakcie=false;
  const odsw=()=>{const w=zaHero&&!wKontakcie;m.classList.toggle('widac',w);m.setAttribute('aria-hidden',!w);m.querySelectorAll('a').forEach(a=>a.tabIndex=w?0:-1)};
  new IntersectionObserver(([e])=>{zaHero=!e.isIntersecting&&e.boundingClientRect.top<0;odsw()}).observe(c);
  if(k)new IntersectionObserver(([e])=>{wKontakcie=e.isIntersecting;odsw()},{threshold:.15}).observe(k);
})();

/* formularz (wizualizacja): przygotowuje wiadomosc e-mail */
(function(){
  const f=document.getElementById('form'),info=document.getElementById('formInfo'); if(!f)return;
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const kto=f.kto.value.trim(),kon=f.kontakt.value.trim(),tr=f.tresc.value.trim();
    if(!kon||!tr){info.textContent='Podaj telefon lub e-mail i krótko opisz zapytanie.';return}
    const body=['Dzień dobry,','',tr,'',[kto,kon].filter(Boolean).join(', ')].join('\n');
    info.textContent='Otwieram program pocztowy z gotową wiadomością...';
    location.href='mailto:firma@tm-bud.pl?subject='+encodeURIComponent('Zapytanie ze strony tm-bud.pl')+'&body='+encodeURIComponent(body);
  });
})();
