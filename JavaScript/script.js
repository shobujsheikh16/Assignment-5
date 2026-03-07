let allIssues = [];

function showLoading() {
    document.getElementById('grid').innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-12">
            <span class="loading loading-spinner loading-md text-[#4c00ff]"></span>
        </div>`;
}