(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const img=(s,w,h)=>`https://picsum.photos/seed/${s}/${w}/${h}`;
const posts=[
 {id:1,t:"5 Ways to Cut International Shipping Costs",c:"Money Saving",tg:["Savings","Freight","Tips"],d:"Oct 28, 2026",a:"Michelle B.",e:"Smart consolidation and routing tips that save money on every shipment."},
 {id:2,t:"Air vs Sea Freight: Which Is Right?",c:"Freight",tg:["Air Cargo","Sea Cargo","Freight"],d:"Oct 15, 2026",a:"Daniel R.",e:"A simple guide to choosing the best mode for your cargo."},
 {id:3,t:"Packing Guide for Fragile Goods",c:"Courier",tg:["Packing","Courier","Tips"],d:"Oct 02, 2026",a:"Aisha K.",e:"Keep your products safe from door to door with these packing basics."},
 {id:4,t:"Customs Duty Exemptions for Returning Residents",c:"Customs",tg:["Customs","Savings","Import"],d:"Sep 21, 2026",a:"Michelle B.",e:"Learn who qualifies for duty-free imports and how to claim it."},
 {id:5,t:"How to Plan Shipping for Your Big Event",c:"Logistics",tg:["Events","Logistics","Planning"],d:"Sep 09, 2026",a:"Daniel R.",e:"Make sure everything arrives on time so you can enjoy the celebration."},
 {id:6,t:"Tracking Your Parcel Like a Pro",c:"Courier",tg:["Tracking","Courier","Tips"],d:"Aug 30, 2026",a:"Aisha K.",e:"Understand each tracking status and what to do when a parcel is delayed."},
 {id:7,t:"E-commerce Fulfilment Made Simple",c:"Logistics",tg:["E-commerce","Warehousing","Logistics"],d:"Aug 14, 2026",a:"Daniel R.",e:"From warehousing to last-mile delivery, here is how to scale smoothly."},
 {id:8,t:"Choosing the Right Customs Clearance Partner",c:"Customs",tg:["Customs","Import","Freight"],d:"Jul 26, 2026",a:"Michelle B.",e:"What to look for in a broker so you never overpay duties."}];
const comments=[["Aarav M.",1,"Great tips, saved us a lot last month!"],["Sara W.",4,"Very helpful explanation of exemptions."],["Rohit S.",2,"Sea freight worked best for our bulk order."],["Emily C.",6,"Tracking guide cleared up my confusion."]];
const cnt=k=>posts.reduce((o,p)=>{(k==='c'?[p.c]:p.tg).forEach(x=>o[x]=(o[x]||0)+1);return o},{});
const P=new URLSearchParams(location.search),page=document.body.dataset.page;
/* Sidebar */
const cats=cnt('c'),tags=cnt('t'),curCat=P.get('cat'),curTag=P.get('tag');
$('#sidebar').innerHTML=`
<div class="w"><h3>Search</h3><form class="sform" id="sform"><input id="q" type="search" placeholder="Search articles..." value="${(P.get('q')||'').replace(/"/g,'')}"><button aria-label="Search">🔍</button></form></div>
<div class="w"><h3>Recent Posts</h3>${posts.slice(0,4).map(p=>`<a class="rp" href="blog-detail.html?id=${p.id}"><img src="${img('blog'+p.id,140,120)}" alt=""><div><h4>${p.t}</h4><small>${p.d}</small></div></a>`).join('')}</div>
<div class="w"><h3>Recent Comments</h3>${comments.map(c=>`<div class="rc"><b>${c[0]}</b> on <a href="blog-detail.html?id=${c[1]}">${posts[c[1]-1].t}</a><br><small>“${c[2]}”</small></div>`).join('')}</div>
<div class="w cats"><h3>Categories</h3>${Object.keys(cats).map(k=>`<a class="${k===curCat?'on':''}" href="blog.html?cat=${encodeURIComponent(k)}">${k}<span>${cats[k]}</span></a>`).join('')}</div>
<div class="w"><h3>Tags</h3><div class="tags">${Object.keys(tags).map(k=>`<a class="${k===curTag?'on':''}" href="blog.html?tag=${encodeURIComponent(k)}">${k}</a>`).join('')}</div></div>`;
$('#sform').onsubmit=e=>{e.preventDefault();const v=$('#q').value.trim();if(page==='list')filter(v);else location.href='blog.html?q='+encodeURIComponent(v)};
/* List page */
const card=(p,i)=>`<article class="post reveal" data-s="${(p.t+p.e+p.c+p.tg.join(' ')).toLowerCase()}" style="transition-delay:${(i%3)*.1}s"><div class="im"><span class="cat">${p.c}</span><img loading="lazy" src="${img('blog'+p.id,600,380)}" alt="${p.t}"></div><div class="bd"><p class="meta"><small>📅 ${p.d}</small><small>✍️ ${p.a}</small></p><h3>${p.t}</h3><p>${p.e}</p><a href="blog-detail.html?id=${p.id}" class="more">Read More →</a></div></article>`;
function filter(q){q=(q||'').toLowerCase();let n=0;
 $$('.post').forEach((el,i)=>{const p=posts[i],ok=(!q||el.dataset.s.includes(q))&&(!curCat||p.c===curCat)&&(!curTag||p.tg.includes(curTag));el.classList.toggle('hide',!ok);if(ok)n++});
 $('#empty').hidden=n>0;const label=curCat?'category “'+curCat+'”':curTag?'tag “'+curTag+'”':q?'“'+q+'”':'';
 $('#found').innerHTML=label?`${n} result(s) for ${label} — <a href="blog.html">Clear</a>`:''}
if(page==='list'){$('#postGrid').innerHTML=posts.map(card).join('');$('#q').addEventListener('input',e=>filter(e.target.value));filter(P.get('q'))}
/* Detail page */
if(page==='detail'){
 const id=Math.min(Math.max(+P.get('id')||1,1),posts.length),p=posts[id-1],pr=posts[id-2],nx=posts[id];
 document.title=p.t+' | MJI Xpress Global';
 $('#crumbT').textContent=p.t.length>28?p.t.slice(0,28)+'…':p.t;$('#hCat').textContent=p.c;$('#hTitle').textContent=p.t;
 $('#hMeta').innerHTML=`<span>📅 ${p.d}</span><span>✍️ ${p.a}</span><span>💬 ${comments.filter(c=>c[1]===id).length} Comments</span>`;
 $('#art').innerHTML=`<img src="${img('blog'+p.id,1000,560)}" alt="${p.t}">
 <p><b>${p.e}</b></p>
 <p>Whether you ship personal parcels or run a growing business, understanding the basics of logistics can save you time, money and stress. In this article our team walks through what really matters.</p>
 <h2>Why It Matters</h2><p>Small decisions about packaging, routing and paperwork add up quickly. Getting them right from the start prevents delays, extra fees and damaged goods.</p>
 <ul><li>Plan ahead and compare shipping options</li><li>Keep documents accurate and complete</li><li>Track every shipment from pickup to delivery</li><li>Ask an expert before you ship</li></ul>
 <blockquote>“Honest, intelligent effort is always rewarded.”</blockquote>
 <h2>Our Expert Advice</h2><p>Work with a partner who explains your options clearly. Our team is available 24/7 to review your shipment and recommend the most cost-effective route.</p>
 <div class="foot-a"><div class="tags">${p.tg.map(t=>`<a href="blog.html?tag=${encodeURIComponent(t)}">${t}</a>`).join('')}</div><div class="share"><b>Share:</b><button data-s="f" aria-label="Facebook">f</button><button data-s="x" aria-label="X">X</button><button data-s="l" aria-label="LinkedIn">in</button><button data-s="c" aria-label="Copy link">🔗</button></div></div>
 <div class="author"><img src="${img('author'+p.id,160,160)}" alt="${p.a}"><div><h3>${p.a}</h3><p>Logistics specialist at MJI Xpress Global, helping customers ship smarter for over a decade.</p></div></div>
 <div class="pn">${pr?`<a href="blog-detail.html?id=${pr.id}"><small>← Previous</small>${pr.t}</a>`:'<span></span>'}${nx?`<a href="blog-detail.html?id=${nx.id}"><small>Next →</small>${nx.t}</a>`:''}</div>`;
 $$('.share button').forEach(b=>b.onclick=()=>{const u=encodeURIComponent(location.href),s=b.dataset.s;
  if(s==='c'){navigator.clipboard&&navigator.clipboard.writeText(location.href);b.textContent='✓';setTimeout(()=>b.textContent='🔗',1500)}
  else open({f:'https://www.facebook.com/sharer/sharer.php?u=',x:'https://twitter.com/intent/tweet?url=',l:'https://www.linkedin.com/sharing/share-offsite/?url='}[s]+u,'_blank','noopener')});
}
$('#yr').textContent=new Date().getFullYear();
/* Nav */
const burger=$('#burger'),menu=$('#menu');
const closeMenu=()=>{menu.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded',false)};
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
$$('a',menu).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>e.key==='Escape'&&closeMenu());
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 $('#progress').style.width=(y/h*100)+'%';$('#nav').classList.toggle('stuck',y>20);$('#totop').classList.toggle('show',y>600)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#totop').onclick=()=>scrollTo({top:0});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('.reveal').forEach(el=>io.observe(el));
$$('.w').forEach((w,i)=>{w.classList.add('reveal');w.style.transitionDelay=i*.08+'s';io.observe(w)});
if(page==='detail'){const a=$('#art');a.classList.add('reveal');io.observe(a)}
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');s.className='ripple';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
})();
