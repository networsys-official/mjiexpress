(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const f=[
 ["✈️","Air Freight","Time-critical cargo delivered across the globe on the fastest routes.",["Express & priority options","Airport-to-door service","Dangerous & perishable goods"]],
 ["🚢","Sea Freight","Cost-effective ocean shipping for full containers and shared loads.",["FCL & LCL shipments","All major ports","Container tracking"]],
 ["🚚","Road Freight","Reliable trucking and local distribution with a modern fleet.",["Full & part loads","Scheduled routes","GPS-tracked vehicles"]],
 ["🛃","Customs Clearance","Smooth import and export paperwork handled by certified specialists.",["Duty & tax guidance","Document preparation","Exemption advice"]],
 ["🏭","Warehousing & Distribution","Secure storage, inventory control and fast order dispatch.",["Short & long-term storage","Pick, pack & ship","Real-time stock reports"]],
 ["🏠","Door-to-Door Delivery","One partner from pickup to final delivery, with nothing left to chance.",["Pickup at your location","Insurance available","24/7 customer support"]]];
$('#fgrid').innerHTML=f.map((s,i)=>`<article class="fc reveal" style="transition-delay:${(i%3)*.12}s"><div class="fc__im"><img loading="lazy" src="https://picsum.photos/seed/freight${i+1}/640/400" alt="${s[1]}"><span class="fc__n">0${i+1}</span><span class="fc__ico" style="animation-delay:${-i*.4}s">${s[0]}</span></div><div class="fc__b"><h3>${s[1]}</h3><p>${s[2]}</p><ul>${s[3].map(x=>`<li>${x}</li>`).join('')}</ul><a href="#contact" class="btn btn--sm"><span>Get a Quote</span></a></div></article>`).join('');
$('#yr').textContent=new Date().getFullYear();
const burger=$('#burger'),menu=$('#menu');
const closeMenu=()=>{menu.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded',false)};
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
$$('a',menu).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>e.key==='Escape'&&closeMenu());
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 $('#progress').style.width=(y/h*100)+'%';$('#nav').classList.toggle('stuck',y>20);$('#totop').classList.toggle('show',y>600)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#totop').onclick=()=>scrollTo({top:0});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
$$('[data-count]').forEach(el=>{const t=+el.dataset.count,s=performance.now();(function f(n){const p=Math.min((n-s)/2000,1);el.textContent=Math.floor(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s)});
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');s.className='ripple';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
$('#contactForm').onsubmit=e=>{e.preventDefault();const f=e.target,n=$('#formNote');let ok=true;
 $$('[required]',f).forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('err',bad);if(bad)ok=false});
 n.style.color=ok?'green':'#d33';n.textContent=ok?'Thank you! We will contact you shortly.':'Please fill all required fields correctly.';if(ok)f.reset()};
})();
