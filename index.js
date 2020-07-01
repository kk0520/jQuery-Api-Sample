let $title = $("#nameVal");
let $searchBtn = $("#searchBtn");



$searchBtn.click (() => {
    const name = $title.val();
    console.log(name)
    $.ajax({
        url : 'http://www.omdbapi.com/',
        type : 'GET',
        dataType:'json',
        data: $.param({ apikey: 'd8a727ad', s: name }),
        success : handleSearchData,
        error : handleApiError
    });
})

function handleSearchData(data) {
    //console.log("Data", data.Search);
    let searchResults = data.Search;
    // for(d in data.Search) {
    //     console.log(data.Search[d].Title);
    // }
    searchResults.forEach(handleSingleSearchresult);
}

function handleApiError(request,error) {

}

function handleSingleSearchresult(result) {
    console.log("Title : ", result.Title);
}