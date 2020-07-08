const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const imdbId = urlParams.get('imdbId')
console.log(imdbId)

function getMovieDetails(){
    let id = imdbId
    $.ajax({
        url : 'http://www.omdbapi.com/',
        type : 'GET',
        dataType:'json',
        data: $.param({ apikey: 'd8a727ad',i:id , Plot: 'full'}),
        success : handleDetailData,
        error : handleDetailApiError
    });
}
function handleDetailData(detailData) {
    console.log(detailData)
    $.tmpl($("#detailsTemplate"),detailData ).appendTo("#detailsDiv");
}
function handleDetailApiError(request,error) {

}