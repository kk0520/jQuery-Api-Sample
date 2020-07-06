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
    let totalRecords = data.totalResults;
    handlePagination(totalRecords);
    searchResults.forEach(handleSingleSearchresult);


}

function handleApiError(request,error) {

}

function handleSingleSearchresult(result) {
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
    $.tmpl($("#displaytemplate"),result ).appendTo("#resultList");
}

function handlePagination(totalRecords){
    let $pageNumber;
    if(totalRecords%10 == 0)
    $pageNumber = totalRecords/10;
    else{
        $pageNumber = Math.ceil(totalRecords/10)
    }
    console.log($pageNumber);
    for(let i=1; i<= $pageNumber; i++){
        var pageNumber = { "page"  : i};
        $.tmpl($("#paginationTemplate"),pageNumber ).appendTo("#paginationDiv");
    }
}