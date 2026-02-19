document.addEventListener("DOMContentLoaded", function() {
    const info = document.querySelector('#info');
    info.innerHTML = `<span id='title'></span><br>
        <span id='media'></span><br>
        <div id='btn'> <button id='url_btn'> </button> <button id='web_btn'> </button> </div><br>
        <span id='message'></span><br>
        <span id='copyright'></span><br>
        <span id='explanation'></span><br>`
    
    
    const dateInput = document.querySelector('#date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
    dateInput.value = today;

    document.querySelector('#date').addEventListener('change', () => {
        let newDate = document.querySelector('#date');
        normal(`&date=${newDate.value}`);
    })

    document.querySelector('#random').addEventListener('click', () => {
        normal('&count=1')
    })

    normal();
          
    
});

function normal(main_para = '') {
    let title = info.querySelector('#title');
    let media = info.querySelector('#media');
    let message = info.querySelector('#message');
    let exp = info.querySelector('#explanation');
    let btn = info.querySelector('#btn');
    let url_btn = info.querySelector('#url_btn');
    let web_btn = info.querySelector('#web_btn');
    let copyright = info.querySelector('#copyright');
    title.style.display = 'block';
    media.style.display = 'block';
    message.style.display = 'block';
    exp.style.display = 'block';
    copyright.style.display = 'block';
    copyright.style.textAlign = 'center';
    copyright.style.fontSize = '40px';
    exp.style.padding = '5px 50px';
    exp.style.fontSize = '35px';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'center';
    btn.style.flexDirection = 'row';
    url_btn.style.display = 'none';
    url_btn.style.marginRight = '50px';
    url_btn.style.textDecoration = 'none';
    url_btn.style.fontSize = '30px';
    url_btn.style.backgroundColor = 'green';
    url_btn.style.border = '1px black solid';
    url_btn.style.borderRadius = '10px';
    url_btn.style.padding = '8px';
    web_btn.style.marginLeft = '50px';
    web_btn.style.textDecoration = 'none';
    web_btn.style.fontSize = '30px';
    web_btn.style.backgroundColor = 'green';
    web_btn.style.border = '1px black solid';
    web_btn.style.borderRadius = '10px';
    web_btn.style.padding = '8px';
    media.style.textAlign = 'center';
    
    title.style.textAlign = 'center';
    title.style.fontSize = '50px';

    fetch(`https://api.nasa.gov/planetary/apod?api_key=LjfoUj2eYZ8zDxmo2hIAuuMkhmhJ7qPfFIa2xqk8${main_para}`)
    .then(response => response.json())
    .then(result => {
        if (main_para === '&count=1'){
            result =  result[0] 
            document.querySelector('#date').value = result.date
        }
        let date_ui = document.querySelector('#date').value
        let apod_link = `https://apod.nasa.gov/apod/ap${date_ui.substring(2,4)}${date_ui.substring(5,7)}${date_ui.substring(8,10)}.html`
        web_btn.innerHTML = `<a href='${apod_link}' target=_blank style="text-decoration: none; color: white;">APOD WEBSITE LINK</a>`
        
        title.innerHTML = result.title;
        exp.innerHTML = result.explanation;
        if (result.copyright){
            
            copyright.innerHTML = `Copyright: <strong>${result.copyright}</strong>`;
        }
        else {
            copyright.style.display = 'none';
        }
        console.log(result);
        if (result.media_type === "image") {
            url_btn.style.display = 'block';
            
            
            url_btn.innerHTML = `<a href='${result.hdurl}' target=_blank style="text-decoration: none; color: white;">HD MEDIA</a>`
            media.innerHTML = `<img id='image' src='${result.url}'>`;
            
        }
        if (result.media_type === "video") {
            media.innerHTML = `<iframe src="${result.url}" width="640" height="360" allowfullscreen> </iframe>`;
            message.innerHTML = `If the above media is not visible click <a href='${result.url}' target=_blank>here</a> to get redirected.`
        }
        if (result.media_type === "other") {
            media.innerHTML = `Other mmedia  type. <br> Click <a href='${apod}'>here</a> to visit official APOD website`
        }
    });
}