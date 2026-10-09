const phone='5521975978589';
const messageLink=message=>'https://wa.me/'+phone+'?text='+encodeURIComponent(message);
const base='Olá! Vim pelo site da Mestre dos Reparos e gostaria de pedir um orçamento.';
document.querySelectorAll('[data-contact], [data-service]').forEach(link=>{
 const service=link.dataset.service;
 link.href=messageLink(base+(service?' Preciso de: '+service+'.':'')+' Meu bairro é: ');
 link.target='_blank';link.rel='noopener noreferrer';
 link.addEventListener('click',()=>track(link.dataset.contact||'servico',service||'geral'));
});
function track(position,service){
 window.dataLayer=window.dataLayer||[];
 window.dataLayer.push({event:'whatsapp_click',cta_position:position,service_type:service});
}
document.getElementById('quote').addEventListener('submit',event=>{
 event.preventDefault();
 const service=document.getElementById('service').value;
 const bairro=document.getElementById('bairro').value.trim();
 if(!bairro){document.getElementById('bairro').focus();return;}
 track('formulario',service);
 window.open(messageLink(base+' Preciso de: '+service+'. Meu bairro é '+bairro+'. Vou enviar fotos do serviço.'),'_blank','noopener,noreferrer');
});

// Reveal content once, with a short cascade within grids.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
 const targets=document.querySelectorAll('.section-heading, .service, .steps article, .portfolio figure, .area-grid>div, .faq>div, .final-grid>div, .final-grid form');
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  });
 },{threshold:0.08,rootMargin:'0px 0px 15px 0px'});
 targets.forEach(target=>{
  const siblings=[...target.parentElement.children];
  const stagger=target.matches('.service, .steps article, .portfolio figure')?siblings.indexOf(target)%3:0;
  target.style.setProperty('--reveal-delay',stagger*65+'ms');
  target.classList.add('reveal');observer.observe(target);
 });
}
