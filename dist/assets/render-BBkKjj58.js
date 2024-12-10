import{f as b}from"./displayCredits-Cwctk-Y1.js";function x(n){return new URLSearchParams(window.location.search).get(n)}function L(n,t,o){const c=document.getElementById(t),a=document.getElementById(o);function i(){const r=new Date,e=new Date(n)-r;if(e<=0){c.textContent="Closed",c.classList.add("text-red-500","font-bold"),a&&(a.style.display="none"),clearInterval(l);return}const d=Math.floor(e/(1e3*60*60*24)),m=Math.floor(e%(1e3*60*60*24)/(1e3*60*60)),u=Math.floor(e%(1e3*60*60)/(1e3*60)),g=Math.floor(e%(1e3*60)/1e3);c.textContent=`${d}d ${m}h ${u}m ${g}s`}i();const l=setInterval(i,1e3)}function v(n){const t=document.getElementById("listings-container"),o=document.getElementById("pagination");if(!t){console.error("Listings container not found!");return}if(t.innerHTML="",!n||n.length===0){t.innerHTML=`<div class="text-gray-500 mt-6 text-lg">
      <p>No results match your search.</p>
    </div>`,o&&(o.style.display="none");return}o&&(o.style.display="flex"),n.forEach(c=>{const{id:a,title:i,media:l,bids:r,_count:e,created:d}=c,m=l.length>0?l[0].url:"/images/placeholderimage2.jfif",u=r?.length>0?r[r.length-1].amount:"0",f=new Date(d).toLocaleDateString(),s=`
      <div>
        <a href="/listing/?id=${a}">
          <img
            src="${m}"
            alt="${i}"
            class="rounded-lg w-full h-40 object-cover"
          />
        </a>
        <div class="mt-2 text-left">
          <a href="/listing/?id=${a}" class="hover:text-[#FFD700]">
            <h4 class="font-medium truncate">${i}</h4>
          </a>
          <div class="text-sm font-normal text-[#E4E2D7] flex items-center justify-left space-x-1">
            <span>Current Bid</span>
            <img
              src="/images/creditsIcon.svg"
              alt="coin icon"
              class="h-4 w-4"
            />
            <span>${u}</span>
          </div>
          <p class="text-sm text-gray-500">Participants: ${e?.bids||0}</p>
          <p class="text-sm text-gray-500">Listed on: ${f}</p>
        </div>
      </div>
    `;t.insertAdjacentHTML("beforeend",s)})}async function B(){const n=x("id");if(!n){console.error("No listing ID found in the URL.");return}const t=await b(n);if(!t){console.error("Listing not found.");return}document.title=t.data.title||"Listing Details";const o=document.querySelector('meta[name="description"]');if(o){const s=t.data.title||"This listing";o.setAttribute("content",`Bid on ${s} now! View bid history, check your credits, track listing expiration, and stay updated on your bid status.`)}const c=document.querySelector("#listing-title"),a=document.querySelector("#listing-description"),i=document.querySelector("#listing-image"),l=document.querySelector("#current-bid"),r=document.querySelector("#closing-in"),e=document.querySelector("#previous-bids"),d=document.querySelector("#bidButton"),m="/images/placeholderimage2.jfif";if(c.textContent=t.data.title||"No listing title",t.data.description){const s=t.data.description.split(".").filter(p=>p.trim()!==""),h=s.map((p,y)=>y===s.length-1?p.trim():`${p.trim()}.<br><br>`).join("");a.innerHTML=h}else a.textContent="No description provided.";i.src=t.data.media?.[0]?.url||"/images/placeholderimage2.jfif",i.alt=t.data.title||"Listing Image",i.onerror=()=>{i.src=m};const u=t.data.bids?.length>0?t.data.bids[t.data.bids.length-1].amount:"0";l.textContent=u;const g=new Date,f=new Date(t.data.endsAt);f<=g?(r.textContent="Closed",r.classList.add("text-red-500","font-bold"),d&&(d.style.display="none")):L(f,"closing-in","bidButton"),e.innerHTML="",t.data.bids?.length>0?t.data.bids.forEach(s=>{e.insertAdjacentHTML("beforeend",`<li><span class="font-semibold">${s.bidder.name||"Anonymous"} :</span> ${s.amount}</li>`)}):e.innerHTML="<li>No bids yet.</li>"}export{v as a,B as r};
