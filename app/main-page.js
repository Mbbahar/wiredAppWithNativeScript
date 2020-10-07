const fromObject = require("tns-core-modules/data/observable").fromObject;

function onNavigatingTo(args) {
    const page = args.object;

    return fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.wired.com%2Ffeed%2Fcategory%2Fbusiness%2Flatest%2Frss&api_key=64tr8loimqyl4sp4d8mucntcpuil5zxgynusbgf3&order_dir=desc&count=5"
    )
        .then((response) => response.json())
        .then((response) => {
            const vm = fromObject({ myTitles: response.items });
            page.bindingContext = vm;

            getAPI(JSON.stringify(response.items));

            //console.log(findMostReaptedWord(JSON.stringify(response.items)));
            //console.log(JSON.stringify(response.items));
        })
        .catch((err) => console.log(err));
}
exports.onNavigatingTo = onNavigatingTo;

function getAPI(list) {
    //console.log(list);
    fetch(
        "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                "x-rapidapi-key": "your-api-key",
            },
            body: {
                from: "en",
                text: "Hello World",
                to: "tr",
            },
        }
    )
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
}
exports.getAPI = getAPI;

function onListViewLoaded(args) {
    const listView = args.object;
}
exports.onListViewLoaded = onListViewLoaded;

function findMostReaptedWord(str) {
    var counts = {},
        mr,
        mc;
    str.match(/\w+/g).forEach(function (w) {
        counts[w] = (counts[w] || 0) + 1;
    });
    for (var w in counts) {
        if (!(counts[w] < mc)) {
            mc = counts[w];
            mr = w;
        }
    }
    return mr;
}
exports.findMostReaptedWord = findMostReaptedWord;

function onItemTap(args) {
    const index = args.index;
    const button = args.object;
    const page = button.page;

    return fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.wired.com%2Ffeed%2Fcategory%2Fbusiness%2Flatest%2Frss&api_key=64tr8loimqyl4sp4d8mucntcpuil5zxgynusbgf3&order_dir=desc&count=5"
    )
        .then((response) => response.json())
        .then((response) => {
            //console.log(response.items)

            console.log(args.index);

            for (i = 0; i <= index + 1; i++) {
                if (i == index) {
                    //console.log(response.items[i].link)
                    let url = response.items[i].link;
                    console.log(url);

                    var navigationOptions = {
                        moduleName: "details",
                        context: { param1: url },
                    };
                    page.frame.navigate(navigationOptions);
                }
            }
        })
        .catch((err) => console.log(err));
}
exports.onItemTap = onItemTap;
