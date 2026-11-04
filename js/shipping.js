(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const B='https://mjitransportbahamas.com/wp-content/uploads/2023/09/';
const items=[
 {t:"International Shipping Tracking: Secure and Timely Deliveries",img:"International-Shipping-Tracking-1.webp",
  p:["With our International Shipping Tracking system, you get real-time visibility and monitoring of your shipments. Whether you are importing or exporting, you can follow your cargo every step of the way.","Advanced tracking technology ensures secure and timely deliveries, no matter the destination."],
  pills:["Real-time visibility","Import & Export","Secure delivery"]},
 {t:"Logistics Shipping Management: Seamlessly Managing Your Supply Chain",img:"Supply-Chain.webp",
  p:["Efficient logistics shipping management is crucial for your business. Our experienced team optimizes your supply chain, streamlines processes and reduces operational costs.","From warehousing and inventory management to transportation and distribution, we provide end-to-end solutions tailored to your needs."],
  pills:["Warehousing","Inventory","Transportation","Distribution"]},
 {t:"Shipping & Logistics Company: Comprehensive Shipping Solutions",img:"Shipping-Logistics.webp",
  p:["As a homegrown shipping and logistics company, we understand the unique challenges and opportunities of the local market.","We offer comprehensive shipping services including cargo handling, customs clearance and documentation assistance, so you can focus on your core business."],
  pills:["Cargo handling","Customs clearance","Documentation"]},
 {t:"Logistics and Shipping Industry: A Growing Sector",img:"A-Growing-Sector.webp",
  p:["The logistics and shipping industry plays a vital role in the economy. With a strategic location and well-developed infrastructure, the region is a key hub for international trade and maritime activity.","We are proud to be part of this thriving industry, contributing to its growth and success."],
  pills:["International trade","Maritime activity","Strong infrastructure"]},
 {t:"Why Choose Us for Shipping Logistics Services?",img:"Shipping-Logistics-1-1.webp",
  why:[["Unparalleled Expertise and Experience","Years in the sector, with in-depth knowledge of industry trends and best practices."],["Commitment to Customer Satisfaction","Lasting relationships built on reliability, honesty and openness."],["Customized Solutions for Your Business","Tailor-made solutions aligned with your goals and budget."]]}];
$('#rows').innerHTML=items.map((s,i)=>`<div class="srow reveal" id="${i?'s'+(i+1):'s1'}"><div class="simg"><div class="frame"></div><span class="num">0${i+1}</span><img loading="lazy" src="${B+s.img}" data-fb="https://picsum.photos/seed/ship${i}/700/520" alt="${s.t}"></div><div class="stxt"><span class="tag">Solution 0${i+1}</span><h3>${s.t}</h3>${s.p?s.p.map(x=>`<p>${x}</p>`).join('')+`<div class="pills">${s.pills.map(x=>`<span>${x}</span>`).join('')}</div>`:`<div class="why">${s.why.map(w=>`<div><b>${w[0]}</b>${w[1]}</div>`).join('')}</div>`}<a href="#contact" class="btn"><span>Get a Quote</span></a></div></div>`).join('');
$$('#rows img').forEach(im=>im.onerror=()=>{im.onerror=null;im.src=im.dataset.fb});
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
