let $title = $("#nameVal");
let $searchBtn = $("#searchBtn");



$searchBtn.click (() => {
    $("#target").empty();
    const name = $title.val();
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
    let searchResults = data.Search;
    searchResults.forEach(handleSingleSearchresult);
}

function handleApiError(request,error) {

}

function handleSingleSearchresult(result) {
    console.log("Incoming Result" ,result);
    let $iconString;
    if (result.Type=="movie"){
        $iconString = "fa-film"

    }else if(result.Type=="series"){
        $iconString = "fa-tv"
    }
    else {
        $iconString = "fa-gamepad"
    }
    result.Icon = $iconString;
    console.log("Result for Template", result);
    $.tmpl($("#template"),result ).appendTo("#target");
}