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
            ? 'B13-A5-Github-Issue-Tracker/assets/Closed- Status .png' 
            : 'B13-A5-Github-Issue-Tracker/assets/Open-Status.png';

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
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-50 text-gray-400 uppercase tracking-tighter">${item.priority || 'MEDIUM'}</span>
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