(function(){
  const carousel=document.querySelector('[data-carousel]');
  if(!carousel) return;
  const viewport=carousel.querySelector('.portfolio-viewport');
  const track=carousel.querySelector('.portfolio-track');
  const items=[...track.children];
  let index=0;
  let paused=false;
  function visible(){ return viewport.clientWidth < 700 ? 1 : viewport.clientWidth < 1000 ? 2 : 3; }
  function step(){ return viewport.clientWidth / visible(); }
  function render(instant){
    track.style.transition=instant?'none':'';
    track.style.transform='translateX(-'+(index*step())+'px)';
    if(instant) requestAnimationFrame(()=>track.style.transition='');
  }
  function advance(){
    const max=Math.max(0,items.length-visible());
    if(index>=max){ index=0; render(true); requestAnimationFrame(()=>{index=1; render(false);}); }
    else { index+=1; render(false); }
  }
  function back(){ index=index<=0?Math.max(0,items.length-visible()):index-1; render(false); }
  carousel.querySelector('.next').addEventListener('click',advance);
  carousel.querySelector('.prev').addEventListener('click',back);
  carousel.addEventListener('mouseenter',()=>paused=true);
  carousel.addEventListener('mouseleave',()=>paused=false);
  setInterval(()=>{if(!paused) advance();},3200);
  window.addEventListener('resize',()=>render(true));
})();
