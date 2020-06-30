let $title = $("#nameVal")
let $searchBtn = $("#searchBtn")

$searchBtn.click (() => {
    const Name = $title.val()
    console.log(Name)
})