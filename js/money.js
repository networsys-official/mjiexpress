(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
/* ===== ADD YOUR VIDEOS HERE =====
   yt: YouTube video ID (e.g. "dQw4w9WgXcQ")  OR  mp4: path/URL to an MP4 file */
const part1=[
 {t:"Returning Residents: No Customs Duty!",d:"Yayyyy! Learn how returning residents can import without paying custom duties.",yt:"",mp4:"",img:"mv1"},
 {t:"Having an Event in the Bahamas?",d:"Shipping and logistics made simple and easy for your big day.",yt:"",mp4:"",img:"mv2"},
 {t:"Raising Children Is Expensive",d:"One way we can help your family save some money on essential imports.",yt:"",mp4:"",img:"mv3"}];
const part2=[
 {t:"Celebrate Your Event, Not the Stress",d:"Smooth, simple logistics so your purchases arrive ready for the party.",yt:"",mp4:"",img:"mv4"},
 {t:"Impact Your Bottom Line",d:"Stay in the black. Learn which duty exemptions your business qualifies for.",yt:"",mp4:"",img:"mv5"},
 {t:"Don't Pay More Duties Than You Should",d:"Here's how to make sure you only pay what is truly required.",yt:"",mp4:"",img:"mv6"}];
const card=(v,i,k)=>`<button class="vid reveal" style="transition-delay:${i*.12}s" data-k="${k}" data-i="${i}"><div class="vid__th"><img loading="lazy" src="https://picsum.photos/seed/${v.img}/640/400" alt="${v.t}"><span class="vid__n">Client Video ${i+1}</span><span class="play">▶</span></div><div class="vid__bd"><h3>${v.t}</h3><p>${v.d}</p><b>Watch now →</b></div></button>`;
$('#vids1').innerHTML=part1.map((v,i)=>card(v,i,1)).join('');
$('#vids2').innerHTML=part2.map((v,i)=>card(v,i,2)).join('');
$('#yr').textContent=new Date().getFullYear();
/* Modal */
const modal=$('#modal'),body=$('#modalBody');
const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden',true);setTimeout(()=>body.innerHTML='',400)};
document.addEventListener('click',e=>{
 const c=e.target.closest('.vid');
 if(c){const v=(c.dataset.k==1?part1:part2)[c.dataset.i];
  body.innerHTML=v.yt?`<iframe src="https://www.youtube.com/embed/${v.yt}?autoplay=1&rel=0" allow="autoplay;encrypted-media;fullscreen" allowfullscreen title="${v.t}"></iframe>`:v.mp4?`<video src="${v.mp4}" controls autoplay playsinline></video>`:`<p><b>${v.t}</b><br><br>Video coming soon.<br>Add a YouTube ID or MP4 path in <code>js/money.js</code>.</p>`;
  modal.classList.add('open');modal.setAttribute('aria-hidden',false)}
 if(e.target===modal)close();
});
$('#modalX').onclick=close;
/* Nav */
const burger=$('#burger'),menu=$('#menu');
const closeMenu=()=>{menu.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded',false)};
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
$$('a',menu).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();close()}});
/* Scroll */
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 $('#progress').style.width=(y/h*100)+'%';$('#nav').classList.toggle('stuck',y>20);$('#totop').classList.toggle('show',y>600)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#totop').onclick=()=>scrollTo({top:0});
/* Reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
$$('[data-count]').forEach(el=>{const t=+el.dataset.count,s=performance.now();(function f(n){const p=Math.min((n-s)/2000,1);el.textContent=Math.floor(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s)});
/* Ripple */
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');s.className='ripple';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
/* Form (demo) */
$('#contactForm').onsubmit=e=>{e.preventDefault();const f=e.target,n=$('#formNote');let ok=true;
 $$('[required]',f).forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('err',bad);if(bad)ok=false});
 n.style.color=ok?'green':'#d33';n.textContent=ok?'Thank you! We will contact you shortly.':'Please fill all required fields correctly.';if(ok)f.reset()};
})();
