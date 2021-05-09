$(function(){
    var characters;
    var biased = ["Ilya", "Sanya", "German", "Danya", "NikitaK", "Vlad", "Nikitka"]

var pivot_options = ["Egor", "GoshaK", "GoshaA", "Alesha", "Kolya"]                 
   

    var indices = []
    var history = []
    var images = {}
    var quick = false;
    var i = 0
    var j = 1
    
    init();
    $("#quick").on("click",function(){
        $("#intro").css("display", "none")
        $("#characterSorter").css("display", "block")
        quick=true;
    })
    $("#all").on("click",function(){
        $("#intro").css("display", "none")
        $("#characterSorter").css("display", "block")
    })
    $("#left").on("click",function(){
        history.push({left: i, right: j, swap: false})
        if(j==indices[0].end)
          split()
        else
             $("#right").attr("src", images[characters[++j]].src)
    })

    $("#right").on("click",function(){
        swap(++i,j)
        history.push({ left: i, right: j, swap: true})
        if(j==indices[0].end)
            split()
       else
            $("#right").attr("src", images[characters[++j]].src)
    })
    $("#back").on("click",function(){
        if (history.length==0) 
            return;
       last = history.pop();
       if(last.oldCharacters) characters = last.oldCharacters
       if (last.swap){
           if(last.indices){
                indices = last.indices
                last = history.pop();
                i = last.left
                j = last.right
                swap(i, indices[0].pivot)
                if (last.swap){
                    swap(i, j)
                    i--;
                    }         
                
                $("#left").attr("src", images[characters[indices[0].pivot]].src)
                $("#right").attr("src", images[characters[j]].src)
                return
           }
           swap(last.left, last.right)
           i--;
       }
       $("#right").attr("src", images[characters[--j]].src)
       
    })
     function swap(i,j){
         if(i!=j){
        var temp = characters[i]
        characters[i]=characters[j]
        characters[j]=temp}
     }
     function shuffle(arr) {
        var j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
    }
     function split(){
        var old = []
        for (x = 0;  x < indices.length; x++)
             old.push(indices[x])

        let oldCharacters = quick ? characters :  null;
        history.push({swap: true, indices: old, oldCharacters})
        swap(indices[0].pivot, i)

        if(indices[0].pivot!=(i-1) && indices[0].pivot!=i)
          indices.push({pivot:indices[0].pivot, end:i-1,})
        if(indices[0].end!=(i+1) && indices[0].end!=i ){
        if(quick){
          if(i <10)
             indices.push({pivot:i+1, end:indices[0].end})
          else
             characters = characters.slice(0,i)
        }
        else
            indices.push({pivot:i+1, end:indices[0].end})
        }
        indices.shift()
        if(indices.length==0){
            showResults()
            return
        }
        i= indices[0].pivot
        j = i + 1
        $("#left").attr("src", images[characters[i]].src)
        $("#right").attr("src", images[characters[j]].src)
    }
     function init(){
        shuffle(pivot_options)
        var pivot = pivot_options.pop()
        characters = biased.concat(pivot_options) 
        shuffle(characters)
        characters.unshift(pivot)
         //preload images
        for(var x = 0; x < characters.length; x++){
            images[characters[x]] = new Image();
           images[characters[x]].src = "Images/"+characters[x].replace(/ /g, "_")+".jpg"
        }
        
        indices.push({pivot:0, end: characters.length-1})
        $("#left").attr("src",images[characters[i]].src)
        $("#right").attr("src",images[characters[j]].src)
    }
     function showResults(){
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
          
           
           let indices = []
            if(quick) characters = characters.slice(0,10)
           for (let i = 0; i < characters.length; i++) indices.push(reference.indexOf(characters[i]))
         window.location.href = `results.html?order=${JSON.stringify(indices).replace("[","%5B").replace("]", "%5D")}`
     }
    

})