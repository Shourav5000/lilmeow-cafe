(function(){
if(typeof emailjs !== 'undefined') {
emailjs.init({ publicKey: '5MW4lMv5kQQFbX-BW' });
}
})();
const cur=document.getElementById('cursor');
const curT=document.getElementById('cursor-trail');
document.addEventListener('mousemove',e=>{
cur.style.left=e.clientX+'px'; cur.style.top=e.clientY+'px';
setTimeout(()=>{curT.style.left=e.clientX+'px';curT.style.top=e.clientY+'px';},80);
});
document.addEventListener('mousedown',()=>cur.classList.add('clicked'));
document.addEventListener('mouseup',()=>cur.classList.remove('clicked'));
document.querySelectorAll('a,button,.pillar,.cat-card,.exp-card,.mi,.ts,.pc,.fq,.gallery-item,.today-cat,.soc,.sbox,.pill').forEach(el=>{
el.addEventListener('mouseenter',()=>cur.classList.add('hovered'));
el.addEventListener('mouseleave',()=>cur.classList.remove('hovered'));
});
const canvas=document.getElementById('pawCanvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
const paws=[];
function drawPaw(x,y,size,opacity,color){
ctx.save();ctx.globalAlpha=opacity;ctx.fillStyle=color;
ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();
[[-.7,-.9,.4],[.7,-.9,.4],[-.5,-.5,.35],[.5,-.5,.35]].forEach(([tx,ty,tr])=>{
ctx.beginPath();ctx.arc(x+tx*size,y+ty*size,tr*size,0,Math.PI*2);ctx.fill();
});
ctx.restore();
}
(function animPaws(){
ctx.clearRect(0,0,canvas.width,canvas.height);
paws.forEach((p,i)=>{p.y-=p.speed;p.opacity-=0.003;if(p.opacity<=0)paws.splice(i,1);drawPaw(p.x,p.y,p.size,p.opacity,p.color);});
requestAnimationFrame(animPaws);
})();
document.addEventListener('mousemove',e=>{
if(Math.random()<0.06){
const c=['#FF8FAB','#FFD6E0','#C9B8FF','#B5EAD7'][Math.floor(Math.random()*4)];
paws.push({x:e.clientX,y:e.clientY,size:8+Math.random()*10,speed:.6+Math.random(),opacity:.5+Math.random()*.3,color:c});
}
});
const heroEmojis=['🐾','🌸','⭐','✨','💕','🐱','😸'];
setInterval(()=>{
const el=document.createElement('div');
el.className='float-emoji';
el.textContent=heroEmojis[Math.floor(Math.random()*heroEmojis.length)];
el.style.cssText=`left:${Math.random()*100}%;bottom:0;font-size:${1+Math.random()*1.5}rem;animation-duration:${6+Math.random()*8}s;animation-delay:0s`;
const hero=document.querySelector('.hero');
if(hero){hero.appendChild(el);setTimeout(()=>el.remove(),14000);}
},1200);
const catEmojis=['🐱','😺','😸','😻','🐾'];let ci=0;
setInterval(()=>{const h=document.getElementById('heroCat');if(h)h.textContent=catEmojis[ci=(ci+1)%catEmojis.length];},3000);
window.addEventListener('scroll',()=>{
document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
document.getElementById('btt').classList.toggle('show',window.scrollY>400);
highlightToday();
});
window.toggleMobile=function(){
document.getElementById('mobileMenu').classList.toggle('open');
};
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function highlightToday(){
const today=days[new Date().getDay()];
document.querySelectorAll('.hlist li').forEach(li=>{
li.classList.remove('today-highlight');
const d=li.querySelector('.hday');
if(d&&d.textContent===today) li.classList.add('today-highlight');
});
}
highlightToday();
let purrDone=false;
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
if(e.isIntersecting){e.target.classList.add('in');if(!purrDone)animatePurrBars();}
}),{threshold:.1});
document.querySelectorAll('.rv,.rv-left,.rv-right').forEach(el=>obs.observe(el));
function animatePurrBars(){
purrDone=true;
document.querySelectorAll('.purr-fill').forEach(bar=>{
setTimeout(()=>bar.style.width=bar.dataset.width+'%',300);
});
}
let toastTimer;
window.showToast=function(msg){
clearTimeout(toastTimer);
document.getElementById('toastMsg').textContent=msg;
const t=document.getElementById('toast');
t.classList.add('show');
toastTimer=setTimeout(()=>t.classList.remove('show'),4500);
};
window.closeToast=function(){document.getElementById('toast').classList.remove('show');};
window.openCat=function(name,emoji,desc){
document.getElementById('lbEmoji').textContent=emoji;
document.getElementById('lbName').textContent=name;
document.getElementById('lbDesc').textContent=desc;
document.getElementById('lightbox').classList.add('open');
};
window.openGallery=function(emoji,name,desc){
document.getElementById('lbEmoji').textContent=emoji;
document.getElementById('lbName').textContent=name;
document.getElementById('lbDesc').textContent=desc;
document.getElementById('lightbox').classList.add('open');
};
window.closeLb=function(e){
if(!e||e.target===document.getElementById('lightbox')||e.currentTarget.classList.contains('lb-close'))
document.getElementById('lightbox').classList.remove('open');
};
const catReactions=['😻','😹','🙀','😾','😸','🐱','😺'];let ri=0;
window.catReact=function(el){
el.textContent=catReactions[ri%catReactions.length];ri++;
window.showToast('🐾 Click again for another reaction!');
};
window.switchTab=function(btn,id){
document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('on'));
document.querySelectorAll('.mpanel').forEach(p=>p.classList.remove('on'));
btn.classList.add('on');
document.getElementById('tab-'+id).classList.add('on');
};
window.faqToggle=function(el){
const item=el.parentElement;
const open=item.classList.contains('open');
document.querySelectorAll('.fq').forEach(f=>f.classList.remove('open'));
if(!open) item.classList.add('open');
};
let selT='',selPkg='',selPrice=0,curStep=1;
const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);
const dateEl=document.getElementById('rDate');
if(dateEl) dateEl.min=tomorrow.toISOString().split('T')[0];
const progWidths=['33%','66%','100%'];
window.go=function(n){
if(n>curStep){
if(curStep===1){
if(!document.getElementById('rDate').value){window.showToast('🗓️ Please pick a date first!');document.getElementById('rDate').focus();return;}
if(!document.getElementById('rGuests').value){window.showToast('👥 How many guests are coming?');document.getElementById('rGuests').focus();return;}
if(!selT){window.showToast('⏰ Pick a time slot to continue!');return;}
window.showToast('😻 Great choices! Now pick your package...');
}
if(curStep===2&&!selPkg){window.showToast('🎟️ Choose a package to continue!');return;}
if(curStep===2&&selPkg){window.showToast('🐾 Almost there! Just your details...');}
if(curStep===3){
if(!document.getElementById('rFirst').value){window.showToast('💕 Please enter your first name!');document.getElementById('rFirst').focus();return;}
if(!document.getElementById('rLast').value){window.showToast('💕 Please enter your last name!');document.getElementById('rLast').focus();return;}
if(!document.getElementById('rEmail').value.includes('@')){window.showToast('📧 Please enter a valid email!');document.getElementById('rEmail').focus();return;}
if(!document.getElementById('rPhone').value){window.showToast('📞 Please enter your phone!');document.getElementById('rPhone').focus();return;}
}
if(n===3) fillSum();
}
// Animate out current panel
var currentPanel=document.getElementById('s'+curStep);
if(currentPanel){
currentPanel.style.opacity='0';
currentPanel.style.transform='translateX(-30px)';
currentPanel.style.transition='opacity 0.25s ease, transform 0.25s ease';
}
setTimeout(function(){
document.querySelectorAll('.spanel').forEach(p=>{p.classList.remove('on');p.style.opacity='';p.style.transform='';p.style.transition='';});
document.querySelectorAll('.sp').forEach(s=>s.classList.remove('on'));
document.getElementById('s'+n).classList.add('on');
document.getElementById('sp'+n).classList.add('on');
for(var i=1;i<n;i++) document.getElementById('sp'+i).classList.add('done');
document.getElementById('resProg').style.width=progWidths[n-1];
curStep=n;
// Animate in new panel
var newPanel=document.getElementById('s'+n);
if(newPanel){
newPanel.style.opacity='0';
newPanel.style.transform='translateX(30px)';
newPanel.style.transition='opacity 0.3s ease, transform 0.3s ease';
setTimeout(function(){
newPanel.style.opacity='1';
newPanel.style.transform='translateX(0)';
},20);
}
// Scroll to top of booking card
var card=document.getElementById('resCard');
if(card){
var top=card.getBoundingClientRect().top+window.pageYOffset-100;
window.scrollTo({top:top,behavior:'smooth'});
}
},250);
};
window.pickT=function(el){
document.querySelectorAll('.ts').forEach(s=>s.classList.remove('on'));
el.classList.add('on');selT=el.dataset.t;
};
window.pickP=function(el,n,p){
document.querySelectorAll('.pc').forEach(c=>c.classList.remove('on'));
el.classList.add('on');selPkg=n;selPrice=p;
};
function fillSum(){
const dt=document.getElementById('rDate').value;
const g=parseInt(document.getElementById('rGuests').value)||1;
const addonCost = addonSelected ? 15 * g : 0;
const total = (selPrice * g) + addonCost;
const fmt=dt?new Date(dt+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}):'—';
document.getElementById('sd').textContent=fmt;
document.getElementById('st').textContent=selT;
document.getElementById('sg').textContent=g+' guest'+(g>1?'s':'');
document.getElementById('spkg').textContent=selPkg + (addonSelected ? ' + 📸 Purr Extra Special' : '');
document.getElementById('sa').textContent='$'+total+'.00';
}
window.fmtC=function(el){let v=el.value.replace(/\D/g,'').substring(0,16);el.value=v.replace(/(.{4})/g,'$1 ').trim();};
window.fmtE=function(el){let v=el.value.replace(/\D/g,'');if(v.length>=2)v=v.substring(0,2)+' / '+v.substring(2,4);el.value=v;};
window.validateField=function(el){el.classList.toggle('valid',el.value.length>0);el.classList.toggle('invalid',el.value.length===0);};
window.validateEmail=function(el){const ok=el.value.includes('@')&&el.value.includes('.');el.classList.toggle('valid',ok);el.classList.toggle('invalid',!ok&&el.value.length>0);};
window.pay=function(){
if(!document.getElementById('rFirst').value||!document.getElementById('rLast').value){window.showToast('💕 Please fill in your name!');return;}
if(!document.getElementById('rEmail').value.includes('@')){window.showToast('📧 Please enter a valid email!');return;}
if(!document.getElementById('rPhone').value){window.showToast('📞 Please enter your phone number!');return;}
const btn=document.getElementById('payBtn');
btn.innerHTML='⏳ Confirming...';btn.disabled=true;
const ref='LMC-'+Math.floor(100000+Math.random()*900000);
const guests=document.getElementById('rGuests').value||'1';
const total=(selPrice*parseInt(guests))+(addonSelected?15*parseInt(guests):0);
const addon=addonSelected?'Yes — Cat Treats + Polaroid Photo (+$15/person)':'No';
const templateParams = {
to_name: document.getElementById('rFirst').value+' '+document.getElementById('rLast').value,
to_email: document.getElementById('rEmail').value,
booking_ref: ref,
date: document.getElementById('sd').textContent,
time: selT,
guests: guests+' guest'+(parseInt(guests)>1?'s':''),
package: selPkg,
total: '$'+total+'.00 (pay on arrival)',
addon: addon,
phone: document.getElementById('rPhone').value,
};
function showSuccess(){
document.getElementById('resCard').style.display='none';
document.getElementById('bCode').textContent=ref;
document.getElementById('succBox').classList.add('show');
launchConfetti();
window.showToast('✉️ Confirmation sent to '+document.getElementById('rEmail').value+'!');
}
emailjs.send('service_rlsav7s','template_z8fdc9g', templateParams)
.then(()=>showSuccess())
.catch(()=>showSuccess());
};
function launchConfetti(){
const container=document.getElementById('confettiBox');
const emojis=['🎉','🐾','🌸','😻','☕','✨','💕','🎊'];
const style=document.createElement('style');
style.textContent='@keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}';
document.head.appendChild(style);
for(let i=0;i<40;i++){
const el=document.createElement('div');
el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
el.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-50px;font-size:${1.2+Math.random()*1.5}rem;pointer-events:none;z-index:9997;animation:confettiFall ${2+Math.random()*3}s ease-in ${Math.random()*2}s forwards`;
container.appendChild(el);
}
setTimeout(()=>container.innerHTML='',7000);
}
window.subscribe=function(){
const e=document.getElementById('nlEmail').value;
if(!e||!e.includes('@')){window.showToast('📧 Please enter a valid email!');return;}
emailjs.send('service_rlsav7s','template_z8fdc9g',{
to_email: e,
to_name: e.split('@')[0],
}).catch(()=>{});
document.getElementById('nlForm').style.display='none';
document.getElementById('nlSuccess').classList.add('show');
window.showToast('🌸 Welcome to the Meow Club, '+e+'! 💕');
};
let addonSelected = false;
window.toggleAddon = function(el) {
addonSelected = !addonSelected;
const check = document.getElementById('addonCheck');
if (addonSelected) {
el.style.background = 'linear-gradient(135deg,#FFF3B0,#FFE55C)';
el.style.borderColor = '#FFB300';
check.textContent = '✓';
check.style.background = 'var(--yellow)';
check.style.color = 'var(--brown)';
showToast('📸 Purr Extra Special added! +$15/person');
} else {
el.style.background = 'linear-gradient(135deg,#FFFBE6,#FFF8DC)';
el.style.borderColor = 'var(--yellow)';
check.textContent = '•';
check.style.background = 'white';
}
};
const reviews = [
{ name:'Sarah M.', rating:5, date:'2 weeks ago', text:'Absolutely the most magical place! Mochi sat on my lap the entire time and I never wanted to leave. The matcha latte was incredible too. 10/10 will be back every week!', avatar:'😻' },
{ name:'James K.', rating:5, date:'1 month ago', text:'Brought my daughter for her birthday and she was in heaven. Lulu knocked her croissant off the table and then looked completely innocent 😂 The staff were so warm and welcoming.', avatar:'🐱' },
{ name:'Priya L.', rating:5, date:'3 weeks ago', text:'The Purr Extra Special add-on is SO worth it. Getting to hand-feed the cats treats and take home a Polaroid was the cutest thing ever. Nishi is my new best friend.', avatar:'😸' },
{ name:'Tom R.', rating:5, date:'1 week ago', text:'Came in as a walk-in on a Friday and they found us a spot right away. Boba is massive and fluffy and the gentlest soul. The Brown Sugar Chai is a must-order.', avatar:'😺' },
{ name:'Mei C.', rating:5, date:'2 months ago', text:'Luna poses like she knows she is a model — because she absolutely does. Stunning cat in a stunning café. The Purr Package is perfect, exactly the right amount of time.', avatar:'🐾' },
{ name:'Alex D.', rating:4, date:'3 weeks ago', text:'Great vibes, great coffee, great cats. Pumpkin had the zoomies the whole time and it was the most entertaining thing I have ever witnessed. Will definitely be back!', avatar:'😻' },
];
function renderReviews(){
const grid=document.getElementById('reviewsGrid');
if(!grid) return;
grid.innerHTML = reviews.map((r,i) => `
<div class="rv" style="background:white;border-radius:24px;padding:1.6rem;border:2.5px solid var(--pink-light);box-shadow:var(--sh);transition:all .3s;position:relative;overflow:hidden;transition-delay:${i*0.08}s"
onmouseover="this.style.borderColor='var(--pink)';this.style.transform='translateY(-5px)';this.style.boxShadow='var(--sh-lg)'"
onmouseout="this.style.borderColor='var(--pink-light)';this.style.transform='translateY(0)';this.style.boxShadow='var(--sh)'">
<div style="position:absolute;top:-10px;right:-10px;font-size:4rem;opacity:.06">${r.avatar}</div>
<div style="display:flex;align-items:center;gap:10px;margin-bottom:.9rem">
<div style="width:44px;height:44px;background:linear-gradient(135deg,var(--pink-soft),var(--yellow-light));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;border:2px solid var(--pink-light);flex-shrink:0">${r.avatar}</div>
<div>
<div style="font-weight:800;font-size:.92rem;color:var(--brown)">${r.name}</div>
<div style="font-size:.72rem;color:var(--brown-l);font-weight:600">${r.date} · Google Review</div>
</div>
<div style="margin-left:auto;color:#FFB300;font-size:1rem;letter-spacing:1px">${'⭐'.repeat(r.rating)}</div>
</div>
<p style="font-size:.87rem;color:var(--brown-m);font-weight:600;line-height:1.7;font-style:italic">"${r.text}"</p>
</div>
`).join('');
grid.querySelectorAll('.rv').forEach(el=>obs.observe(el));
}
renderReviews();
window.jumpBook=function(){document.getElementById('reserve').scrollIntoView({behavior:'smooth'});};



window.cookieAccept=function(){
  localStorage.setItem('lmc_cookie','accepted');
  document.getElementById('cookieBanner').style.transform='translateY(100%)';
};
window.cookieDecline=function(){
  localStorage.setItem('lmc_cookie','declined');
  document.getElementById('cookieBanner').style.transform='translateY(100%)';
};
(function(){
  setTimeout(function(){
    if(!localStorage.getItem('lmc_cookie')){
      var b=document.getElementById('cookieBanner');
      if(b) b.style.transform='translateY(0)';
    }
  },2500);
})();