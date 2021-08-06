var TotalPictures=0;
function AddBlog(){
    var Title = document.getElementById("title").value;
    if (document.getElementById("title").value=="")
        Title="Default Title";
    var Article = document.getElementById("article").value;
    if (document.getElementById("article").value=="")
        Article="Default Article";
    var img = document.getElementById("image").value;
    if (document.getElementById("image").value=="")
        img="https://media.gettyimages.com/photos/blue-forest-scene-at-night-illustration-picture-id1262785198?s=2048x2048";

    var picture1 = "<div class=\"card blog\"><img class=\"card-img-top\" src=\"";
    var picture2 = "\" alt=\"\"><div class=\"card-body\"><h2>";
    var picture3 = "</h2><p class=\"card-text\">";
    var picture4 = "</p></div></div>";

    var temp = document.createElement("div");
    temp.id= TotalPictures;
    temp.className = 'col-4';
    document.getElementById("row").appendChild(temp);
    document.getElementById(temp.id).innerHTML = picture1 +img+ picture2 +Title+ picture3 +Article +picture4;
    TotalPictures++;
}