
let fuckSystem = {
    "expiryData": {},
    "paymentData": {},
    "meanExpiryLength": {}
}
let defultLimits = {
    expiryDateLimit: 60,
    paymentDateLimit: 15,
}


let limits = JSON.parse(localStorage.getItem("limits"))

if (!limits) {
    localStorage.setItem("limits", JSON.stringify(defultLimits));
    limits = defultLimits
}

function renderExpiryChart(data, limit) {
    console.log(data);
    console.log("limit", limit);
    const slicedData = data.result.slice(-limit)
    console.log(slicedData);

    const dateValues = Array.from(slicedData.map(item => item.date))
    const totalValues = Array.from(slicedData.map(item => item.total))
    var totalByTraffic = Array.from(slicedData.map(item => item.by_traffic))
    var totalByDate = Array.from(slicedData.map(item => item.by_date))

    /////////////mychart////////////////////////////////
    var label = document.querySelector(".label");
    var c = document.getElementById("myChart");
    console.log('chart:', c);
    var ctx = c.getContext("2d");
    var cw = c.width = 700;
    var ch = c.height = 350;
    var cx = cw / 2,
        cy = ch / 2;
    var rad = Math.PI / 180;
    var frames = 0;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#999";
    ctx.fillStyle = "#ccc";
    ctx.font = "14px monospace";


    var gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(81,66,200,1)')
    gradient.addColorStop(1, 'rgba(0,0,0,1)')


    var gradient1 = ctx.createLinearGradient(0, 0, 0, 400)
    gradient1.addColorStop(0, 'rgba(102,162,122,1) ')
    gradient1.addColorStop(1, 'rgba(0,0,0,1)')


    new Chart("myChart", {
        type: "line",
        data: {
            labels: dateValues,
            datasets: [

                {
                    label: 'Values',
                    lineTension: 0.4,
                    backgroundColor: gradient,
                    borderColor: "rgba(65,105,225)",
                    data: totalValues
                },
                {
                    label: 'ByDate',
                    lineTension: 0.4,
                    // backgroundColor: gradient1,
                    borderColor: "#008B8B",
                    data: totalByDate
                },
                {
                    label: 'ByTraffic',
                    lineTension: 0.4,
                    // backgroundColor: "green",
                    borderColor: "rgba(255,20,147)",
                    data: totalByTraffic
                }

            ]
        },
        options: {
            legend: { display: true },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        maxTicksLimit: 15,
                        autoSkip: false,
                        callback: function(value, index, values) {                            
                            if (values.length > this.options.ticks.maxTicksLimit) {
                                if (index === 0 || index === values.length - 1) {
                                    return value;
                                }

                                const skipRatio = Math.ceil(values.length / this.options.ticks.maxTicksLimit);
                                if (index % skipRatio !== 0) {
                                    return null;
                                }
                            }
                          
                            return value;
                          }
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            },
            bezierCurve: true
        }


    });
}


function getStats(uri, data = {}) {
    const baseUrl = "https:"
    const url = baseUrl + uri
    console.log(url);

    // let data = null;
    return axios({
        method: "GET",
        url: url,
        headers: {
            "Authorization": "80",
        },
        params: data,
    });

}

window.onload = () => {
    getStats("/vpn/expiry-count-by-date/", data = { "limit": limits.expiryDateLimit }).then((res) => {
        const expiryData = res.data;
        fuckSystem.expiryData = expiryData;
        renderExpiryChart(expiryData, limit = limits.expiryDateLimit);
    })

}

// let i = 7
// let interval = setInterval(
// () => {
//     if (i >= 30) {
//         clearInterval(interval)
//     }
//     limits.expiryDateLimit = i
//     localStorage.setItem("limits", JSON.stringify(limits))
//     renderExpiryChart(fuckSystem.expiryData, limits.expiryDateLimit)
//     i++
// },
// 1000
// )

let btnExpiryData = document.getElementById("expiry-date");
btnExpiryData.addEventListener("click", () => {
    limits.expiryDateLimit = 7
    localStorage.setItem("limits", JSON.stringify(limits))
    renderExpiryChart(fuckSystem.expiryData, limits.expiryDateLimit)
})

let restBtn = document.getElementById('rest');
restBtn.addEventListener("click", () => {
    let chooseDay = document.getElementById("chooseDay").value;
    if (parseInt(chooseDay) > fuckSystem.expiryData.result.length) {
        getStats("/vpn/expiry-count-by-date/", data = { "limit": chooseDay }).then((res) => {
            const expiryData = res.data;
            fuckSystem.expiryData = expiryData;
            limits.expiryDateLimit = chooseDay
            localStorage.setItem("limits", JSON.stringify(limits))
            renderExpiryChart(fuckSystem.expiryData, limits.expiryDateLimit)
        })
    } else {
        limits.expiryDateLimit = chooseDay
        localStorage.setItem("limits", JSON.stringify(limits))
        renderExpiryChart(fuckSystem.expiryData, limits.expiryDateLimit)
    }

})


/////////////////////////////////


