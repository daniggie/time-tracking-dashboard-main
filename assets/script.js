// Coded By: DANIELA GROSS

const pullData = async () => {
    const response = await fetch('./data.json');
    const data = await response.json();

    return data;
};

function listCard(){
    const cardinfo = $('#cardinfo').html('');

    pullData()
        .then(data => {
            const cards = data.map(item => {
                const url = `./images/icon-${item.title.replace(' ', '-').toLowerCase()}.svg`;
                return `
                <div class="bg-${item.title.replace(' ', '-').toLowerCase()} container-card">
                    <div class="card-logo">
                        <img src="${url}" alt="">
                    </div>
                    <div class="card bg-light-blue p-2">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <b class="card-title m-0">${item.title}</b>
                                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
                                </svg>
                            </div>

                            <div class="card-text">                            
                                <h1 class="card-text" id="current${item.title.replace(' ', '_').toLowerCase()}">hrs</h1>
                                <small class="card-text" id="previous${item.title.replace(' ', '_').toLowerCase()}">Last Week - hrs</small>
                            </div>
                            

                        </div>
                    </div>
                </div>
            `;
            }).join('');

            cardinfo.append(cards);
        })
}

function listCardInfo(id) {
    $('#weekly').css("color", "hsl(235, 45%, 61%)");
    $('#daily').css("color", "hsl(235, 45%, 61%)");
    $('#monthly').css("color", "hsl(235, 45%, 61%)");
    $('#' + id).css("color", "#fff");
    
    pullData()
    .then(data => {
        function info(){ data.map(item => {
                var currentId = '#current'+ item.title.replace(' ', '_').toLowerCase();
                var previousId = '#previous' + item.title.replace(' ', '_').toLowerCase();

                const current = $(currentId).html('');
                const previous = $(previousId).html('');

                current.append(`${item.timeframes[id].current}hrs`);
                previous.append(`Last Week - ${item.timeframes[id].previous}hrs`);
            })
        }

        info();
    })
}

$(document).ready(() => {
    try {
        listCard();
        listCardInfo('weekly');
    } catch (err) {
        console.log('document.ready Catch Error', err);
    }
});