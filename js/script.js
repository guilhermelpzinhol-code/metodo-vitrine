function formatTime(d){d=d||new Date();return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0')}
const PB=document.getElementById('progressBar');
const pEls=document.querySelectorAll('[data-parallax]');
let sTick=false;
/* Single consolidated scroll handler */
window.addEventListener('scroll',()=>{if(!sTick){requestAnimationFrame(()=>{
const h=document.documentElement;
if(PB)PB.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%';
const wH=window.innerHeight;
pEls.forEach(el=>{const s=parseFloat(el.dataset.parallax)||.1;const r=el.getBoundingClientRect();const o=(r.top+r.height/2-wH/2)*s;el.style.transform='translateY('+o+'px)'});
sTick=false});sTick=true}},{passive:true});

const rObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');rObs.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -18% 0px'});
document.querySelectorAll('[data-anim]').forEach(el=>rObs.observe(el));

/* Typewriter */
function twRun(el){
  const t=el.dataset.tw;if(!t||el.dataset.twDone)return;el.dataset.twDone='1';
  el.textContent='';el.classList.add('tw-cursor');
  let i=0;const spd=t.length>40?25:35;
  const iv=setInterval(()=>{el.textContent=t.slice(0,i+1);i++;if(i>=t.length){clearInterval(iv);setTimeout(()=>{el.classList.remove('tw-cursor');if(t.includes('30 dias')){el.innerHTML='Veja o que<br>é possível em<br><span class="shine-30"><span class="shine-30-num">30</span> dias</span>'}},500)}},spd);
}
const twObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){twRun(e.target);twObs.unobserve(e.target)}})},{threshold:.3});
document.querySelectorAll('[data-tw]').forEach(el=>twObs.observe(el));


/* WhatsApp notification section — auto-animated iPhone 15 */
const waTimeEl=document.getElementById('waTime');
const waLockTimeEl=document.getElementById('waLockTime');
const waLockDateEl=document.getElementById('waLockDate');
(function(){const d=new Date();const t=formatTime(d);if(waTimeEl)waTimeEl.textContent=t;if(waLockTimeEl)waLockTimeEl.textContent=t;
if(waLockDateEl){const dias=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];const meses=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];waLockDateEl.textContent=dias[d.getDay()]+', '+d.getDate()+' de '+meses[d.getMonth()]}
})()
const waList=document.getElementById('waList');
const waChats=[
{name:'Marcela Duarte',photo:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face&q=70',msg:'Oi, encontrei vocês no Google pesquisando advogado trabalhista. Preciso de uma consulta urgente'},
{name:'Roberto Farias',photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face&q=70',msg:'Boa tarde! Vi no Google que vocês abrem empresa rápido. Quanto custa pra abrir um MEI?'},
{name:'Camila Nunes',photo:'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=60&h=60&fit=crop&crop=face&q=70',msg:'Oi! Achei a clínica de vocês pesquisando dentista perto de mim. Tem horário essa semana?'},
{name:'Fernando Alves',photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&q=70',msg:'Pesquisei reforma residencial e o site de vocês apareceu primeiro. Quero um orçamento'},
{name:'Juliana Mendes',photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face&q=70',msg:'Olá! Vi os apartamentos de vocês no Google. Tem disponibilidade pra visita amanhã?'},
{name:'Thiago Costa',photo:'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=60&h=60&fit=crop&crop=face&q=70',msg:'E aí, vi a academia de vocês no Google. Qual o valor da mensal? Tem aula experimental?'},
{name:'Luciana Reis',photo:'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=60&h=60&fit=crop&crop=face&q=70',msg:'Oi, encontrei vocês pesquisando conserto de iPhone. Meu celular não liga mais, atendem hoje?'},
{name:'Paulo Henrique',photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&q=70',msg:'Boa tarde, achei a escola pelo Google. Minha filha tem 4 anos, como funciona a matrícula?'}
];
let waStarted=false;
function addWaChat(chat){
const row=document.createElement('div');
row.className='wa-chat-row';
row.innerHTML='<img class="wa-avatar" src="'+chat.photo+'" alt="'+chat.name+'" loading="lazy" decoding="async" width="50" height="50"><div class="wa-chat-content"><div class="wa-chat-top"><span class="wa-chat-name">'+chat.name+'</span><span class="wa-chat-time">'+formatTime()+'</span></div><div class="wa-chat-bottom"><span class="wa-chat-preview">'+chat.msg+'</span><span class="wa-chat-badge">1</span></div></div>';
waList.insertBefore(row,waList.firstChild);
}
function runWaSequence(){
if(waStarted)return;waStarted=true;
const waLockEl=document.getElementById('waLock');
/* Show lock screen for 1.5s then auto slide up */
setTimeout(()=>{
if(waLockEl){waLockEl.classList.add('unlocked');setTimeout(()=>{waLockEl.style.display='none'},600)}
/* Start adding chats after lock slides away */
waChats.forEach((chat,i)=>{setTimeout(()=>addWaChat(chat),(i*2500)+400)});
},1500);
}
/* Auto-trigger on viewport */
const waPhoneEl=document.querySelector('.wa-phone');
if(waPhoneEl){
const waObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){runWaSequence();waObs.unobserve(e.target)}})},{threshold:.3});
waObs.observe(waPhoneEl);
}

/* Method feature cards reveal */
(function(){
const cards=document.querySelectorAll('[data-mf]');
if(!cards.length)return;
const prefersReduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
if(prefersReduced){cards.forEach(c=>c.classList.add('mf-visible'));return}
const mfObs=new IntersectionObserver(es=>{es.forEach(e=>{
if(!e.isIntersecting)return;
e.target.style.willChange='transform,opacity';
e.target.classList.add('mf-visible');
setTimeout(()=>{e.target.style.willChange='auto'},600);
mfObs.unobserve(e.target);
})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
cards.forEach((c,i)=>{c.style.transitionDelay=(i*80)+'ms';mfObs.observe(c)});
})();

/* Stacked cards auto-rotate + click */
(function(){
const stack=document.getElementById('rsStack');
const cards=stack?stack.querySelectorAll('.rs-card'):[];
const caps=document.querySelectorAll('.rs-cap');
if(!cards.length)return;
const order=[0,1,2];let cur=0;
function setPositions(){
cards.forEach((c,i)=>{const pos=order.indexOf(i);c.dataset.rsPos=pos});
caps.forEach((c,i)=>c.classList.toggle('rs-cap-active',i===order[0]));
}
function next(){order.push(order.shift());setPositions()}
let timer=setInterval(next,3500);
const stackObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){if(!timer)timer=setInterval(next,3500)}else{clearInterval(timer);timer=null}})},{threshold:.1});
stackObs.observe(stack);
cards.forEach((c,i)=>{c.addEventListener('click',()=>{
if(+c.dataset.rsPos===0)return;
clearInterval(timer);
while(order[0]!==i)order.push(order.shift());
setPositions();timer=setInterval(next,3500);
})});
})();

/* Results count-up + ping */
(function(){
const rcCards=document.querySelectorAll('[data-rc]');
if(!rcCards.length)return;
const prefersReduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function countUp(el,target,suffix,dec,fmt){
if(prefersReduced){el.textContent=(fmt?target.toLocaleString('pt-BR'):dec>0?target.toFixed(dec):target)+suffix;return}
const duration=1200;const start=performance.now();
function tick(now){
const p=Math.min((now-start)/duration,1);
const eased=1-Math.pow(1-p,3);
let val=eased*target;
if(dec>0)val=val.toFixed(dec);
else val=Math.round(val);
if(fmt)val=Number(val).toLocaleString('pt-BR');
el.textContent=val+suffix;
if(p<1)requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
}
const rcObs=new IntersectionObserver(es=>{es.forEach(e=>{
if(!e.isIntersecting)return;
const card=e.target;
const numEl=card.querySelector('.rc-number');
const target=parseFloat(card.dataset.rcVal);
const suffix=card.dataset.rcSuffix||'';
const dec=parseInt(card.dataset.rcDec)||0;
const fmt=card.dataset.rcFmt==='dot';
countUp(numEl,target,suffix,dec,fmt);
card.classList.add('rc-ping');
rcObs.unobserve(card);
})},{threshold:.15});
rcCards.forEach(c=>rcObs.observe(c));
/* Progress bar */
const rhBar=document.getElementById('rhBar');
if(rhBar){
const barObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){rhBar.classList.add('rh-go');barObs.unobserve(e.target)}})},{threshold:.3});
barObs.observe(rhBar.parentElement);
}
})();

/* FAQ */

/* Testimonials — scroll interception (works on all browsers/mobile) */
(function(){
  var sec=document.getElementById('testimonialsSection');
  if(!sec)return;
  var cards=Array.prototype.slice.call(sec.querySelectorAll('.testimonial-card'));
  if(!cards.length)return;
  var TOTAL=cards.length,cur=0,locked=false,lockY=0,busy=false,tY0=0;
  var cooldown=false; /* prevents re-lock during exit scroll */

  function show(i){
    cur=Math.max(0,Math.min(TOTAL-1,i));
    for(var j=0;j<TOTAL;j++){
      cards[j].classList.remove('tc-active','tc-done');
      if(j===cur)cards[j].classList.add('tc-active');
      else if(j<cur)cards[j].classList.add('tc-done');
    }
  }

  function go(dir){
    if(busy)return;
    busy=true;
    setTimeout(function(){busy=false;},600);
    if(dir>0){
      if(cur<TOTAL-1){show(cur+1);}
      else{doRelease('down');}
    } else {
      if(cur>0){show(cur-1);}
      else{doRelease('up');}
    }
  }

  function doLock(){
    if(locked||cooldown)return;
    locked=true;
    lockY=Math.round(sec.getBoundingClientRect().top+window.pageYOffset);
    window.scrollTo(0,lockY); /* snap to exact section top */
    show(0);
    window.addEventListener('touchstart',onTS,{passive:true});
    window.addEventListener('touchmove',onTM,{passive:false});
    window.addEventListener('touchend',onTE,{passive:true});
    window.addEventListener('wheel',onW,{passive:false});
  }

  function doRelease(dir){
    locked=false;
    cooldown=true;
    setTimeout(function(){cooldown=false;},1800); /* block re-lock during exit */
    window.removeEventListener('touchstart',onTS);
    window.removeEventListener('touchmove',onTM);
    window.removeEventListener('touchend',onTE);
    window.removeEventListener('wheel',onW);
    var dest=dir==='down'
      ?lockY+sec.offsetHeight+50
      :Math.max(0,lockY-window.innerHeight);
    /* use instant then smooth to avoid re-trigger edge case */
    window.scrollTo({top:dest,behavior:'smooth'});
  }

  /* Touch handlers */
  function onTS(e){tY0=e.touches[0].clientY;}
  function onTM(e){e.preventDefault();} /* BLOCKS mobile scroll while locked */
  function onTE(e){
    var d=tY0-e.changedTouches[0].clientY;
    if(Math.abs(d)>36)go(d>0?1:-1);
  }

  /* Wheel handler */
  var wt=null;
  function onW(e){
    e.preventDefault();
    clearTimeout(wt);
    var dy=e.deltaY;
    wt=setTimeout(function(){go(dy>0?1:-1);},60);
  }

  /* Scroll watcher */
  var snapping=false;
  window.addEventListener('scroll',function(){
    if(locked){
      /* Snap back if browser managed to move the page */
      if(!snapping&&Math.abs(window.pageYOffset-lockY)>2){
        snapping=true;
        window.scrollTo(0,lockY);
        setTimeout(function(){snapping=false;},200);
      }
      return;
    }
    if(cooldown)return;
    var top=sec.getBoundingClientRect().top;
    if(top<=2&&top>-window.innerHeight){doLock();}
  },{passive:true});

  window.addEventListener('load',function(){
    var top=sec.getBoundingClientRect().top;
    if(top<=2&&top>-window.innerHeight){doLock();}
  });
})();

/* Chat */
const cFab=document.getElementById('chatFab'),cWin=document.getElementById('chatWindow'),cCls=document.getElementById('chatClose'),cBody=document.getElementById('chatBody');
let cOpened=false,cSeqDone=false;
function addTyp(){const t=document.createElement('div');t.className='chat-typing';t.id='cTyp';t.innerHTML='<span></span><span></span><span></span>';cBody.appendChild(t);cBody.scrollTop=cBody.scrollHeight}
function rmTyp(){const t=document.getElementById('cTyp');if(t)t.remove()}
function addM(txt,side){rmTyp();const m=document.createElement('div');m.className='chat-msg chat-msg--'+side;
let tm='<span class="chat-msg-time">'+formatTime();
if(side==='right')tm+=' <span class="chat-msg-check"><svg viewBox="0 0 24 24"><polyline points="1 12 5 16 10 10"/><polyline points="6 12 10 16 20 6"/></svg></span>';
tm+='</span>';m.innerHTML=txt+tm;cBody.appendChild(m);cBody.scrollTop=cBody.scrollHeight}
function addCTA(){rmTyp();const a=document.createElement('a');a.className='chat-cta';a.href='https://wa.me/5571991692700?text=Olá! Quero posicionar minha empresa no topo do Google';a.target='_blank';a.rel='noopener noreferrer';
a.innerHTML='<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.106 1.519 5.834L0 24l6.336-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.855 0-3.63-.507-5.176-1.46l-.371-.22-3.856 1.012 1.03-3.765-.242-.384A9.77 9.77 0 012.182 12c0-5.423 4.395-9.818 9.818-9.818 5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818z"/></svg>Continuar no WhatsApp';
cBody.appendChild(a);cBody.scrollTop=cBody.scrollHeight}
function runSeq(){if(cSeqDone)return;cSeqDone=true;
setTimeout(()=>addTyp(),800);
setTimeout(()=>addM('Olá! Vi que você tem interesse em posicionar sua empresa no topo do Google','left'),3500);
setTimeout(()=>addTyp(),5000);
setTimeout(()=>addM('Que tal agendarmos uma conversa rápida de 10 minutos? Vou te mostrar como sua empresa pode aparecer acima dos concorrentes.','left'),7500);
setTimeout(()=>addM('Vamos, quero saber mais','right'),9500);
setTimeout(()=>addTyp(),11000);
setTimeout(()=>addM('Perfeito! Toca no botão abaixo e vamos conversar agora.','left'),12500);
setTimeout(()=>addCTA(),13500)}
setTimeout(()=>{const b=cFab.querySelector('.chat-fab-badge');if(b)b.classList.add('visible')},5000);
cFab.addEventListener('click',()=>{cWin.classList.add('open');cFab.classList.add('hidden');if(!cOpened){cOpened=true;runSeq()}});
cCls.addEventListener('click',()=>{cWin.classList.remove('open');cFab.classList.remove('hidden')});
document.addEventListener('click',e=>{if(cWin.classList.contains('open')&&!cWin.contains(e.target)&&!cFab.contains(e.target)){cWin.classList.remove('open');cFab.classList.remove('hidden')}});

/* Hero search animation */
const hsEl=document.getElementById('heroSearch');
const hsBar=document.getElementById('hsBar');
const hsText=document.getElementById('hsText');
const hsSp=document.getElementById('hsSponsored');
const hsDim=document.getElementById('hsDimResults');
let hsStarted=false;
const hsQuery='melhor serviço em São Paulo';
function runHeroSearch(){
if(hsStarted)return;hsStarted=true;
hsBar.classList.add('hs-focused');
let i=0;
const cursor=document.createElement('span');cursor.className='hs-cursor';
hsText.appendChild(cursor);
const span=document.createElement('span');
hsText.insertBefore(span,cursor);
const iv=setInterval(()=>{
span.textContent=hsQuery.slice(0,i+1);i++;
if(i>=hsQuery.length){clearInterval(iv);
cursor.remove();
setTimeout(()=>{hsBar.classList.remove('hs-focused');if(hsSp)hsSp.classList.add('hs-show')},400);
setTimeout(()=>{if(hsDim)hsDim.classList.add('hs-show')},1200);
}},55);
}
const hsObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){setTimeout(runHeroSearch,600);hsObs.unobserve(e.target)}})},{threshold:.4});
if(hsEl)hsObs.observe(hsEl);

/* Method bonus — typewriter + video */
const mbSection=document.getElementById('methodBonus');
if(mbSection){
let mbStarted=false;
const mbObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!mbStarted){
mbStarted=true;mbObs.unobserve(e.target);
const title=document.getElementById('mbTitle');
const text='O que faz o Google te escolher...';
let ci=0;title.classList.add('tw-cursor');
const iv=setInterval(()=>{title.textContent=text.slice(0,ci+1);ci++;
if(ci>=text.length){clearInterval(iv);setTimeout(()=>title.classList.remove('tw-cursor'),500);
setTimeout(()=>{
const mbVideoEl=document.getElementById('mbVideo');mbVideoEl.classList.add('mbv-show');
const swipeArrow=mbVideoEl.querySelector('.swipe-arrow');
if(swipeArrow){mbVideoEl.addEventListener('scroll',function hide(){swipeArrow.style.transition='opacity .4s';swipeArrow.style.opacity='0';setTimeout(()=>swipeArrow.style.display='none',420);mbVideoEl.removeEventListener('scroll',hide);},{passive:true,once:true});}
document.getElementById('mbLabel').classList.add('mbl-show');
document.getElementById('mbSub').classList.add('mbl-show');
},600);
}},65);
}})},{threshold:.4});
mbObs.observe(mbSection);
}

/* CTA hover glow */
document.querySelectorAll('.cta-btn').forEach(b=>{let lt=0;b.addEventListener('mousemove',e=>{const n=Date.now();if(n-lt<32)return;lt=n;const r=b.getBoundingClientRect();b.style.boxShadow=(e.clientX-r.left-r.width/2)+'px '+(e.clientY-r.top-r.height/2)+'px 40px rgba(123,60,255,.2)'},{passive:true});b.addEventListener('mouseleave',()=>{b.style.boxShadow=''})});

/* === Funil de Cliques — barras animadas === */
(function(){
const funnel=document.getElementById('gdFunnel');
if(!funnel)return;
const bars=funnel.querySelectorAll('.gd-bar');
const prefersReduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
if(prefersReduced){bars.forEach(b=>{const fill=b.querySelector('.gd-bar-fill');if(fill)fill.style.width=b.dataset.width+'%'});return}
const fObs=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;
bars.forEach(b=>{const fill=b.querySelector('.gd-bar-fill');if(!fill)return;
const w=b.dataset.width||0;const d=parseInt(b.dataset.delay)||0;
setTimeout(()=>{fill.style.width=w+'%'},d)});
fObs.unobserve(e.target)})},{threshold:.2});
fObs.observe(funnel);
})();

/* === Count-up para stats e micro-dados === */
(function(){
const els=document.querySelectorAll('[data-countup]');
if(!els.length)return;
const prefersReduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function countUp(el){
const target=parseFloat(el.dataset.countup);
const suffix=el.dataset.suffix||'';
const dec=parseInt(el.dataset.decimals)||0;
if(prefersReduced){el.textContent=target.toFixed(dec)+suffix;return}
const duration=1200;const start=performance.now();
function tick(now){
const p=Math.min((now-start)/duration,1);
const eased=1-Math.pow(1-p,3);
const val=(eased*target).toFixed(dec);
el.textContent=val+suffix;
if(p<1)requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
}
const cObs=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;
countUp(e.target);cObs.unobserve(e.target)})},{threshold:.3});
els.forEach(el=>cObs.observe(el));
})();

/* GMB panels entrance */
(function(){
var panels=document.querySelectorAll('.gmb-item');
if(!panels.length)return;
var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var d=parseFloat(e.target.dataset.animDelay||0)*220;setTimeout(function(){e.target.classList.add('visible')},d);o.unobserve(e.target)}})},{threshold:.15});
panels.forEach(function(p){o.observe(p)});
})();

/* Sticky scroll results — faux-sticky (works with overflow-x:hidden on body) */
(function(){
var wrap=document.getElementById('rvWrap');
var sticky=document.getElementById('rvSticky');
var steps=document.querySelectorAll('.rv-step');
var dots=document.querySelectorAll('.rv-dot');
if(!wrap||!sticky||!steps.length)return;
var cur=-1;
function show(n){
if(n===cur)return;
steps.forEach(function(s,i){
s.classList.remove('rv-active','rv-exit');
if(i===n)s.classList.add('rv-active');
else if(i<n)s.classList.add('rv-exit');
});
dots.forEach(function(d,i){d.classList.toggle('rv-dot-on',i===n);});
cur=n;
}
show(0);
function onScroll(){
var rect=wrap.getBoundingClientRect();
var scrolled=-rect.top;
var total=wrap.offsetHeight-window.innerHeight;
if(scrolled<=0){
sticky.classList.remove('rv-fixed','rv-end');
show(0);
}else if(scrolled>=total){
sticky.classList.remove('rv-fixed');
sticky.classList.add('rv-end');
show(steps.length-1);
}else{
sticky.classList.add('rv-fixed');
sticky.classList.remove('rv-end');
var idx=Math.min(steps.length-1,Math.floor((scrolled/total)*steps.length));
show(idx);
}
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
})();

/* ── Aurora Vitrine Background — 3 ribbons + stars ─────── */
(function(){
  var cv=document.getElementById('bg-canvas');
  if(!cv)return;
  var cx=cv.getContext('2d');
  var W,H,raf;
  var t=0,lastFrame=0,tick=0;
  var stars=[];
  var gA=null,gB=null,gC=null;
  var N=60;

  function resize(){
    W=cv.width=window.innerWidth;
    H=cv.height=window.innerHeight;
    gA=gB=gC=null;
    buildStars();
  }

  function buildStars(){
    stars=[];
    var n=Math.min(55,Math.floor(W*H/11000));
    for(var i=0;i<n;i++){
      stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+0.2,p:Math.random()*Math.PI*2,s:Math.random()*0.016+0.007});
    }
  }

  function bPt(p0,c1,c2,p3,s){
    var m=1-s;
    return{x:m*m*m*p0.x+3*m*m*s*c1.x+3*m*s*s*c2.x+s*s*s*p3.x,y:m*m*m*p0.y+3*m*m*s*c1.y+3*m*s*s*c2.y+s*s*s*p3.y};
  }

  function bTan(p0,c1,c2,p3,s){
    var m=1-s;
    return{x:3*(m*m*(c1.x-p0.x)+2*m*s*(c2.x-c1.x)+s*s*(p3.x-c2.x)),y:3*(m*m*(c1.y-p0.y)+2*m*s*(c2.y-c1.y)+s*s*(p3.y-c2.y))};
  }

  function buildPts(p0,c1,c2,p3,hw){
    var top=[],bot=[],spine=[];
    for(var i=0;i<=N;i++){
      var s=i/N;
      var pt=bPt(p0,c1,c2,p3,s);
      var tn=bTan(p0,c1,c2,p3,s);
      var len=Math.sqrt(tn.x*tn.x+tn.y*tn.y)||1;
      var nx=-tn.y/len,ny=tn.x/len;
      /* tapered ends + breathe */
      var taper=Math.sin(s*Math.PI);
      var w=hw*(taper*0.38+0.62)*(0.90+Math.sin(t*0.7+s*Math.PI*2)*0.10);
      top.push({x:pt.x+nx*w,y:pt.y+ny*w});
      bot.push({x:pt.x-nx*w,y:pt.y-ny*w});
      spine.push(pt);
    }
    return{top:top,bot:bot,spine:spine};
  }

  function fillShape(pts){
    cx.beginPath();
    cx.moveTo(pts.top[0].x,pts.top[0].y);
    for(var k=1;k<=N;k++) cx.lineTo(pts.top[k].x,pts.top[k].y);
    for(var k=N;k>=0;k--) cx.lineTo(pts.bot[k].x,pts.bot[k].y);
    cx.closePath();
  }

  function strokeLine(arr){
    cx.beginPath();
    cx.moveTo(arr[0].x,arr[0].y);
    for(var k=1;k<arr.length;k++) cx.lineTo(arr[k].x,arr[k].y);
  }

  function makeGrd(pts,stops){
    var i=Math.floor(N/2);
    var g=cx.createLinearGradient(pts.top[i].x,pts.top[i].y,pts.bot[i].x,pts.bot[i].y);
    for(var j=0;j<stops.length;j++) g.addColorStop(stops[j][0],stops[j][1]);
    return g;
  }

  function paintRibbon(pts,grd,aura,edge){
    var pulse=0.85+Math.sin(t*1.3)*0.15;
    /* Wide outer glow */
    cx.save();
    cx.shadowColor='rgba(100,20,220,'+(aura*pulse)+')';
    cx.shadowBlur=70;
    fillShape(pts);
    cx.fillStyle='rgba(60,8,150,'+(aura*pulse*0.20)+')';
    cx.fill();
    cx.restore();
    /* Secondary glow — tighter, brighter */
    cx.save();
    cx.shadowColor='rgba(160,80,255,'+(aura*pulse*0.55)+')';
    cx.shadowBlur=28;
    fillShape(pts);
    cx.fillStyle='rgba(0,0,0,0)';
    cx.fill();
    cx.restore();
    /* Body */
    fillShape(pts);
    cx.fillStyle=grd;
    cx.fill();
    /* Top edge — bright shimmer */
    cx.save();
    cx.shadowColor='rgba(220,190,255,'+(edge*(0.7+Math.sin(t*2.1)*0.3))+')';
    cx.shadowBlur=18;
    cx.strokeStyle='rgba(210,178,255,'+edge+')';
    cx.lineWidth=2.0;
    strokeLine(pts.top);
    cx.stroke();
    /* Bottom edge — subtle */
    cx.shadowColor='rgba(120,60,200,'+(edge*0.35)+')';
    cx.shadowBlur=10;
    cx.strokeStyle='rgba(140,80,220,'+(edge*0.28)+')';
    cx.lineWidth=1.2;
    strokeLine(pts.bot);
    cx.stroke();
    /* Inner highlight — 55% between top and spine */
    var hl=[];
    for(var k=0;k<=N;k++){
      hl.push({x:pts.top[k].x*0.55+pts.spine[k].x*0.45,y:pts.top[k].y*0.55+pts.spine[k].y*0.45});
    }
    cx.shadowColor='rgba(240,218,255,'+(edge*0.55)+')';
    cx.shadowBlur=20;
    cx.strokeStyle='rgba(228,205,255,'+(edge*0.38)+')';
    cx.lineWidth=2.8;
    strokeLine(hl);
    cx.stroke();
    cx.restore();
  }

  function draw(now){
    raf=requestAnimationFrame(draw);
    if(now-lastFrame<34)return;
    lastFrame=now;
    tick++;

    cx.clearRect(0,0,W,H);
    cx.fillStyle='#000';
    cx.fillRect(0,0,W,H);

    /* Stars — pulsing micro-dots */
    for(var i=0;i<stars.length;i++){
      var st=stars[i];
      var al=(Math.sin(t*st.s*70+st.p)*0.28+0.36)*0.80;
      cx.beginPath();
      cx.arc(st.x,st.y,st.r,0,Math.PI*2);
      cx.fillStyle='rgba(200,175,255,'+al+')';
      cx.fill();
    }

    /* ── Ribbon A — main: bottom-left → top-right ── */
    var f1=Math.sin(t*0.42)*95+Math.cos(t*0.21)*38+Math.sin(t*0.09)*14;
    var f2=Math.cos(t*0.34)*78+Math.sin(t*0.17)*30+Math.cos(t*0.07)*10;
    var br=Math.sin(t*0.25)*38+Math.cos(t*0.13)*16;
    var aP0={x:W*-0.05,y:H*0.90+br};
    var aC1={x:W*0.22+f1,y:H*0.26+f2};
    var aC2={x:W*0.76-f2,y:H*0.74-f1};
    var aP3={x:W*1.05,y:H*0.06+br*0.4};
    var hwA=Math.min(W,H)*0.118*(0.88+Math.sin(t*0.55)*0.12);
    var pA=buildPts(aP0,aC1,aC2,aP3,hwA);
    if(!gA||tick%60===0){
      gA=makeGrd(pA,[
        [0,   'rgba(210,155,255,0.52)'],
        [0.08,'rgba(148,60,242,0.60)'],
        [0.28,'rgba(88,14,196,0.72)'],
        [0.50,'rgba(48,6,140,0.78)'],
        [0.72,'rgba(76,18,188,0.72)'],
        [0.92,'rgba(110,40,210,0.60)'],
        [1,   'rgba(175,108,255,0.42)']
      ]);
    }
    paintRibbon(pA,gA,0.62,0.38);

    /* ── Ribbon B — crossing: top-left → bottom-right ── */
    var g1=Math.cos(t*0.37)*72+Math.sin(t*0.20)*28+Math.cos(t*0.08)*10;
    var g2=Math.sin(t*0.30)*56+Math.cos(t*0.14)*22+Math.sin(t*0.06)*8;
    var bP0={x:W*-0.08,y:H*0.18+g1};
    var bC1={x:W*0.34+g2,y:H*0.64+g1*0.55};
    var bC2={x:W*0.66-g1*0.45,y:H*0.36-g2*0.35};
    var bP3={x:W*1.06,y:H*0.80+g2*0.3};
    var hwB=Math.min(W,H)*0.062*(0.90+Math.sin(t*0.68)*0.10);
    var pB=buildPts(bP0,bC1,bC2,bP3,hwB);
    if(!gB||tick%60===30){
      gB=makeGrd(pB,[
        [0,   'rgba(172,128,248,0.34)'],
        [0.25,'rgba(90,22,192,0.44)'],
        [0.50,'rgba(56,8,144,0.50)'],
        [0.75,'rgba(84,20,182,0.44)'],
        [1,   'rgba(150,88,238,0.28)']
      ]);
    }
    paintRibbon(pB,gB,0.30,0.18);

    /* ── Ribbon C — thin fast: bottom-right → top-left ── */
    var h1=Math.sin(t*0.50)*58+Math.cos(t*0.24)*22+Math.sin(t*0.10)*8;
    var h2=Math.cos(t*0.43)*46+Math.sin(t*0.19)*18+Math.cos(t*0.08)*6;
    var cP0={x:W*1.08,y:H*0.84+h1};
    var cC1={x:W*0.66-h2,y:H*0.22+h1*0.42};
    var cC2={x:W*0.30+h1*0.32,y:H*0.76-h2*0.38};
    var cP3={x:W*-0.06,y:H*0.14+h2*0.28};
    var hwC=Math.min(W,H)*0.040*(0.88+Math.sin(t*0.82)*0.12);
    var pC=buildPts(cP0,cC1,cC2,cP3,hwC);
    if(!gC||tick%60===15){
      gC=makeGrd(pC,[
        [0,   'rgba(215,170,255,0.28)'],
        [0.35,'rgba(112,38,218,0.36)'],
        [0.65,'rgba(88,20,188,0.38)'],
        [1,   'rgba(178,120,255,0.22)']
      ]);
    }
    paintRibbon(pC,gC,0.20,0.12);

    t+=0.013;
  }

  document.addEventListener('visibilitychange',function(){
    if(document.hidden)cancelAnimationFrame(raf);
    else{lastFrame=0;raf=requestAnimationFrame(draw);}
  });

  resize();
  window.addEventListener('resize',resize,false);
  raf=requestAnimationFrame(draw);
})();
/* ─────────────────────────────────────────────────────── */

// VSL player overlay
(function(){
var overlay=document.getElementById('vslOverlay');

var iframe=document.getElementById('vslIframe');
// Substitua a URL abaixo pelo seu embed de vídeo (YouTube/Vimeo/etc.)
var VIDEO_URL='';
if(!overlay)return;
overlay.addEventListener('click',function(){
if(VIDEO_URL){iframe.src=VIDEO_URL+'&autoplay=1';}
overlay.classList.add('hidden');
});
})();

// CSS Animated 3D Wave is now handling the background natively
