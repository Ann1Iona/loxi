var reference = [
    "Nikitka",
            "Vlad",
            "Ilya",
            "NikitaK",
            "GoshaA",
            "GoshaK",
            "German",
            "Alesha",
            "Sanya",
            "Kolya",
            "Egor",
            "Danya",
  ];
  
   let queryString = decodeURIComponent(window.location.search.slice(1).split("&")[0].split("=")[1])
        let indices = JSON.parse(queryString)

var characters = []
    for(var i = 0; i<indices.length;i++){
              characters.push(reference[indices[i]])
              $("#results").append('<div class="result"><span>'+(i+1)+'</span><img src= Images/'+characters[i].replace(/ /g, "_")+'.jpg></div>')  
    }

var imageList = true;

$("#list_version").on("click", changeListVersion)
$("#copy").on("click", copy)
    function changeListVersion(){
        if(imageList){
                $("#results div").remove();
                var table = $("<table>", { id: "list" });
                $("#list_version").html("Click Here for Image Version of List")
                for ( var i = 0; i < characters.length; i++)
                        $(table).append('<tr> <div class="rank">'+ (i+1)+'. </div><div class="name">'+characters[i]+'</div> </tr>') 
                $("#results").append(table)
            }
        else{
                    $("#results table").remove();
                    $("#list_version").html("Click Here for Text Version of List")
                    for(var i = 0; i<characters.length;i++)
                         $("#results").append('<div class="result"><span>'+(i+1)+'</span><img src= Images/'+characters[i].replace(/ /g, "_")+'.jpg></div>') 
                }
                imageList= !imageList;
}
function copy(){
        var str= ""
        for ( var i = 0; i < characters.length; i++)
            str+= ((i+1) + ". " + characters[i] +"\n")
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }