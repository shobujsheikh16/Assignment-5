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