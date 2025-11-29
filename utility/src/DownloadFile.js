export function DownloadFile(filename, content) {
    const download = document.createElement("a");
    download.setAttribute("href", content);
    download.setAttribute("download", filename);
    document.body.appendChild(download);
    download.click();
    download.remove();
}
