(function(){
  const carousel=document.querySelector('[data-carousel]');
  if(!carousel) return;
  const viewport=carousel.querySelector('.portfolio-viewport');
  const track=carousel.querySelector('.portfolio-track');
  const originals=[...track.children];
  originals.forEach(item=>track.appendChild(item.cloneNode(true)));
  let offset=0;
  let paused=false;
  let last=performance.now();
  const speed=24;
  function loopWidth(){ return track.scrollWidth/2; }
  function render(){ track.style.transform='translate3d(-'+offset+'px,0,0)'; }
  function frame(now){
    const delta=Math.min(50,now-last); last=now;
    if(!paused){
      offset += speed*delta/1000;
      const limit=loopWidth();
      if(limit && offset>=limit) offset-=limit;
      render();
    }
    requestAnimationFrame(frame);
  }
  function nudge(direction){
    offset=Math.max(0,offset+direction*(viewport.clientWidth/3));
    const limit=loopWidth(); if(limit) offset%=limit;
    render();
  }
  carousel.querySelector('.next').addEventListener('click',()=>nudge(1));
  carousel.querySelector('.prev').addEventListener('click',()=>nudge(-1));
  carousel.addEventListener('mouseenter',()=>paused=true);
  carousel.addEventListener('mouseleave',()=>{paused=false;last=performance.now();});
  window.addEventListener('resize',render);
  requestAnimationFrame(frame);
})();
