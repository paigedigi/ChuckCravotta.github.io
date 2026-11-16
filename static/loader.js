// Loads rows from a published Google Sheet (CSV). Falls back to data.js if no link is set or it fails.
function parseCSV(text){
  const rows=[]; let row=[], f="", q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(q){
      if(c==='"'){ if(text[i+1]==='"'){f+='"';i++;} else q=false; }
      else f+=c;
    } else if(c==='"') q=true;
    else if(c===','){row.push(f);f="";}
    else if(c==='\n'||c==='\r'){ if(c==='\r'&&text[i+1]==='\n')i++; row.push(f);f=""; rows.push(row); row=[]; }
    else f+=c;
  }
  if(f!==""||row.length){row.push(f);rows.push(row);}
  return rows;
}
function csvToObjects(text){
  const rows=parseCSV(text).filter(r=>r.some(c=>c.trim()!==""));
  if(!rows.length) return [];
  const head=rows[0].map(h=>h.trim().toLowerCase());
  return rows.slice(1).map(r=>{const o={}; head.forEach((h,i)=>o[h]=(r[i]||"").trim()); return o;});
}
function loadRows(url, fallback, requiredField){
  const use=rows=>rows.filter(r=>r[requiredField]);
  if(!url) return Promise.resolve(use(fallback||[]));
  return fetch(url,{cache:"no-cache"}).then(r=>{ if(!r.ok) throw new Error(r.status); return r.text(); })
    .then(t=>{ const rows=use(csvToObjects(t)); if(!rows.length) throw new Error("empty"); return rows; })
    .catch(e=>{ console.warn("Could not load Google Sheet, using built-in list:",e); return use(fallback||[]); });
}
