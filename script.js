
const nav=document.getElementById('nav');
const st=document.getElementById('stbtn');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('sc',scrollY>60);
  st.classList.toggle('show',scrollY>400);
},{passive:true});

// Hero image parallax
const hb=document.getElementById('heroBg');
setTimeout(()=>hb.classList.add('go'),80);
window.addEventListener('scroll',()=>{hb.style.transform=`scale(1.04) translateY(${scrollY*.12}px)`},{passive:true});

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>io.observe(el));

// Mobile menu
function toggleMob(){
  const m=document.getElementById('mobMenu'),h=document.getElementById('ham'),o=m.classList.toggle('open');
  document.body.style.overflow=o?'hidden':'';
  h.children[0].style.transform=o?'translateY(6.5px) rotate(45deg)':'';
  h.children[1].style.opacity=o?'0':'1';
  h.children[2].style.transform=o?'translateY(-6.5px) rotate(-45deg)':'';
}
function closeMob(){
  document.getElementById('mobMenu').classList.remove('open');
  document.body.style.overflow='';
  [...document.getElementById('ham').children].forEach(s=>{s.style.transform='';s.style.opacity='1'});
}

// Lightbox
function openLb(src,alt){
  const lb=document.getElementById('lb'),img=document.getElementById('lbImg');
  img.src=src;img.alt=alt||'';
  lb.classList.add('open');document.body.style.overflow='hidden';
}
document.getElementById('lbx').onclick=()=>{document.getElementById('lb').classList.remove('open');document.body.style.overflow=''};
document.getElementById('lb').onclick=function(e){if(e.target===this){this.classList.remove('open');document.body.style.overflow=''}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('lb').classList.remove('open');document.body.style.overflow=''}});
