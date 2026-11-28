/* Topform inner pages: /services (list, like the reference) and /services/<slug> (one service). Generated from home-9 shared code. */
(async()=>{
const DEF=window.DEFAULTS;let SV={};try{const r=await fetch("/api/content",{cache:"no-store"});if(r.ok)SV=await r.json()}catch(e){}
const C=(o=>{const dm=t=>(DEF.services.find(x=>String(x.title).trim().toLowerCase()===String(t).trim().toLowerCase())||{});(o.services||[]).forEach(s=>{["more","head","blurb"].forEach(k=>{if(s[k]===undefined&&dm(s.title)[k])s[k]=dm(s.title)[k]})});return o})({...DEF,...SV,text:{...DEF.text,...(SV.text||{})},blocks:{...DEF.blocks,...(SV.blocks||{})},spage:{...DEF.spage,...(SV.spage||{})}});
const slug=t=>String(t||"").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
const esc=t=>String(t??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])),X=k=>esc(C.text[k]),tel=k=>"tel:"+String(C.text[k]||"").replace(/[^\d+]/g,""),
isV=u=>/\.(mp4|webm)(\?|$)/i.test(u||"");
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const HOME="/home-9",S=C.services,N=S.length,SP=C.spage,yr=new Date().getFullYear(),wa="https://wa.me/"+String(C.text.whatsapp).replace(/\D/g,"");
$("#hl").src=C.logo;const ic=document.querySelector('link[rel=icon]');if(C.icon)ic.href=C.icon;
$("#wa").href=wa;$("#fb").href=wa;$("#fb").textContent=C.text.contact_btn;$("#fat").textContent=C.text.quote_btn;

const svcMenu=`<div class="dd"><a href="/services" id="svb" aria-haspopup="true" aria-expanded="false">Services</a><div class="mm"><div class="mmi"><ul style="--r:${Math.ceil(S.length/2)}">${S.map(s=>`<li><a href="/services/${slug(s.title)}"><span class="th"><img class="${s.inv?"inv":""}" src="${esc(s.img)}" alt=""></span><span>${esc(s.title)}</span></a></li>`).join("")}</ul><a class="mall" href="/services">View all services<i>→</i></a></div></div></div>`;
// nav (Services shows a two-column dropdown; the others go to the matching part of the home page)
$("#nv").innerHTML=`<a href="${HOME}#top">Home</a>${svcMenu}<a href="${HOME}#about">About</a><a href="${HOME}#why">Why us</a><a href="${HOME}#branches">Branches</a><a href="#contact">${X("get_in_touch")}</a>`;
$(".logo").href=HOME;
// header + menu
const hd=$("#hd"),nv=$("#nv"),bg=$("#bg");
const onS=()=>hd.classList.toggle("sc",scrollY>40);addEventListener("scroll",onS,{passive:true});onS();
bg.onclick=()=>{const o=nv.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
nv.addEventListener("click",e=>{const a=e.target.closest("a");if(a&&!(a.id==="svb"&&matchMedia("(max-width:1060px)").matches)){nv.classList.remove("open");bg.setAttribute("aria-expanded","false")}});

// ---------- shared builders ----------
const media=(u,s)=>u?(isV(u)?`<video src="${esc(u)}" autoplay muted loop playsinline></video>`:`<img src="${esc(u)}" alt="${esc(s&&s.title||"")}" loading="lazy">`):`<img class="ico ${s&&s.inv?"inv":""}" src="${esc(s&&s.img||"/img/shield.png")}" alt="">`;
const pageImg=s=>s.pimg||s.bg||"";
const md=t=>{const E=x=>esc(x).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");let h="",ul=0;String(t||"").split(/\r?\n/).forEach(l=>{l=l.trim();if(!l)return;if(l.startsWith("- ")){if(!ul){h+="<ul>";ul=1}h+="<li>"+E(l.slice(2))+"</li>";return}if(ul){h+="</ul>";ul=0}h+=l.startsWith("## ")?"<h3>"+E(l.slice(3))+"</h3>":"<p>"+E(l)+"</p>"});if(ul)h+="</ul>";return h};
const banner=(title,crumbs)=>`<section class="sv-ban"><div class="wrap"><h1 class="rv">${esc(title)}</h1></div><div class="orb2" aria-hidden="true">${isV(SP.banner_img)?`<video src="${esc(SP.banner_img)}" autoplay muted loop playsinline></video>`:`<img src="${esc(SP.banner_img||"/img/shield.png")}" alt="">`}</div></section><nav class="sv-crumb" aria-label="Breadcrumb">${crumbs.map((c,i)=>i<crumbs.length-1?`<a href="${c[1]}">${esc(c[0])}</a><span>/</span>`:`<b>${esc(c[0])}</b>`).join("")}</nav>`;
const formHtml=(subject)=>`<form class="fm" id="fm"><label>Name*<input name="Name" required autocomplete="name"></label><label>Mobile<input name="Mobile" type="tel" autocomplete="tel"></label><label>Email*<input name="Email" type="email" required autocomplete="email"></label><label>Device type<select name="Device"><option value="">Select</option><option>CCTV</option><option>Door access</option><option>PABX</option><option>Software</option><option>Other</option></select></label><label class="w">Subject<input name="Subject" value="${esc(subject||"")}"></label><label class="w">Description<textarea name="Description" rows="3"></textarea></label><button>Send enquiry</button><small role="status"></small></form>`;
const footer=()=>`<div class="ft"><div class="fl2 cut-tr rv l"><img src="${esc(C.logo)}" alt="Topform Technologies"><h4>${X("office_label")}</h4><address style="font-style:normal">${X("office")}</address><a class="ph" href="${tel("phone1")}">${X("phone1")}</a><a class="ph" href="${tel("phone2")}">${X("phone2")}</a>
 <form class="sf" id="sf"><input name="First Name" placeholder="First Name" aria-label="First Name" autocomplete="given-name"><input name="Last Name" placeholder="Last Name" aria-label="Last Name" autocomplete="family-name"><input name="Email" type="email" required placeholder="Email" aria-label="Email" autocomplete="email"><input name="Company" placeholder="Company" aria-label="Company" autocomplete="organization"><button class="btn2">Subscribe</button><small role="status"></small></form></div>
 <div class="fr2 cut-tl rv r" style="--d:.1s"><div class="fc"><div><b>Company</b><a href="${HOME}#about">About</a><a href="/services">Services</a><a href="${HOME}#why">Why us</a><a href="${HOME}#branches">Branches</a></div>
 <div><b>Services</b>${S.slice(0,9).map(s=>`<a href="/services/${slug(s.title)}">${esc(s.title)}</a>`).join("")}</div>
 <div><b>Get in touch</b><a href="mailto:${esc(C.text.email1)}">${X("email1")}</a><a href="mailto:${esc(C.text.email2)}">${X("email2")}</a><a href="${tel("phone2")}">${X("phone2")}</a><a href="${tel("phone1")}">${X("phone1")}</a></div>
 <div><b>Quick links</b><a href="#contact">Request a quote</a><a href="${wa}" target="_blank" rel="noopener">WhatsApp us</a></div></div>
 <div class="cp"><span>© ${yr} ${X("footer")}</span><span>Secure · Connect · Power</span></div></div></div>`;
$("#ft").innerHTML=footer();

// ---------- the two pages ----------
const page=document.body.dataset.page;
const demo=()=>`<section id="contact"><div class="ct"><div class="dev rv l" aria-hidden="true"><div class="scr" style="background-image:url('${esc(SP.demo_img||"/img/video-poster.jpg")}')"></div></div>
 <div class="rv" style="--d:.1s"><h2 class="h2">${esc(SP.demo_title)}</h2><p class="lead">${X("contact_sub")}</p>
 <div class="ci"><div><small>${X("office_label")}</small>${X("office")}</div><div><small>${X("call_label")}</small><a href="${tel("phone1")}">${X("phone1")}</a> &nbsp;·&nbsp; <a href="${tel("phone2")}">${X("phone2")}</a></div><div><small>${X("email_label")}</small><a href="mailto:${esc(C.text.email1)}">${X("email1")}</a><br><a href="mailto:${esc(C.text.email2)}">${X("email2")}</a></div></div></div>
 <div class="rv r" style="--d:.2s">${formHtml("")}</div></div></section>`;

if(page==="services"){
 document.title=(C.text.svc_title?C.text.svc_title+" | ":"")+"Our Services | Topform Technologies";
 const hasVid=SP.video;
 $("#top").innerHTML=`${banner(SP.banner_title,[["Home",HOME],[SP.crumb||"Our Services","/services"]])}
 <section class="sv-hero"><div class="sv-himg" style="${isV(SP.hero_img)?"":`background-image:url('${esc(SP.hero_img)}')`}">${isV(SP.hero_img)?`<video src="${esc(SP.hero_img)}" autoplay muted loop playsinline></video>`:""}<h2 class="rv l">${esc(SP.hero_title)}</h2></div>
  <div class="sv-hcard rv r"><h3>${esc(SP.card_title)}</h3><p>${esc(SP.card_text)}</p><a class="btn2" href="#contact">${esc(SP.card_btn)}</a></div></section>
 <section class="sv-vt"><div class="vg2"><div class="sh rv l"><div class="vb cut-tr" id="vb"><img src="${esc(SP.video_poster||"/img/video-poster.jpg")}" alt="">${hasVid?`<button class="pl" id="plb" aria-label="Play video"></button>`:""}</div></div>
  <div class="sv-vtx cut-tl rv r" style="--d:.12s"><p>${esc(SP.video_text)}</p><small>${esc(SP.video_note)}</small></div></div></section>
 <section class="sv-list">${S.map((s,i)=>`<article class="sv-row${i%2?" rev":""}" id="${slug(s.title)}"><div class="sv-txt rv ${i%2?"r":"l"}"><div class="lb">${esc(s.title)}</div><h2>${esc(s.head||s.title)}</h2><p>${esc(s.blurb||s.desc)}</p><a class="btn2" href="/services/${slug(s.title)}">${esc(SP.learn_btn)}</a></div><a class="sv-imgw rv ${i%2?"l":"r"}" href="/services/${slug(s.title)}" aria-label="${esc(s.title)}" tabindex="-1"><div class="sv-img ${i%2?"cut-tl":"cut-tr"}">${media(pageImg(s),s)}</div></a></article>`).join("")}</section>
 ${demo()}`;
 const pl=$("#plb");if(pl)pl.addEventListener("click",()=>{const v=SP.video;$("#vb").innerHTML=isV(v)?`<video src="${esc(v)}" controls autoplay playsinline></video>`:`<iframe src="${esc(v)}" allow="autoplay;fullscreen" allowfullscreen></iframe>`});
}else{
 const slugNow=decodeURIComponent(location.pathname.replace(/\/+$/,"").split("/").pop()),i=S.findIndex(s=>slug(s.title)===slugNow);
 if(i<0){document.title="Service not found | Topform Technologies";$("#top").innerHTML=`${banner("Service not found",[["Home",HOME],["Our Services","/services"]])}<div class="sd-nf"><h2 class="h2">We couldn't find that service</h2><p>It may have been renamed. Browse everything we offer on the services page.</p><a class="btn2" href="/services">All services</a></div>`}
 else{const s=S[i];document.title=`${s.title} in Dubai | Topform Technologies`;const md_=document.querySelector('meta[name=description]');if(md_)md_.content=(s.blurb||s.desc||"").slice(0,300);
  $("#top").innerHTML=`${banner(s.title,[["Home",HOME],["Our Services","/services"],[s.title,"#"]])}
  <div class="sd-wrap"><article class="sd-main"><div class="sh rv"><div class="sd-img cut-tr">${media(pageImg(s),s)}</div></div>
   <h2 class="sd-h rv">${esc(s.head||s.title)}</h2><p class="sd-lead rv">${esc(s.blurb||s.desc)}</p>
   <div class="sd-body">${md(s.more)||`<p>${esc(s.desc)}</p>`}</div>
   <div class="sd-cta"><a class="btn2" href="#contact">Get a quote</a><a class="gh2" href="${tel("phone1")}">Call ${X("phone1")}</a><a class="gh2" href="/services">All services</a></div></article>
   <aside class="sd-side"><div class="sd-card rv r"><h3>Services List</h3><ul class="sd-list">${S.map((x,k)=>`<li><a href="/services/${slug(x.title)}" class="${k===i?"on":""}">${esc(x.title)}</a></li>`).join("")}</ul></div>
   <div class="sd-q cut-tl rv r" id="contact" style="--d:.1s"><h3>Request a quote</h3>${formHtml(s.title)}</div></aside></div>`;
 }
}
// ---- services side panel ----
const spData=[{t:"All services",d:C.text.svc_sub||"",pts:[],ov:1},...S.map((s,i)=>({t:s.title,d:s.desc,pts:Array.isArray(s.pts)?s.pts:[],blurb:s.blurb||"",slug:slug(s.title),bg:s.bg,img:s.img,inv:s.inv,i}))];
document.body.insertAdjacentHTML("beforeend",`<div class="spbk" aria-hidden="true"></div><aside class="sp" id="sp" aria-label="Our services" aria-hidden="true"><div class="spb"><button class="sx" id="sx" type="button" aria-label="Close services panel">×</button><div class="spi" id="spi"><ul class="spl" id="spl">${spData.map((x,k)=>`<li style="--k:${k}"><button type="button" data-k="${k}"><span class="th"><img class="${x.inv?"inv":""}" src="${x.ov?"/img/shield.png":esc(x.img)}" alt=""></span><span>${esc(x.t)}</span></button></li>`).join("")}</ul><div class="spd" id="spd" aria-live="polite"><div class="spmw"><div class="spm cut-tr" id="spm"></div></div><h3 id="sph"></h3><p class="sd" id="spdesc"></p><div class="mx" id="spmx"></div><ul class="spp" id="sppts"></ul><div class="spa" id="spact"></div></div></div></div></aside><button class="spt" id="spt" type="button" aria-controls="sp" aria-expanded="false">Our services</button>`);
const spMd=t=>{const E=x=>esc(x).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");let h="",ul=0;String(t||"").split(/\r?\n/).forEach(l=>{l=l.trim();if(!l)return;if(l.startsWith("- ")){if(!ul){h+="<ul>";ul=1}h+="<li>"+E(l.slice(2))+"</li>";return}if(ul){h+="</ul>";ul=0}h+=l.startsWith("## ")?"<h4>"+E(l.slice(3))+"</h4>":"<p>"+E(l)+"</p>"});if(ul)h+="</ul>";return h};
const sp=$("#sp"),spt=$("#spt"),svb=$("#svb");let spCur=-1;
const spShow=(k,force)=>{if(k===spCur&&!force)return;spCur=k;const x=spData[k];
 $("#spm").innerHTML=x.ov?`<img class="mi ico" src="/img/shield.png" alt="">`:x.bg?(isV(x.bg)?`<video class="mi" src="${esc(x.bg)}" autoplay muted loop playsinline></video>`:`<img class="mi" src="${esc(x.bg)}" alt="">`):`<img class="mi ico ${x.inv?"inv":""}" src="${esc(x.img)}" alt="">`;
 $("#sph").textContent=x.t;$("#spdesc").textContent=x.ov?x.d:(x.blurb||x.d);$("#spmx").innerHTML="";$("#sppts").innerHTML=x.pts.map(p=>`<li>${esc(p)}</li>`).join("");$("#spd").scrollTop=0;
 $("#spact").innerHTML=x.ov?`<a class="btn2" href="#contact">Request a quote</a>`:`<a class="btn2" href="#contact" data-s="${esc(x.t)}">Get a quote</a><a class="gh" href="/services#${x.slug}">View in page</a>`;
 $$("#spl button").forEach(b=>b.classList.toggle("on",+b.dataset.k===k));
 if(!calm){const d=$("#spd"),m=$("#spm");d.classList.remove("fl");m.classList.remove("fl");void d.offsetWidth;d.classList.add("fl");m.classList.add("fl")}};
const spOpen=o=>{sp.classList.toggle("on",o);sp.setAttribute("aria-hidden",String(!o));document.body.classList.toggle("spo",o);spt.setAttribute("aria-expanded",String(o));
 if(o){nv.classList.remove("open");bg.setAttribute("aria-expanded","false");if(spCur<0)spShow(0);setTimeout(()=>{if(sp.classList.contains("on"))$("#sx").focus({preventScroll:true})},450)}};
svb.addEventListener("click",e=>{if(matchMedia("(max-width:1060px)").matches){e.preventDefault();svb.parentElement.classList.toggle("open");svb.setAttribute("aria-expanded",String(svb.parentElement.classList.contains("open")))}});
[nv,$(".logo")].forEach(el=>el&&el.addEventListener("click",e=>{const a=e.target.closest("a");if(a&&a!==svb&&sp.classList.contains("on"))spOpen(false)}));
spt.addEventListener("click",()=>spOpen(true));
$("#sx").addEventListener("click",()=>spOpen(false));
let sht;$$("#spl button").forEach(b=>{const k=+b.dataset.k;
 b.addEventListener("mouseenter",()=>{clearTimeout(sht);sht=setTimeout(()=>spShow(k),70)});
 b.addEventListener("mouseleave",()=>clearTimeout(sht));
 b.addEventListener("focus",()=>spShow(k));
 b.addEventListener("click",()=>{clearTimeout(sht);spShow(k,true);if(innerWidth<=860)$("#spi").scrollTo({top:0,behavior:"smooth"})})});
$("#spl").addEventListener("keydown",e=>{if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const bs=$$("#spl button"),i=bs.indexOf(document.activeElement),n=e.key==="ArrowDown"?Math.min(bs.length-1,i+1):Math.max(0,i-1);bs[n].focus()});
$("#spact").addEventListener("click",e=>{const a=e.target.closest("a");if(!a)return;const f=$("#fm [name=Subject]");if(f&&a.dataset.s)f.value=a.dataset.s;spOpen(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&sp.classList.contains("on"))spOpen(false)});

// ---------- forms ----------
const send=async(form,extra)=>{const m=form.querySelector("small"),d=Object.assign(Object.fromEntries(new FormData(form)),extra||{});try{const r=await fetch("/api/contact",{method:"POST",body:JSON.stringify(d)});if(!r.ok)throw await r.text();form.reset();return true}catch(x){return false}};
const fm=$("#fm");if(fm)fm.addEventListener("submit",async e=>{e.preventDefault();const m=fm.querySelector("small"),sub=fm.querySelector("[name=Subject]").value;m.textContent=(await send(fm))?"Thank you. We will contact you shortly.":"Could not send. Please call us.";const f=fm.querySelector("[name=Subject]");if(f)f.value=sub});
$("#sf").addEventListener("submit",async e=>{e.preventDefault();const m=e.target.querySelector("small");m.textContent=(await send(e.target,{Subject:"Newsletter subscription"}))?"Thank you for subscribing.":"Could not send. Please call us."});
// scroll reveal
$$(".sv-list .sv-row").forEach(r=>r.querySelectorAll(".rv").forEach((el,k)=>el.style.setProperty("--d",(k*.12)+"s")));
const rvo=new IntersectionObserver(l=>l.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rvo.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
$$(".rv").forEach(el=>calm?el.classList.add("in"):rvo.observe(el));
// open the matching service when arriving with /services#slug
if(location.hash.length>1){setTimeout(()=>{const t=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(t)t.scrollIntoView({behavior:"smooth",block:"center"})},350)}
})();
