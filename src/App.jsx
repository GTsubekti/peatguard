import { useState, useEffect, useRef } from "react";

/* ── PALETTE ─────────────────────────────────────────────── */
const C = {
  bg:"#060d09", surface:"#0b1710", card:"#0f1e13", border:"#1b3324",
  accent:"#39ff85", accentDim:"#1a9948", accent2:"#00c4ff",
  warn:"#ffbe2e", danger:"#ff3d50", text:"#dff0e7", muted:"#4a7360",
};

/* ── GLOBAL STYLES ───────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${C.bg};color:${C.text};font-family:'Outfit',sans-serif;font-size:14px;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:${C.border};border-radius:9px}

/* ─ HEADER ─ */
.hdr{position:fixed;top:0;left:0;right:0;z-index:100;
  background:rgba(6,13,9,.85);backdrop-filter:blur(14px);
  border-bottom:1px solid ${C.border};
  display:flex;align-items:center;padding:0 20px;height:100px;gap:12px}
.hdr-logo{font-family:'Space Mono',monospace;font-size:28px;color:${C.accent};font-weight:700;letter-spacing:-.5px}
.hdr-sub{font-size:20px;color:${C.text};display:none;font-weight:500}
@media(min-width:480px){.hdr-sub{display:block}}
.hdr-right{margin-left:auto;display:flex;align-items:center;gap:8px;
  font-family:'Space Mono',monospace;font-size:13px;color:${C.accent};letter-spacing:1px}
.ldot{width:10px;height:10px;border-radius:50%;background:${C.accent};animation:blink 1.4s infinite}
.ldot{width:6px;height:6px;border-radius:50%;background:${C.accent};animation:blink 1.4s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}

/* ─ MAP HERO ─ */
.hero{position:relative;height:100vh;width:100%;background:${C.bg};overflow:hidden;padding-top:100px}
.hero-svg-wrap{width:100%;height:100%;position:relative}
.hero-svg{width:100%;height:100%;display:block}
.hero-overlay{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(6,13,9,.5) 100%)}

/* stats strip inside map */
.map-stats{position:absolute;bottom:0;left:0;right:0;
  display:flex;justify-content:center;gap:0;
  background:linear-gradient(to top,rgba(6,13,9,.95) 70%,transparent);
  padding:28px 16px 16px}
.mstat{text-align:center;flex:1;max-width:120px}
.mstat-val{font-family:'Space Mono',monospace;font-size:18px;font-weight:700}
.mstat-lbl{font-size:9px;color:${C.muted};text-transform:uppercase;letter-spacing:1px;margin-top:2px}
.mstat-div{width:1px;background:${C.border};margin:4px 0;align-self:stretch}
.map-stats-row{display:flex;justify-content:space-evenly;width:100%}
.map-credit{text-align:center;margin-top:12px;padding-top:10px;border-top:1px solid ${C.border};width:100%}
.map-credit-text{font-family:'Space Mono',monospace;font-size:17px;color:${C.accent};font-weight:700;letter-spacing:1px}
.map-credit-sub{font-size:13px;color:${C.muted};margin-top:4px}

/* title inside map */
.map-title{position:absolute;top:70px;left:20px;pointer-events:none}
.map-title h1{font-size:clamp(18px,3vw,28px);font-weight:700;line-height:1.2;color:${C.text}}
.map-title h1 span{color:${C.accent}}
.map-title p{font-size:11px;color:${C.muted};margin-top:5px;font-family:'Space Mono',monospace;letter-spacing:1px}

/* map legend */
.map-legend{position:absolute;top:70px;right:16px;
  background:rgba(6,13,9,.92);border:1px solid ${C.border};border-radius:12px;
  padding:13px 16px;backdrop-filter:blur(10px);pointer-events:none;
  box-shadow:0 4px 24px rgba(0,0,0,.5)}
.leg-title{font-family:'Space Mono',monospace;font-size:9px;color:${C.muted};
  letter-spacing:2px;text-transform:uppercase;margin-bottom:9px}
.leg-row{display:flex;align-items:center;gap:8px;font-size:12px;color:${C.text};margin-bottom:6px;font-weight:500}
.leg-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0}

/* popup */
.popup{position:absolute;background:rgba(10,22,15,.97);
  border:1px solid ${C.border};border-radius:12px;padding:13px;
  min-width:180px;z-index:50;box-shadow:0 8px 40px rgba(0,0,0,.7);pointer-events:none}
.popup-title{font-size:13px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:7px}
.popup-row{display:flex;justify-content:space-between;font-size:11px;color:${C.muted};
  padding:3px 0;border-bottom:1px solid ${C.border}}
.popup-row:last-child{border-bottom:none}
.popup-row span:last-child{color:${C.text};font-family:'Space Mono',monospace}

/* badge */
.badge{padding:2px 7px;border-radius:99px;font-size:10px;font-weight:700}
.bl{background:#0d2e1a;color:${C.accent}}
.bm{background:#2e1f00;color:${C.warn}}
.bh{background:#2e0000;color:${C.danger}}

/* ─ TAB SECTION ─ */
.tab-section{background:${C.bg}}
.tab-nav{position:sticky;top:100px;z-index:90;
  background:rgba(6,13,9,.92);backdrop-filter:blur(12px);
  border-bottom:1px solid ${C.border};
  display:flex;padding:0 12px;overflow-x:auto}
.tab-nav::-webkit-scrollbar{height:0}
.nt{flex-shrink:0;padding:13px 16px;border:none;background:none;
  color:${C.muted};font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;
  cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;
  display:flex;align-items:center;gap:6px;white-space:nowrap}
.nt.on{color:${C.accent};border-bottom-color:${C.accent}}
.nt:hover:not(.on){color:${C.text}}

/* ─ CONTENT ─ */
.content{padding:18px 16px;max-width:900px;margin:0 auto}
@media(min-width:768px){.content{padding:22px 24px}}

/* ─ CARD ─ */
.card{background:${C.card};border:1px solid ${C.border};border-radius:14px;padding:16px;margin-bottom:14px}
.ctitle{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;
  color:${C.muted};text-transform:uppercase;margin-bottom:12px}

/* ─ GRIDS ─ */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
.g4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px}
@media(min-width:560px){.g4{grid-template-columns:repeat(4,1fr)}}
@media(max-width:480px){.g2{grid-template-columns:1fr}.g3{grid-template-columns:1fr 1fr}}

/* ─ STAT BOX ─ */
.sbox{background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:12px}
.slbl{font-size:9px;color:${C.muted};text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
.sval{font-family:'Space Mono',monospace;font-size:20px;font-weight:700}
.sunit{font-size:10px;color:${C.muted}}

/* ─ BAR ─ */
.brow{margin-bottom:8px}
.blbl{display:flex;justify-content:space-between;font-size:10px;color:${C.muted};margin-bottom:3px}
.bbg{height:6px;background:${C.surface};border-radius:99px;overflow:hidden}
.bfill{height:100%;border-radius:99px;transition:width .9s ease}

/* ─ ALERT BOX ─ */
.abox{padding:11px 14px;border-radius:9px;font-size:12px;font-weight:600;
  display:flex;align-items:center;gap:9px;margin-top:12px}
.abox.safe{background:#0d2e1a;border:1px solid #1a5c33;color:${C.accent}}
.abox.warn{background:#2e1f00;border:1px solid #7a4e00;color:${C.warn}}
.abox.dang{background:#2e0000;border:1px solid #7a0000;color:${C.danger}}

/* ─ BUTTONS ─ */
.btn{padding:8px 14px;border-radius:7px;border:1px solid ${C.accentDim};
  background:transparent;color:${C.accent};font-family:'Outfit',sans-serif;
  font-size:11px;font-weight:600;cursor:pointer;transition:all .2s}
.btn:hover{background:${C.accentDim};color:#000}
.btn.on{background:${C.accent};color:#000;border-color:${C.accent}}
.btn:disabled{opacity:.4;cursor:not-allowed}
.btn-row{display:flex;gap:7px;margin-top:11px;flex-wrap:wrap;align-items:center}

/* ─ CANAL ─ */
.ccard{background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:12px;text-align:center}
.wind{position:relative;height:72px;background:${C.bg};border:1px solid ${C.border};
  border-radius:7px;overflow:hidden;margin:7px 0}
.wfill{position:absolute;bottom:0;left:0;right:0;transition:height 1s ease}
.wlbl{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Space Mono',monospace;font-size:12px;font-weight:700;z-index:1}
.wtgt{position:absolute;left:0;right:0;height:2px;background:${C.warn};opacity:.8}

/* ─ SEGMENTATION ─ */
.seggrid{display:grid;grid-template-columns:repeat(20,1fr);gap:2px;
  border-radius:8px;overflow:hidden;margin:10px 0}
.segcell{aspect-ratio:1;border-radius:2px;transition:background .5s}

/* ─ CARBON ─ */
.cf{margin-bottom:10px}
.clbl{font-size:10px;color:${C.muted};margin-bottom:4px}
.cinp{width:100%;background:${C.surface};border:1px solid ${C.border};border-radius:7px;
  padding:8px 10px;color:${C.text};font-family:'Space Mono',monospace;
  font-size:13px;outline:none;transition:border-color .2s}
.cinp:focus{border-color:${C.accent}}
.cres{background:#071a0f;border:1px solid #1a5c33;border-radius:10px;padding:14px;margin-top:12px}
.crow{display:flex;justify-content:space-between;font-size:11px;color:${C.muted};
  padding:4px 0;border-bottom:1px solid ${C.border}}
.crow:last-child{border-bottom:none}
.crow span:last-child{color:${C.accent};font-family:'Space Mono',monospace;font-weight:700}
.ctotval{font-family:'Space Mono',monospace;font-size:30px;font-weight:700;color:${C.accent};text-align:center;margin-top:10px}
.ctotlbl{font-size:10px;color:${C.muted};text-align:center;margin-top:2px}

/* ─ TIMELINE ─ */
.tl{display:flex;flex-direction:column;gap:7px}
.tli{display:flex;gap:10px;align-items:flex-start}
.tldot{width:8px;height:8px;border-radius:50%;margin-top:3px;flex-shrink:0}

/* ─ FADE ─ */
.fade{animation:fadeUp .3s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

/* ─ PULSE ─ */
.pulse{animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* ─ INFO STRIP ─ */
.info-strip{background:${C.surface};border:1px solid ${C.border};border-radius:9px;
  padding:10px 13px;font-size:11px;color:${C.muted};line-height:1.7}
`;

/* ── DATA ─────────────────────────────────────────────────── */
const REGIONS = [
  {id:1, name:"Riau",        mx:195,my:205, area:4044000, risk:82, hs:47, depth:2, status:"degraded"},
  {id:2, name:"Kalteng",     mx:370,my:230, area:3010000, risk:68, hs:31, depth:3, status:"degraded"},
  {id:3, name:"Kalbar",      mx:325,my:215, area:1729000, risk:55, hs:18, depth:2, status:"degraded"},
  {id:4, name:"Papua Barat", mx:580,my:238, area:6090000, risk:21, hs:3,  depth:3, status:"intact"},
  {id:5, name:"Jambi",       mx:212,my:222, area:717000,  risk:71, hs:22, depth:2, status:"degraded"},
  {id:6, name:"Sumsel",      mx:223,my:240, area:1408000, risk:77, hs:38, depth:2, status:"degraded"},
  {id:7, name:"Kalsel",      mx:388,my:252, area:186000,  risk:44, hs:9,  depth:1, status:"restored"},
  {id:8, name:"Kaltim",      mx:408,my:205, area:209000,  risk:38, hs:6,  depth:2, status:"intact"},
  {id:9, name:"Aceh",        mx:175,my:178, area:290000,  risk:32, hs:4,  depth:2, status:"intact"},
  {id:10,name:"Papua Tgh",   mx:610,my:258, area:5200000, risk:18, hs:1,  depth:3, status:"intact"},
  {id:11,name:"Sumut",       mx:185,my:188, area:250000,  risk:48, hs:11, depth:2, status:"degraded"},
  {id:12,name:"Bengkulu",    mx:200,my:235, area:123000,  risk:41, hs:7,  depth:1, status:"restored"},
];

const CANALS = ["KHG-01","KHG-02","KHG-03","KHG-04"];
const SEG = {
  healthy:{color:"#166534",label:"Sehat"},
  degraded:{color:"#92400e",label:"Degradasi"},
  critical:{color:"#7f1d1d",label:"Kritis"},
  water:{color:"#075985",label:"Air/Kanal"},
  burned:{color:"#1c1917",label:"Bekas Bakar"},
};
const SEGKEYS = Object.keys(SEG);
const CDENSITY = {1:800,2:2000,3:4500};
const ERATE    = {intact:5,degraded:35,restored:12};

const rc = v => v<40?C.accent:v<70?C.warn:C.danger;
const rb = v => v<40?"bl":v<70?"bm":"bh";
const rl = v => v<40?"Rendah":v<70?"Sedang":"Tinggi";
const makeMap = () => Array.from({length:200},()=>SEGKEYS[Math.floor(Math.random()*SEGKEYS.length)]);

function useInterval(fn,ms){
  const cb=useRef(fn);
  useEffect(()=>{cb.current=fn;},[fn]);
  useEffect(()=>{const id=setInterval(()=>cb.current(),ms);return()=>clearInterval(id);},[ms]);
}

/* ── INDONESIA SVG PATH ──────────────────────────────────── */
/* Simplified outlines: Sumatera, Jawa, Kalimantan, Sulawesi, Papua */
const PATHS = [
  // Sumatera
  "M168,172 L178,163 L192,158 L204,160 L214,170 L218,184 L215,198 L210,214 L215,228 L220,244 L213,252 L200,254 L188,248 L178,234 L172,218 L165,202 L162,186 Z",
  // Jawa
  "M222,258 L238,252 L258,250 L278,252 L298,255 L314,258 L326,262 L322,270 L305,274 L282,275 L258,272 L238,268 Z",
  // Kalimantan
  "M285,185 L302,174 L320,168 L342,166 L365,170 L385,178 L402,186 L415,196 L420,212 L418,230 L410,246 L395,258 L374,264 L350,265 L326,260 L305,252 L290,240 L280,224 L278,206 Z",
  // Sulawesi (simplified)
  "M428,190 L440,182 L452,178 L460,184 L462,198 L456,210 L448,218 L438,222 L428,218 L422,206 Z M450,220 L462,215 L472,220 L476,234 L468,244 L455,242 L448,232 Z",
  // Papua (simplified)
  "M490,198 L510,185 L535,178 L562,176 L588,180 L612,188 L632,200 L645,218 L648,238 L640,255 L622,266 L598,272 L570,272 L542,268 L516,258 L496,244 L484,228 L482,212 Z",
  // Maluku / smaller islands
  "M458,248 L468,244 L476,250 L474,260 L462,262 Z M480,235 L490,230 L498,236 L496,248 L484,248 Z",
];

/* ── MAP HERO COMPONENT ──────────────────────────────────── */
function MapHero({regions, onHover, popup, svgRef}){
  const totalHs = regions.reduce((s,r)=>s+r.hs,0);
  return(
    <section className="hero">
      <div className="map-title">
        <h1>🌿 <span>PeatGuard</span><br/>Intelligence Platform</h1>
        <p>LSTM · RL · CNN · LoRaWAN · Carbon Credit</p>
      </div>
      <div className="map-legend">
        <div className="leg-title">Risiko Karhutla</div>
        {[[C.accent,"Rendah (<40%)"],[C.warn,"Sedang (40–70%)"],[C.danger,"Tinggi (>70%)"]].map(([c,l])=>(
          <div className="leg-row" key={l}><div className="leg-dot" style={{background:c}}/>{l}</div>
        ))}
        <div style={{fontSize:9,color:C.muted,marginTop:6,borderTop:`1px solid ${C.border}`,paddingTop:5}}>
          Angka = jumlah hotspot
        </div>
      </div>

      <div className="hero-svg-wrap" ref={svgRef}>
        <svg className="hero-svg" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="mapbg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#081510"/>
              <stop offset="100%" stopColor="#030a06"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <rect width="720" height="360" fill="url(#mapbg)"/>

          {/* grid */}
          {[100,200,300,400,500,600].map(x=>(
            <line key={x} x1={x} y1="0" x2={x} y2="360" stroke={C.border} strokeWidth=".5" opacity=".4"/>
          ))}
          {[90,180,270].map(y=>(
            <line key={y} x1="0" y1={y} x2="720" y2={y} stroke={C.border} strokeWidth=".5" opacity=".4"/>
          ))}

          {/* lat/lon labels */}
          {["95°E","120°E","141°E"].map((l,i)=>(
            <text key={l} x={100+i*230} y="355" fill={C.muted} fontSize="8" fontFamily="Space Mono" textAnchor="middle">{l}</text>
          ))}
          {["6°N","0°","8°S"].map((l,i)=>(
            <text key={l} x="14" y={90+i*90} fill={C.muted} fontSize="8" fontFamily="Space Mono">{l}</text>
          ))}

          {/* island outlines */}
          {PATHS.map((d,i)=>(
            <path key={i} d={d} fill={`${C.accentDim}18`} stroke={C.border} strokeWidth=".8"/>
          ))}

          {/* markers */}
          {regions.map(r=>{
            const col = rc(r.risk);
            const sz  = 7 + Math.min(r.hs,50)/6;
            return(
              <g key={r.id} style={{cursor:"pointer"}}
                onMouseEnter={()=>onHover(r)}
                onMouseLeave={()=>onHover(null)}
                onClick={()=>onHover(r)}>
                {/* pulse ring */}
                <circle cx={r.mx} cy={r.my} r={sz+6} fill={col} opacity=".08">
                  <animate attributeName="r" values={`${sz+3};${sz+10};${sz+3}`} dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values=".12;0;.12" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx={r.mx} cy={r.my} r={sz} fill={col} opacity=".88"
                  stroke="rgba(255,255,255,.2)" strokeWidth="1.5" filter="url(#glow)"/>
                <text x={r.mx} y={r.my+3.5} textAnchor="middle" fill="#000"
                  fontSize="7" fontFamily="Space Mono" fontWeight="700" style={{pointerEvents:"none"}}>
                  {r.hs}
                </text>
                <text x={r.mx} y={r.my-sz-5} textAnchor="middle"
                  fill={col} fontSize="8.5" fontFamily="Outfit" fontWeight="600"
                  style={{pointerEvents:"none",textShadow:"0 1px 4px #000"}}>
                  {r.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="hero-overlay"/>
      </div>

      {/* popup */}
      {popup && (
        <div className="popup" style={{
          left: Math.min(popup.r.mx/720*100+2, 60)+'%',
          top:  Math.max(popup.r.my/360*82+3, 12)+'%',
        }}>
          <div className="popup-title">
            {popup.r.name}
            <span className={`badge ${rb(popup.r.risk)}`}>{rl(popup.r.risk)}</span>
          </div>
          <div className="popup-row"><span>Luas Gambut</span><span>{(popup.r.area/1000).toFixed(0)}k ha</span></div>
          <div className="popup-row"><span>Skor Risiko LSTM</span><span>{Math.round(popup.r.risk)}%</span></div>
          <div className="popup-row"><span>Hotspot Aktif</span><span>{popup.r.hs}</span></div>
          <div className="popup-row"><span>Status Lahan</span><span>{popup.r.status}</span></div>
          <div className="popup-row"><span>Carbon Credit/thn</span>
            <span>${Math.round(popup.r.area*ERATE[popup.r.status]*.7*25).toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* stats strip */}
      <div className="map-stats">
        <div className="map-stats-row">
          {[
            {val:"24.7", unit:"jt ha", lbl:"Total Gambut", color:C.accent2},
            {val:totalHs, unit:"", lbl:"Hotspot Aktif", color:C.danger},
            {val:"9.8",  unit:"jt ha", lbl:"Terdegradasi", color:C.warn},
            {val:"12",   unit:"titik", lbl:"Lokasi Pantau", color:C.accent},
          ].map((s,i,arr)=>(
            <>
              <div className="mstat" key={s.lbl}>
                <div className="mstat-val" style={{color:s.color}}>{s.val}<span style={{fontSize:11,color:C.muted}}>{s.unit}</span></div>
                <div className="mstat-lbl">{s.lbl}</div>
              </div>
              {i<arr.length-1&&<div className="mstat-div" key={`d${i}`}/>}
            </>
          ))}
        </div>
        <div className="map-credit">
          <div className="map-credit-text">Created by Student Researchers · MAN 5 Kediri</div>
          <div className="map-credit-sub">PeatGuard - Indonesia Peatland Intelligence Platform · 2026</div>
        </div>
      </div>
    </section>
  );
}

/* ── TAB: EARLY WARNING ───────────────────────────────────── */
function EarlyWarning(){
  const [hist,setHist]=useState(()=>Array.from({length:24},(_,i)=>({
    h:i,rain:60+Math.sin(i*.4)*40+Math.random()*20,
    temp:32+Math.sin(i*.3)*5,hum:55+Math.cos(i*.35)*20,
    risk:20+i*1.8+Math.random()*15,
  })));
  const [run,setRun]=useState(true);

  useInterval(()=>{
    if(!run)return;
    setHist(h=>{
      const l=h[h.length-1];
      const nr=Math.max(5,Math.min(98,l.risk+(Math.random()-.45)*12));
      return[...h.slice(-23),{h:l.h+1,rain:Math.max(0,l.rain+(Math.random()-.5)*25),
        temp:32+Math.sin(l.h*.3)*5+(Math.random()-.5),
        hum:Math.max(20,Math.min(95,l.hum+(Math.random()-.5)*8)),risk:nr}];
    });
  },1500);

  const lat=hist[hist.length-1];
  const rv=Math.round(lat.risk);
  const lv=rv<40?"safe":rv<70?"warn":"dang";
  const msg=rv<40?"✓  Kondisi aman — TMAT dalam batas normal"
            :rv<70?"⚠  Waspada — Kirim notifikasi ke Manggala Agni"
            :"🔴  SIAGA — Aktivasi protokol darurat karhutla!";
  const W=500,H=110;
  const pts=hist.map((d,i)=>[(i/(hist.length-1))*W,H-(d.risk/100)*H]);
  const path=pts.map((p,i)=>`${i===0?"M":"L"}${p[0]},${p[1]}`).join(" ");
  const area=path+` L${W},${H} L0,${H} Z`;
  const col=rc(rv);

  return(
    <div className="content fade">
      <div className="g3">
        {[["Suhu",lat.temp.toFixed(1),"°C",C.warn],["Kelembapan",Math.round(lat.hum),"%",C.accent2],["Curah Hujan",Math.round(lat.rain),"mm",C.accentDim]].map(([l,v,u,c])=>(
          <div className="sbox" key={l}><div className="slbl">{l}</div>
            <div className="sval" style={{color:c}}>{v}<span className="sunit">{u}</span></div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="ctitle">📈 LSTM Risk Score — Time-Series Forecast</div>
        <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:12}}>
          <div>
            <div style={{fontSize:11,color:C.muted}}>Skor Risiko</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:36,fontWeight:700,color:col}}>{rv}%</div>
          </div>
          <div style={{flex:1}}>
            {[["Suhu",lat.temp/40*100],["Kelembapan",lat.hum],["Curah Hujan",lat.rain/150*100]].map(([l,v])=>(
              <div className="brow" key={l}>
                <div className="blbl"><span>{l}</span><span>{Math.round(v)}%</span></div>
                <div className="bbg"><div className="bfill" style={{width:`${Math.min(100,v)}%`,background:rc(v)}}/></div>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:H,display:"block"}} preserveAspectRatio="none">
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={col} stopOpacity=".4"/>
              <stop offset="100%" stopColor={col} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <line x1="0" y1={H*.3} x2={W} y2={H*.3} stroke={C.danger} strokeWidth="1" strokeDasharray="4,4" opacity=".35"/>
          <line x1="0" y1={H*.6} x2={W} y2={H*.6} stroke={C.warn} strokeWidth="1" strokeDasharray="4,4" opacity=".35"/>
          <path d={area} fill="url(#rg)"/>
          <path d={path} fill="none" stroke={col} strokeWidth="2"/>
          <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4" fill={col}/>
        </svg>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginTop:3}}>
          <span>−24 jam</span><span>Sekarang</span>
        </div>
        <div className={`abox ${lv}`}>{msg}</div>
        <div className="btn-row">
          <button className={`btn${run?"":" on"}`} onClick={()=>setRun(r=>!r)}>{run?"⏸ Pause":"▶ Resume"}</button>
          <span style={{fontSize:10,color:C.muted}}>Model: LSTM · Window 24 jam</span>
        </div>
      </div>
      <div className="card">
        <div className="ctitle">📋 Log Aktivitas</div>
        <div className="tl">
          {[{c:C.accent,t:"Baru saja",m:`Prediksi diperbarui → Risiko ${rv}%`},
            {c:rv>70?C.warn:C.muted,t:"2 mnt lalu",m:"Sensor TMAT KHG-Kalteng diterima"},
            {c:C.muted,t:"8 mnt lalu",m:"Data cuaca BMKG disinkronkan"},
            {c:C.muted,t:"15 mnt lalu",m:"Sensor fusion — 3 sumber diverifikasi"},
            {c:C.accent,t:"1 jam lalu",m:"Model LSTM retrain data terbaru"},
          ].map((x,i)=>(
            <div className="tli" key={i}>
              <div className="tldot" style={{background:x.c}}/>
              <div>
                <div style={{fontSize:11}}>{x.m}</div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:C.muted}}>{x.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── TAB: WATER MANAGEMENT ───────────────────────────────── */
function WaterMgmt(){
  const [canals,setCanals]=useState(()=>CANALS.map((_,i)=>({id:CANALS[i],tmat:28+i*8+Math.random()*10,open:false,action:"hold"})));
  const [run,setRun]=useState(true);
  const [season,setSeason]=useState("kemarau");
  const [log,setLog]=useState([]);

  useInterval(()=>{
    if(!run)return;
    setCanals(p=>p.map(c=>{
      const d=season==="kemarau"?(Math.random()-.3)*1.5:(Math.random()-.7)*1.5;
      const g=c.open?(season==="kemarau"?2:-1.5):0;
      const nt=Math.max(10,Math.min(80,c.tmat+d+g));
      let action="hold",open=c.open;
      if(nt<25){action="buka";open=true;}else if(nt>55){action="tutup";open=false;}
      return{...c,tmat:nt,open,action};
    }));
    const cid=CANALS[Math.floor(Math.random()*CANALS.length)];
    setLog(l=>[{time:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),
      msg:`RL Agent → ${cid}: ${Math.random()>.5?"Buka pintu air +2cm":"Pertahankan posisi"}`},...l.slice(0,4)]);
  },1800);

  const avg=canals.reduce((s,c)=>s+c.tmat,0)/canals.length;
  return(
    <div className="content fade">
      <div className="g2">
        <div className="sbox">
          <div className="slbl">Rata-rata TMAT</div>
          <div className="sval" style={{color:avg<40?C.accent2:C.warn}}>{avg.toFixed(1)}<span className="sunit">cm</span></div>
          <div style={{fontSize:10,color:C.muted,marginTop:3}}>Target: &lt;40 cm (BRGM)</div>
        </div>
        <div className="sbox">
          <div className="slbl">Musim Aktif</div>
          <div style={{display:"flex",gap:7,marginTop:7}}>
            {["kemarau","hujan"].map(s=>(
              <button key={s} className={`btn${season===s?" on":""}`} style={{flex:1,padding:"6px"}} onClick={()=>setSeason(s)}>
                {s==="kemarau"?"☀ Kemarau":"🌧 Hujan"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="ctitle">💧 Smart Canal Blocking — Reinforcement Learning Agent</div>
        <div className="g4">
          {canals.map(c=>{
            const pct=Math.min(100,(c.tmat/80)*100);
            const warn=c.tmat<20||c.tmat>60;
            return(
              <div className="ccard" key={c.id}>
                <div style={{fontSize:10,color:C.muted,marginBottom:5}}>{c.id}</div>
                <div className="wind">
                  <div className="wfill" style={{height:`${pct}%`,background:c.tmat<30?C.accent2:c.tmat>55?C.danger:C.accentDim,opacity:.7}}/>
                  <div className="wlbl" style={{color:warn?C.warn:C.text}}>{c.tmat.toFixed(0)}</div>
                  <div className="wtgt" style={{bottom:`${(40/80)*100}%`}}/>
                </div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,color:warn?C.warn:C.accent}}>{c.tmat.toFixed(1)} cm</div>
                <div style={{fontSize:10,color:c.open?C.accent2:warn?C.warn:C.muted,marginTop:2}}>{c.open?"▲ BUKA":"▼ TUTUP"}</div>
                <div style={{fontSize:9,color:C.muted,marginTop:1}}>RL: {c.action}</div>
              </div>
            );
          })}
        </div>
        <div style={{fontSize:10,color:C.muted}}><span style={{color:C.warn}}>— Garis kuning:</span> target TMAT 40 cm (regulasi BRGM)</div>
        <div className="btn-row">
          <button className={`btn${run?"":" on"}`} onClick={()=>setRun(r=>!r)}>{run?"⏸ Pause RL":"▶ Start RL"}</button>
        </div>
      </div>
      <div className="card">
        <div className="ctitle">🤖 RL Decision Log</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:11}}>
          {log.length===0
            ?<div className="pulse" style={{color:C.muted}}>Menunggu keputusan RL...</div>
            :log.map((l,i)=>(
              <div key={i} style={{padding:"5px 0",borderBottom:`1px solid ${C.border}`,color:i===0?C.accent:C.muted}}>
                <span style={{color:C.accentDim}}>[{l.time}]</span> {l.msg}
              </div>
            ))}
        </div>
        <div className="info-strip" style={{marginTop:12}}>
          📡 <b style={{color:C.text}}>LoRaWAN</b> — 15 km, tanpa 4G &nbsp;·&nbsp;
          🖥 <b style={{color:C.text}}>Edge AI</b> — on-device, tanpa cloud &nbsp;·&nbsp;
          🔀 <b style={{color:C.text}}>Sensor Fusion</b> — soil + satelit + MPA
        </div>
      </div>
    </div>
  );
}

/* ── TAB: COMPUTER VISION ────────────────────────────────── */
function CompVision(){
  const [cells,setCells]=useState(makeMap);
  const [scanning,setScanning]=useState(false);
  const [scanLine,setScanLine]=useState(-1);
  const [mode,setMode]=useState("raw");
  const counts=cells.reduce((a,t)=>{a[t]=(a[t]||0)+1;return a;},{});
  const total=cells.length;

  function runScan(){
    setScanning(true);setScanLine(0);let l=0;
    const iv=setInterval(()=>{l++;setScanLine(l);if(l>=10){clearInterval(iv);const nm=makeMap();setCells(nm);setScanning(false);setScanLine(-1);setMode("segmented");}},130);
  }

  return(
    <div className="content fade">
      <div className="card">
        <div className="ctitle">🛰 CNN Semantic Segmentation — Citra Satelit Gambut</div>
        <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
          {["raw","segmented"].map(m=>(
            <button key={m} className={`btn${mode===m?" on":""}`} style={{padding:"6px 14px"}} onClick={()=>setMode(m)}>
              {m==="raw"?"🖼 Raw":"🎯 Segmented"}
            </button>
          ))}
          <button className="btn" onClick={runScan} disabled={scanning} style={{marginLeft:"auto"}}>
            {scanning?<span className="pulse">⟳ Scanning…</span>:"▶ Jalankan CNN"}
          </button>
        </div>
        <div style={{position:"relative"}}>
          <div className="seggrid">
            {cells.map((type,i)=>{
              const row=Math.floor(i/20);
              const revealed=scanning&&row<=scanLine;
              return<div key={i} className="segcell" style={{background:revealed||mode==="segmented"?SEG[type].color:"#0f1a12"}}/>;
            })}
          </div>
          {scanning&&<div style={{position:"absolute",top:`${(scanLine/10)*100}%`,left:0,right:0,height:"3px",background:C.accent,boxShadow:`0 0 10px ${C.accent}`,transition:"top .12s"}}/>}
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:8}}>
          {Object.entries(SEG).map(([k,v])=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:C.muted}}>
              <div style={{width:8,height:8,borderRadius:2,background:v.color}}/>{v.label}
            </div>
          ))}
        </div>
      </div>
      <div className="g2">
        <div className="card">
          <div className="ctitle">📊 Klasifikasi Area</div>
          {Object.entries(SEG).map(([k,v])=>{
            const pct=((counts[k]||0)/total*100).toFixed(1);
            return(
              <div className="brow" key={k}>
                <div className="blbl"><span style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:8,height:8,borderRadius:2,background:v.color,display:"inline-block"}}/>{v.label}
                </span><span>{pct}%</span></div>
                <div className="bbg"><div className="bfill" style={{width:`${pct}%`,background:v.color}}/></div>
              </div>
            );
          })}
        </div>
        <div className="card">
          <div className="ctitle">🔍 Detail Teknis</div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.9}}>
            <div><span style={{color:C.text}}>Arsitektur</span>: U-Net CNN</div>
            <div><span style={{color:C.text}}>Input</span>: Sentinel-2 10m/px</div>
            <div><span style={{color:C.text}}>Akurasi</span>: <span style={{color:C.accent,fontWeight:700}}>94.7%</span>/pixel</div>
            <div><span style={{color:C.text}}>Update</span>: Tiap 3 hari</div>
            <div><span style={{color:C.text}}>Training</span>: 12.000 tile gambut</div>
          </div>
          <div style={{marginTop:10,padding:"9px 12px",background:C.surface,borderRadius:8,fontSize:11,color:C.muted,border:`1px solid ${C.border}`}}>
            🌿 Sehat: <b style={{color:C.accent}}>{((counts.healthy||0)/total*100).toFixed(0)}%</b>
            {" · "}🔴 Kritis: <b style={{color:C.danger}}>{((counts.critical||0)/total*100).toFixed(0)}%</b>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── TAB: CARBON CREDIT ──────────────────────────────────── */
function CarbonCredit(){
  const [area,setArea]=useState(10000);
  const [depth,setDepth]=useState(2);
  const [status,setStatus]=useState("degraded");
  const [price,setPrice]=useState(25);
  const stored=area*CDENSITY[depth];
  const emission=area*ERATE[status];
  const credits=emission*.7;
  const value=Math.round(credits*price);

  return(
    <div className="content fade">
      <div className="g2">
        <div className="card">
          <div className="ctitle">💰 Carbon Credit Calculator</div>
          {[
            {lbl:"Luas Lahan Gambut (ha)",type:"number",val:area,set:setArea},
          ].map(f=>(
            <div className="cf" key={f.lbl}>
              <div className="clbl">{f.lbl}</div>
              <input type={f.type} className="cinp" value={f.val} min={1}
                onChange={e=>f.set(+e.target.value||0)}/>
            </div>
          ))}
          <div className="cf">
            <div className="clbl">Kedalaman Gambut</div>
            <select className="cinp" value={depth} onChange={e=>setDepth(+e.target.value)}>
              <option value={1}>Dangkal (&lt;1m) — 800 ton CO₂/ha</option>
              <option value={2}>Sedang (1–3m) — 2.000 ton CO₂/ha</option>
              <option value={3}>Dalam (&gt;3m) — 4.500 ton CO₂/ha</option>
            </select>
          </div>
          <div className="cf">
            <div className="clbl">Status Lahan</div>
            <select className="cinp" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="intact">Utuh / Pristine — 5 ton CO₂/ha/thn</option>
              <option value="degraded">Terdegradasi — 35 ton CO₂/ha/thn</option>
              <option value="restored">Dalam Restorasi BRGM — 12 ton CO₂/ha/thn</option>
            </select>
          </div>
          <div className="cf">
            <div className="clbl">Harga Karbon (USD/ton CO₂)</div>
            <select className="cinp" value={price} onChange={e=>setPrice(+e.target.value)}>
              <option value={10}>$10 — Pasar Sukarela Minimum</option>
              <option value={25}>$25 — IDXCarbon 2024</option>
              <option value={50}>$50 — Pasar Premium</option>
              <option value={100}>$100 — Target NDC 2030</option>
            </select>
          </div>
          <div className="cres">
            {[
              ["Karbon Tersimpan",stored.toLocaleString()+" ton CO₂"],
              ["Emisi Tahunan (jika dibiarkan)",emission.toLocaleString()+" ton CO₂/thn"],
              ["Kredit Terhindarkan/thn",Math.round(credits).toLocaleString()+" ton CO₂"],
              ["Proyeksi 10 Tahun","$"+(value*10).toLocaleString()],
            ].map(([l,v])=>(
              <div className="crow" key={l}><span>{l}</span><span>{v}</span></div>
            ))}
            <div className="ctotval">${value.toLocaleString()}</div>
            <div className="ctotlbl">Potensi Pendapatan Carbon Credit / Tahun</div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div className="card">
            <div className="ctitle">🏢 IDXCarbon — Bursa Karbon Indonesia</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.9}}>
              <div>📅 <b style={{color:C.text}}>Launch:</b> September 2023</div>
              <div>💹 <b style={{color:C.text}}>Harga:</b> Rp 60.000–85.000/ton CO₂</div>
              <div>🌏 <b style={{color:C.text}}>Standar:</b> VERRA · Gold Standard</div>
              <div>🏛 <b style={{color:C.text}}>Regulator:</b> OJK + KLHK</div>
              <div>📜 <b style={{color:C.text}}>Mekanisme:</b> REDD+ · Article 6 Paris Agreement</div>
            </div>
            <div className="info-strip" style={{marginTop:10}}>
              Akurasi AI dalam pemetaan karbon gambut membuka akses investasi asing
              melalui mekanisme perdagangan karbon internasional.
            </div>
          </div>
          <div className="card">
            <div className="ctitle">📚 Referensi Akademik</div>
            <div style={{fontSize:10,color:C.muted,lineHeight:1.9}}>
              <div>• IPCC (2014) Wetlands Supplement</div>
              <div>• Miettinen et al. (2016) Pan-tropical peatland</div>
              <div>• Murdiyarso et al. (2019) BRGM Restoration</div>
              <div>• BRG Indonesia (2023) Peta KHG Nasional</div>
              <div>• VERRA VM0036 — Peatland methodology</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ROOT ────────────────────────────────────────────────── */
const TABS = [
  {id:"warn",  icon:"🔥", label:"Early Warning"},
  {id:"water", icon:"💧", label:"Canal Blocking"},
  {id:"vision",icon:"🛰", label:"Computer Vision"},
  {id:"carbon",icon:"💰", label:"Carbon Credit"},
];

export default function App(){
  const [tab,setTab]=useState("warn");
  const [regions,setRegions]=useState(REGIONS.map(r=>({...r})));
  const [popup,setPopup]=useState(null);
  const svgRef=useRef();

  useInterval(()=>{
    setRegions(p=>p.map(r=>({...r,
      hs:Math.max(0,r.hs+Math.floor(Math.random()*3-1)),
      risk:Math.max(5,Math.min(98,r.risk+(Math.random()-.48)*2)),
    })));
  },3000);

  return(
    <>
      <style>{G}</style>
      {/* fixed header */}
      <header className="hdr">
        <div className="hdr-logo">🌿 PeatGuard</div>
        <div className="hdr-sub">Indonesia Peatland Intelligence Platform</div>
        <div className="hdr-right">
          <div className="ldot"/><span>LIVE</span>
        </div>
      </header>

      {/* full-viewport map */}
      <MapHero
        regions={regions}
        onHover={r=>setPopup(r?{r}:null)}
        popup={popup}
        svgRef={svgRef}
      />

      {/* sticky tabs + content */}
      <section className="tab-section">
        <nav className="tab-nav">
          {TABS.map(t=>(
            <button key={t.id} className={`nt${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        {tab==="warn"   && <EarlyWarning/>}
        {tab==="water"  && <WaterMgmt/>}
        {tab==="vision" && <CompVision/>}
        {tab==="carbon" && <CarbonCredit/>}
      </section>
    </>
  );
}
