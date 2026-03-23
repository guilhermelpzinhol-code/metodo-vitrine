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

/* Sticky scroll testimonials */
const tcSection=document.getElementById('testimonialsSection');
const tcCards=tcSection?tcSection.querySelectorAll('.testimonial-card'):[];
if(tcCards.length){
function updateTC(){
const rect=tcSection.getBoundingClientRect();
const sH=tcSection.offsetHeight;
const wH=window.innerHeight;
const scrolled=-rect.top;
const progress=Math.max(0,Math.min(1,scrolled/(sH-wH)));
const total=tcCards.length;
const idx=Math.min(Math.floor(progress*total),total-1);
tcCards.forEach((c,i)=>{c.classList.remove('tc-active','tc-done');if(i===idx)c.classList.add('tc-active');else if(i<idx)c.classList.add('tc-done')});
}
let tcScrollActive=false;
const tcVisObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!tcScrollActive){window.addEventListener('scroll',updateTC,{passive:true});tcScrollActive=true;updateTC()}else if(!e.isIntersecting&&tcScrollActive){window.removeEventListener('scroll',updateTC);tcScrollActive=false}})},{threshold:0,rootMargin:'200px 0px 200px 0px'});
if(tcSection)tcVisObs.observe(tcSection);}

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
const text='E o Melhor...';
let ci=0;title.classList.add('tw-cursor');
const iv=setInterval(()=>{title.textContent=text.slice(0,ci+1);ci++;
if(ci>=text.length){clearInterval(iv);setTimeout(()=>title.classList.remove('tw-cursor'),500);
setTimeout(()=>{
document.getElementById('mbVideo').classList.add('mbv-show');
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

/* Scroll-reveal results */
(function(){
var items=document.querySelectorAll('[data-rv]');
if(!items.length)return;
var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rv-visible');o.unobserve(e.target)}})},{threshold:0.05,rootMargin:'0px 0px -60px 0px'});
items.forEach(function(el){o.observe(el)});
})();

/* Animated wave background */
(function(){
var cv=document.getElementById('bg-canvas');
if(!cv||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var cx=cv.getContext('2d');
function rsz(){cv.width=window.innerWidth;cv.height=window.innerHeight;}
rsz();window.addEventListener('resize',rsz);
var wv=[
{fy:.12,amp:22,fr:.006,sp:.00045,ph:0,   al:.07},
{fy:.25,amp:17,fr:.009,sp:.00062,ph:2.1, al:.06},
{fy:.38,amp:24,fr:.005,sp:.00038,ph:4.2, al:.08},
{fy:.52,amp:19,fr:.008,sp:.00055,ph:1.0, al:.07},
{fy:.65,amp:15,fr:.01, sp:.00070,ph:3.3, al:.06},
{fy:.78,amp:20,fr:.007,sp:.00048,ph:5.1, al:.07},
{fy:.90,amp:16,fr:.009,sp:.00058,ph:2.7, al:.05},
];
function draw(){
cx.clearRect(0,0,cv.width,cv.height);
var now=Date.now();
wv.forEach(function(l){
cx.beginPath();
cx.strokeStyle='rgba(167,139,250,'+l.al+')';
cx.lineWidth=1;
cx.shadowColor='rgba(139,92,246,0.1)';
cx.shadowBlur=2;
for(var x=0;x<=cv.width;x+=3){
var y=l.fy*cv.height+Math.sin(x*l.fr+now*l.sp+l.ph)*l.amp;
if(x===0)cx.moveTo(x,y);else cx.lineTo(x,y);
}
cx.stroke();
});
requestAnimationFrame(draw);
}
draw();
})();

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
