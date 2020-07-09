const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const imdbId = urlParams.get('imdbId')



function getMovieDetails(){
    let id = imdbId
    $.ajax({
        url : 'http://www.omdbapi.com/',
        type : 'GET',
        dataType:'json',
        data: $.param({ apikey: 'xxxxxxxx',i:id , Plot: 'full'}), // 'xxxxxxxx' use your OMDb Api key
        success : handleDetailData,
        error : handleDetailApiError
    });
}
function handleDetailData(detailData) {
    if(detailData.Poster == "N/A"){
        detailData.Poster = "/Users/karankatyal/Documents/WebDev/jQuery-Api-Sample/Images/No-Image-Available.png"
    }
    $.tmpl($("#detailsTemplate"),detailData ).appendTo("#detailsDiv");
}
function handleDetailApiError(request,error) {

}