document.addEventListener("DOMContentLoaded", function() {
    const viz1 = document.getElementById('viz1');
    const viz2 = document.getElementById('viz2');
    const viz3 = document.getElementById('viz3');
    if (viz1 ){
        new Chart(viz1, {
        type: 'pie',
        data: {
            labels: ['Youtube', 'Vimeo', 'Others'],
            datasets: [{
                label: 'Platform Count',
                data: [317, 46, 16],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Sources of videos'
                }
            }
        }
    });

    new Chart(viz2, {
        type: 'pie',
        data: {
            labels: ['Image', 'Video', 'Others'],
            datasets: [{
                label: 'Platform Count',
                data: [6499, 379, 10],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Media percent'
                }
            }
        }
    });

    new Chart(viz3, {
        type: 'pie',
        data: {
            labels: ['Video', 'Image'],
            datasets: [{
                label: 'Count',
                data: [41, 22],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Entries More than once'
                }
            }
        }
    });

        new Chart(viz4, {
        type: 'line',
        data: {
            labels: [ 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 26, 27, 29, 37, 40, 50, 53, 54],
            datasets: [{
                label: 'Frequency of Copyright Counts',
                data: [ 20, 22, 16, 8, 5, 6, 4, 2, 4, 3, 3, 3, 4, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
                tension: 0.1, 
                pointRadius: 2.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Copyright Count' },
                    ticks: { maxTicksLimit: 30 }
                },
                y: {
                    title: { display: true, text: 'Number of Occurrences' }
                }
            }
        }
    });

        new Chart(viz5, {
        type: 'bar',
        data: {
            labels: [2, 3, 4, 5], // Only use the labels you have data for
            datasets: [{
                label: 'Video Occurrences',
                data: [29, 10, 2, 0],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Number of Times Entry Appeared' } },
                y: { title: { display: true, text: 'Count of Unique Videos' }, beginAtZero: true }
            }
        }
    });
    new Chart(viz6, {
        type: 'bar',
        data: {
            labels: [2, 3],
            datasets: [{
                label: 'Image Occurrences',
                data: [22, 0],
                borderColor: '#fd0d0d', 
                backgroundColor: 'rgba(253, 13, 13, 0.1)', 
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Number of Times Entry Appeared' } },
                y: { title: { display: true, text: 'Count of Unique Images' }, beginAtZero: true }
            }
        }
    });


    }
    


    const info = document.querySelector('#info');
    info.innerHTML = `<span id='title'></span><br>
        <div id='media_div'><button id='prev_btn'> < </button><span id='media_pic'></span><button id = 'next_btn'> > </button></div><br>
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

    document.querySelector('#next_btn').addEventListener('click', () => {
        let nowDate = new Date(document.querySelector('#date').value);
        nowDate.setDate(nowDate.getDate() + 1);
        nowDate = nowDate.toISOString().split('T')[0];
        
        if (nowDate <= dateInput.max) {
            dateInput.value = nowDate;
            normal(`&date=${nowDate}`);
        }
        else {
            alert(`Check out tomorrow...`);
        }
        
    })

    document.querySelector('#prev_btn').addEventListener('click', () => {
        let nowDate = new Date(document.querySelector('#date').value);
        nowDate.setDate(nowDate.getDate() - 1);
        nowDate = nowDate.toISOString().split('T')[0];
        
        if (nowDate >= dateInput.min){
            dateInput.value = nowDate;
            normal(`&date=${nowDate}`);
        }
        else{
            alert('Data dont exist...');
        }
        
    })

    normal();
          
    
});

function normal(main_para = '') {
    let title = info.querySelector('#title');
    let media = info.querySelector('#media_div');
    let media_pic = info.querySelector('#media_pic');
    let prev_btn = info.querySelector('#prev_btn');
    let next_btn = info.querySelector('#next_btn');
    let message = info.querySelector('#message');
    let exp = info.querySelector('#explanation');
    let btn = info.querySelector('#btn');
    let url_btn = info.querySelector('#url_btn');
    let web_btn = info.querySelector('#web_btn');
    let copyright = info.querySelector('#copyright');
    title.style.display = 'block';
    media.style.display = 'flex';
    media.style.flexDirection = 'row';
    media.style.justifyContent = 'center';
    media.style.alignItems = 'center';
    media.style.width = '100%';
    media.style.gap = '5%';
    prev_btn.style.border = 'none';
    prev_btn.style.backgroundColor = 'inherit';
    prev_btn.style.borderRadius = '50%';
    prev_btn.style.fontSize = '100px';
    next_btn.style.border = 'none';
    next_btn.style.backgroundColor = 'inherit';
    next_btn.style.borderRadius = '50%';
    next_btn.style.fontSize = '100px';
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

    title.style.textAlign = 'center';
    title.style.fontSize = '50px';

    prev_btn.addEventListener('mouseenter', () => {
        prev_btn.style.backgroundColor = 'grey';
    })
    prev_btn.addEventListener('mouseleave', () => {
        prev_btn.style.backgroundColor = 'inherit';
    })

    next_btn.addEventListener('mouseenter', () => {
        next_btn.style.backgroundColor = 'grey';
    })
    next_btn.addEventListener('mouseleave', () => {
        next_btn.style.backgroundColor = 'inherit';
    })

    fetch(`https://api.nasa.gov/planetary/apod?api_key=LjfoUj2eYZ8zDxmo2hIAuuMkhmhJ7qPfFIa2xqk8${main_para}`)
    .then(response => response.json())
    .then(result => {
        if (main_para === '&count=1'){
            result =  result[0] 
            document.querySelector('#date').value = result.date
        }
        let date_ui = document.querySelector('#date').value
        let apod_link = `https://apod.nasa.gov/apod/ap${date_ui.substring(2,4)}${date_ui.substring(5,7)}${date_ui.substring(8,10)}.html`
        web_btn.innerHTML = `<a href='${apod_link}' target=_blank style="text-decoration: none; color: white;">APOD WEBSITE</a>`
        
        title.innerHTML = result.title;
        exp.innerHTML = result.explanation;
        if (result.copyright){
            
            copyright.innerHTML = `Copyright: <strong>${result.copyright}</strong>`;
        }
        else {
            copyright.style.display = 'none';
        }
        if (result.media_type === "image") {
            url_btn.style.display = 'block';
            
            
            url_btn.innerHTML = `<a href='${result.hdurl}' target=_blank style="text-decoration: none; color: white;">HD MEDIA</a>`
            media_pic.innerHTML = `<img id='image' src='${result.url}' style="max-width: 75vw; height: auto; ">`;
            
        }
        if (result.media_type === "video") {
            media_pic.innerHTML = `<iframe src="${result.url}" width="640" height="360" allowfullscreen> </iframe>`;
        }
        if (result.media_type === "other") {
            media_pic.innerHTML = `Other mmedia  type. <br> Click <a href='${apod}'>here</a> to visit official APOD website`
        }
    });
}