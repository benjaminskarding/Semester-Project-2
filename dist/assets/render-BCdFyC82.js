import{b as y}from"./displayCredits-BS7b_FIx.js";function b(e){return new URLSearchParams(window.location.search).get(e)}function x(e,t,s){const a=document.getElementById(t),n=document.getElementById(s);function r(){const o=new Date,i=new Date(e)-o;if(i<=0){a.textContent="Closed",a.classList.add("text-red-500","font-bold"),n&&(n.style.display="none"),clearInterval(c);return}const d=Math.floor(i/(1e3*60*60*24)),m=Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),u=Math.floor(i%(1e3*60*60)/(1e3*60)),g=Math.floor(i%(1e3*60)/1e3);a.textContent=`${d}d ${m}h ${u}m ${g}s`}r();const c=setInterval(r,1e3)}function v(e){const t=document.getElementById("listings-container"),s=document.getElementById("pagination");if(!t){console.error("Listings container not found!");return}if(t.innerHTML="",!e||e.length===0){t.innerHTML=`<div class="text-gray-500 mt-6 text-lg">
      <p>No results match your search.</p>
    </div>`,s&&(s.style.display="none");return}s&&(s.style.display="flex"),e.forEach(a=>{const{id:n,title:r,media:c,bids:o,_count:i,created:d}=a,m=c.length>0?c[0].url:"/images/placeholderimage2.jfif",u=o?.length>0?o[o.length-1].amount:"0",l=new Date(d).toLocaleDateString(),p=`
      <div>
        <a href="/listing/?id=${n}">
          <img
            src="${m}"
            alt="${r}"
            class="rounded-lg w-full h-40 object-cover"
          />
        </a>
        <div class="mt-2 text-left">
          <a href="/listing/?id=${n}" class="hover:text-[#FFD700]">
            <h4 class="font-medium truncate">${r}</h4>
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
          <p class="text-sm text-gray-500">Participants: ${i?.bids||0}</p>
          <p class="text-sm text-gray-500">Listed on: ${l}</p>
        </div>
      </div>
    `;t.insertAdjacentHTML("beforeend",p)})}async function w(){const e=b("id");if(!e){console.error("No listing ID found in the URL.");return}const t=await y(e);if(!t){console.error("Listing not found.");return}document.title=t.data.title||"Listing Details";const s=document.querySelector("#listing-title"),a=document.querySelector("#listing-description"),n=document.querySelector("#listing-image"),r=document.querySelector("#current-bid"),c=document.querySelector("#closing-in"),o=document.querySelector("#previous-bids"),i=document.querySelector("#bidButton"),d="/images/placeholderimage2.jfif";if(s.textContent=t.data.title||"No listing title",t.data.description){const l=t.data.description.split(".").filter(f=>f.trim()!==""),p=l.map((f,h)=>h===l.length-1?f.trim():`${f.trim()}.<br><br>`).join("");a.innerHTML=p}else a.textContent="No description provided.";n.src=t.data.media?.[0]?.url||"/images/placeholderimage2.jfif",n.alt=t.data.title||"Listing Image",n.onerror=()=>{n.src=d};const m=t.data.bids?.length>0?t.data.bids[t.data.bids.length-1].amount:"0";r.textContent=m;const u=new Date,g=new Date(t.data.endsAt);g<=u?(c.textContent="Closed",c.classList.add("text-red-500","font-bold"),i&&(i.style.display="none")):x(g,"closing-in","bidButton"),o.innerHTML="",t.data.bids?.length>0?t.data.bids.forEach(l=>{o.insertAdjacentHTML("beforeend",`<li><span class="font-semibold">${l.bidder.name||"Anonymous"} :</span> ${l.amount}</li>`)}):o.innerHTML="<li>No bids yet.</li>"}export{w as a,v as r};
