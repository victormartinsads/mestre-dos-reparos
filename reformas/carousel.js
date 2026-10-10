(function(){
  const carousel=document.querySelector('[data-carousel]');
  if(!carousel) return;
  const viewport=carousel.querySelector('.portfolio-viewport');
  const track=carousel.querySelector('.portfolio-track');
  const items=[...track.children];
  let index=0;
  function step(){ return viewport.clientWidth < 700 ? viewport.clientWidth : viewport.clientWidth/3; }
  function render(){ track.style.transform='translateX(-'+(index*step())+'px)'; }
  carousel.querySelector('.next').addEventListener('click',()=>{ index=Math.min(index+1,Math.max(0,items.length-(viewport.clientWidth<700?1:3))); render(); });
  carousel.querySelector('.prev').addEventListener('click',()=>{ index=Math.max(0,index-1); render(); });
  window.addEventListener('resize',render);
})();
