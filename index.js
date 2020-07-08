let $title = $("#nameVal");
let $searchBtn = $("#searchBtn");

$searchBtn.click (() => {
    $("#resultList").empty();
    getMovieData(1)
})

function getMovieData(pageNumber){
    const name = $title.val();
    $.ajax({
        url : 'http://www.omdbapi.com/',
        type : 'GET',
        dataType:'json',
        data: $.param({ apikey: 'd8a727ad', s: name, page: pageNumber}),
        success : handleSearchData,
        error : handleApiError
    });
}

function handleSearchData(data) {
    let searchResults = data.Search;
    let totalRecords = data.totalResults;
    handlePagination(totalRecords);
    searchResults.forEach(handleSingleSearchresult);
}
function handleApiError(request,error) {

}
function handleSingleSearchresult(result) {
    let $iconString;
    if (result.Type=="movie"){
        result.Type = "Movie"
        $iconString = "fa-film"

    }else if(result.Type=="series"){
        result.Type = "Series"
        $iconString = "fa-tv"
    }
    else {
        result.Type = "Game"
        $iconString = "fa-gamepad"
    }
    result.Icon = $iconString;

    if(result.Poster == "N/A"){
        result.Poster = "/Users/karankatyal/Documents/WebDev/jQuery-Api-Sample/Images/No-Image-Available.png"
    }
    $.tmpl($("#displaytemplate"),result ).appendTo("#resultList");
}

function handlePagination(totalRecords){
    let $pageNumber;
    if(totalRecords%10 == 0)
    $pageNumber = totalRecords/10;
    else{
        $pageNumber = Math.ceil(totalRecords/10)
    }
    for(let i=1; i<= $pageNumber; i++){
        var pageNumber = { "page"  : i};
        $.tmpl($("#paginationTemplate"),pageNumber ).appendTo("#paginationDiv");
    }
}
function pageClick(pageNumber){
    $("#resultList").empty();
    $("#paginationDiv").empty();
    getMovieData(pageNumber);
}


function detailsClick(id){
    window.open("detailsPage.html?imdbId="+id)

}