let allIssues = [];

function showLoading() {
    document.getElementById('grid').innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-12">
            <span class="loading loading-spinner loading-md text-[#4c00ff]"></span>
        </div>`;
}
async function loadData() {
    showLoading();
    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const result = await res.json();
        allIssues = result.data || result || []; 
        render(allIssues);
    } catch (error) {
        document.getElementById('grid').innerHTML = `<p class="col-span-full text-center py-10 text-red-500">Failed to load data.</p>`;
    }
}
function render(data) {
    const grid = document.getElementById('grid');
    const stats = document.getElementById('issueStats');
    if (stats) stats.innerText = `${data.length} Issues`;
    grid.innerHTML = '';

    data.forEach(item => {
        const status = item.status?.toLowerCase() || 'open';
        const isClosed = status === 'closed';

        const borderColor = isClosed ? 'border-t-[#A855F7]' : 'border-t-[#4ADE80]';
        const iconPath = isClosed 
            ? './assets/Closed- Status .png' 
            : './assets/Open-Status.png';

        const card = document.createElement('div');
        card.className = `bg-white p-6 rounded-xl border border-gray-100 border-t-4 ${borderColor} shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between`;
        card.onclick = () => showModalFromMemory(item._id);

        const displayId = item._id ? item._id.slice(-4) : "0000";

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-4">
                    <div class="w-6 h-6 flex items-center justify-center">
                        <img src="${iconPath}" alt="Status Icon" class="w-full h-full object-contain">
                    </div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-gray-400 uppercase tracking-tighter">${item.priority || 'MEDIUM'}</span>
                </div>
                <h3 class="font-bold text-gray-800 text-[15px] mb-2 line-clamp-2 leading-tight">${item.title || 'No Title'}</h3>
                <p class="text-[12px] text-gray-400 line-clamp-2 mb-4 leading-relaxed">${item.description || 'No description available.'}</p>
                <div class="flex gap-2">
                    <span class="text-[9px] font-bold px-2 py-1 bg-pink-50 text-pink-500 rounded flex items-center gap-1 uppercase">🪲 BUG</span>
                    <span class="text-[9px] font-bold px-2 py-1 bg-orange-50 text-orange-500 rounded flex items-center gap-1 uppercase"> HELP</span>
                </div>
            </div>
            <div class="pt-4 mt-6 border-t border-gray-50 text-[11px] text-gray-400 flex flex-col gap-1">
                <span>#${displayId} by ${item.author || 'Anonymous'}</span>
                <span>${item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}
function showModalFromMemory(id) {
    const item = allIssues.find(issue => issue._id === id);
    if (!item) return;

    const container = document.getElementById('details-container');
    const isClosed = item.status?.toLowerCase() === 'closed';
    const priorityColor = item.priority?.toLowerCase() === 'high' ? 'bg-red-500' : 'bg-orange-400';

    container.innerHTML = `
        <div class="p-10">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">${item.title}</h2>
            <div class="flex items-center gap-3 mb-6">
                <span class="${isClosed ? 'bg-purple-500' : 'bg-green-500'} text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                    ${isClosed ? 'Closed' : 'Opened'}
                </span>
                <span class="text-xs text-gray-400">
                    • Opened by <span class="text-gray-700 font-bold">${item.author}</span> 
                    • ${new Date(item.createdAt).toLocaleDateString('en-GB')}
                </span>
            </div>
            <div class="flex gap-2 mb-8">
                <span class="bg-pink-100 text-pink-500 text-[10px] font-bold px-3 py-1 rounded uppercase">🪲 BUG</span>
                <span class="bg-orange-100 text-orange-500 text-[10px] font-bold px-3 py-1 rounded uppercase">HELP WANTED</span>
            </div>
            <p class="text-gray-500 text-[14px] leading-relaxed mb-10">${item.description || "No description provided."}</p>
            <div class="bg-[#F8FAFC] p-6 rounded-2xl flex justify-between items-center border border-gray-100">
                <div>
                    <p class="text-[10px] text-gray-400 font-bold uppercase mb-1">Assignee</p>
                    <p class="font-bold text-gray-800 text-sm">${item.author}</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] text-gray-400 font-bold uppercase mb-1">Priority</p>
                    <span class="${priorityColor} text-white text-[10px] font-bold px-5 py-1.5 rounded-full uppercase">
                        ${item.priority || 'MEDIUM'}
                    </span>
                </div>
            </div>
        </div>`;
    document.getElementById('my_modal_5').showModal();
};

function filterIssues(status, btn) {
    const buttons = document.querySelectorAll('.tab-btn');
    
    buttons.forEach(b => {
        b.classList.remove('tab-active', 'bg-[#4c00ff]', 'text-white');
        b.classList.add('bg-transparent', 'text-gray-500');
    });

    btn.classList.add('tab-active', 'bg-[#4c00ff]', 'text-white');
    btn.classList.remove('bg-transparent', 'text-gray-500');
    showLoading();
    setTimeout(() => {
        const filtered = status === 'all' 
            ? allIssues 
            : allIssues.filter(i => i.status?.toLowerCase() === status);
        render(filtered);
    }, 200);
};
async function handleSearch() {
    const q = document.getElementById('searchInput').value;
    if (q === "") { render(allIssues); return; }
    showLoading();
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${q}`);
        const data = await res.json();
        render(data.data || []);
    } catch (error) { console.error(error); }
};

loadData();
