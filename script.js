
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
    var totalBy_traffic = Array.from(slicedData.map(item => item.by_traffic))
    var totalBy_date = Array.from(slicedData.map(item => item.by_date))

    document.getElementById("expiry-date-charts").innerHTML = `<canvas id="myChart" style="width:100%;max-width:60%"></canvas>`

    new Chart("myChart", {
        type: "line",
        data: {
            labels: dateValues,
            datasets: [

                {
                    label: 'Values',
                    lineTension: 0.3,
                    backgroundColor: "rgb(0 117 255 / 20%)",
                    borderColor: "rgba(0,0,255)",
                    data: totalValues
                },
                {
                    label: 'ByDate',
                    lineTension: 0.3,
                    // backgroundColor: "red",
                    borderColor: "#009432",
                    data: totalBy_date
                },
                {
                    label: 'ByTraffic',
                    lineTension: 0.3,
                    // backgroundColor: "green",
                    borderColor: "rgba(255,0,0)",
                    data: totalBy_traffic
                }

            ]
        },
        options: {
            legend: { display: true },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
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
    const baseUrl = "https.........."
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
    getStats("/vpn//", data = { "limit": limits.expiryDateLimit }).then((res) => {
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