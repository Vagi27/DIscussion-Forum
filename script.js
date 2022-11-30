
var welcome = document.getElementById("welcome");
var right = document.getElementById("right");
var lower = document.getElementById("lower");

var Rightbutton = document.getElementById("rbutton");
var Leftbutton = document.getElementById("lbutton");

var res1 = document.getElementById("input1");
var res2 = document.getElementById("input2");
var left = document.getElementById("lower");
let array = [];
let obj = {};
let div;
let count = 0;
let likeSpan, dislikeSpan;
let likeimage, dislikeimage;
let star;
// let likecounter = 0, dislikecounter = 0;

function timeCalcu(sec) {
    let current = Math.round(Date.now() / 1000);
    current -= sec;

    if (current < 60) {
        return `${Math.round(current)} sec ago`;
    }
    else if (current < 60 * 60) {
        return `${Math.round(current / 60)} min ago`;
    }
    else if (current < (60 * 60 * 24)) {
        return `${Math.round((current / 60) / 60)} hr ago`;
    }
    else if (current < (3600 * 24 * 365)) {
        return `${Math.round(current / 60 / 60 / 24)} day ago`
    }
    else {
        return `${Math.round(current / 60 / 60 / 24 / 365)} year ago`
    }

}

if (localStorage.length != 0) {

    let discussionArray = JSON.parse(localStorage.getItem("discussionString"));
    array = discussionArray;
    // console.log(array);

    for (key in array) {
        let newdiv = document.createElement("div");
        newdiv.setAttribute("id", array[key].id);
        newdiv.setAttribute("class", "quesdiv");
        count = array[key].id + 1;

        let para1 = document.createElement("p");
        para1.setAttribute("class", "question Bold");
        para1.innerText = array[key].subject;

        let para2 = document.createElement("p");
        para2.setAttribute("class", "question");
        para2.innerText = array[key].question;

        let likeimage = document.createElement("img");
        likeimage.setAttribute("src", "like.png");
        likeimage.setAttribute("class", "likeimg");

        let dislikeimage = document.createElement("img");
        dislikeimage.setAttribute("src", "dislike.png");
        dislikeimage.setAttribute("class", "dislikeimg");

        let likeSpan = document.createElement("span");
        likeSpan.setAttribute("class", "spans");
        likeSpan.innerText = array[key].likecount;

        let dislikeSpan = document.createElement("span");
        dislikeSpan.setAttribute("class", "spans");
        dislikeSpan.innerText = array[key].dislikecount;

        let star = document.createElement("img");
        star.setAttribute("class", "star");
        star.setAttribute("src", array[key].star);

        let timespan = document.createElement("span");
        timespan.setAttribute("class", "timespan");
        timespan.innerText = timeCalcu(array[key].time);


        likeimage.addEventListener("click", likeincrease);
        dislikeimage.addEventListener("click", dislikeincrease);
        star.addEventListener("click", startoggle);

        newdiv.appendChild(para1);
        newdiv.appendChild(para2);
        newdiv.appendChild(likeimage);
        newdiv.appendChild(likeSpan);
        newdiv.appendChild(dislikeimage);
        newdiv.appendChild(dislikeSpan);
        newdiv.appendChild(star);
        newdiv.appendChild(timespan);

        lower.appendChild(newdiv);

        newdiv.addEventListener("click", response);
    }
}

// showing welcome page
Leftbutton.addEventListener("click", function () {
    //to remove previous question response page from right div;     // right.removeChild(rightMainContainer);
    right.innerHTML = "";
    right.appendChild(welcome);
});


let object;
Rightbutton.addEventListener("click", function newquestion() {
    if (res1.value == "" || res2.value == "") {
        res1.placeholder = "Enter something first!";
        res2.placeholder = "Enter something first!";
        return;
    }

    let seconds = Math.round(Date.now() / 1000);
    // or
    // let timeT = new Date();
    // let seconds2 = Math.round(timeT.getTime() / 1000);
    // console.log(new Date());
    // console.log(seconds);
    // console.log(seconds2);

    object = {};
    object.id = count;
    object.subject = res1.value;
    object.question = res2.value;
    object.response = [];
    object.likecount = 0;
    object.dislikecount = 0;
    object.star = "star.png";
    object.time = seconds;
    array.push(object);

    //need to update local storage at every instance of data updation.
    localStorage.setItem("discussionString", JSON.stringify(array));

    // console.log(array);
    div = document.createElement("div");
    div.setAttribute("id", count++);
    div.setAttribute("class", "quesdiv");

    //both subject and question are appended into the list of questions using p tags.
    let p1 = document.createElement("p");
    p1.setAttribute("class", "question Bold");
    p1.innerText = res1.value;

    let p2 = document.createElement("p");
    p2.setAttribute("class", "question");
    p2.innerText = res2.value;

    likeimage = document.createElement("img");
    likeimage.setAttribute("src", "like.png");
    likeimage.setAttribute("class", "likeimg");

    dislikeimage = document.createElement("img");
    dislikeSpan = document.createElement("span");
    dislikeSpan.setAttribute("class", "spans");

    likeSpan = document.createElement("span");
    likeSpan.setAttribute("class", "spans");
    likeSpan.innerText = 0;

    dislikeimage.setAttribute("src", "dislike.png");
    dislikeimage.setAttribute("class", "dislikeimg");
    dislikeSpan.innerText = 0;

    star = document.createElement("img");
    star.setAttribute("src", "star.png");
    star.setAttribute("class", "star");

    let timespan = document.createElement("span");
    timespan.setAttribute("class", "timespan");
    timespan.innerText = "0 sec";

    //event listeners on both images like and dislike  and also on star(bookmark or favourite) 
    likeimage.addEventListener("click", likeincrease);
    dislikeimage.addEventListener("click", dislikeincrease);
    star.addEventListener("click", startoggle);



    //appending subject+question+ likeimage and likecount span+ dislike image and dislike count span
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(likeimage);
    div.appendChild(likeSpan);
    div.appendChild(dislikeimage);
    div.appendChild(dislikeSpan);
    div.appendChild(star);
    div.appendChild(timespan);

    lower.appendChild(div);

    //emptying the values of input + textarea field & resetting the placeholder values;  
    res1.value = "";
    res1.placeholder = "Subject";
    res2.value = "";
    res2.placeholder = "Write Your Question Here...";

    div.addEventListener("click", response);
});

//Search function
let inputfield = document.getElementById("searchfield");
inputfield.addEventListener("input", function search() {
    for (key in array) {
        let elementid = document.getElementById(array[key].id)
        if ((array[key].subject).toLowerCase().includes((inputfield.value).toLowerCase())) {
            elementid.style.display = "block";
        }
        else {
            elementid.style.display = "none";
        }
    }
});

let temp, temp2, btn, rightMainContainer, id;
let input, textarea;
let responseHeadContainer, divcom, divcomContainer;

//this function brings back the recorded questions onto the right side of the page;
function response(event) {
    //if there are many childlist then a loop can be used

    //to remove previous question response page form right div;
    // right.removeChild(rightMainContainer); OR nullifying the HTML of the required element
    right.innerHTML = "";
    // console.log(event.target.id);

    //console.log(event.target);
    temp = event.target.children[0].innerText;
    temp2 = event.target.children[1].innerText;
    let currentid = event.target.id;

    rightMainContainer = document.createElement("div");
    rightMainContainer.setAttribute("class", "staticDiv");

    //P tags'   "pointer-events: none;" property is being copied so in order to change it, it would have to be changed seperately.

    //subject container on the right side.
    let rp1 = document.createElement("p");
    rp1.setAttribute("class", "response heading");
    rp1.innerText = temp;

    //question container on the right side.
    let rp2 = document.createElement("p");
    rp2.setAttribute("class", "response")
    rp2.innerText = temp2;

    //subject and question container on the right side (rp1 and rp2)
    let responseHeadContainer = document.createElement("div");
    responseHeadContainer.setAttribute("class", "responseHeadContainer");

    responseHeadContainer.appendChild(rp1);
    responseHeadContainer.appendChild(rp2);

    //add button - for adding responsive comments on questions
    btn = document.createElement("button");
    btn.setAttribute("class", "addbutton");
    btn.innerText = "ADD";

    //resolve button - for removing resolved questions
    let resolvebutton = document.createElement("button");
    resolvebutton.setAttribute("class", "addbutton");
    resolvebutton.innerText = "Resolve";

    //add button + resolve button container for margin 
    let addreso = document.createElement("div");
    addreso.setAttribute("class", "addreso");
    addreso.appendChild(btn);
    addreso.appendChild(resolvebutton);


    //add button to pop open input & textarea fields
    let divcomContainer = document.createElement("div");
    divcomContainer.setAttribute("class", "divcomContainer");

    for (key in array) {
        if (array[key].id == currentid) {
            for (key1 in array[key].response) {
                // if(array[key].response[key1])
                let h3a = document.createElement("h3");
                h3a.classList.add("responsehead");
                h3a.innerText = array[key].response[key1].name;
                // console.log(array[key].response);

                let pa1 = document.createElement("p");
                pa1.classList.add("responsehead");
                pa1.innerText = array[key].response[key1].comment;

                divcom = document.createElement("div");
                divcom.setAttribute("class", "divcom");
                divcom.appendChild(h3a);
                divcom.appendChild(pa1);
                divcomContainer.appendChild(divcom);
            }
        }
    }

    //resolve button listener
    resolvebutton.addEventListener("click", function () {
        for (key in array) {
            if (array[key].id == currentid) {
                array.splice(key, 1);
                right.innerHTML = "";
                //updating local storage instance of each and every response;
                localStorage.setItem("discussionString", JSON.stringify(array));

                let removediv = document.getElementById(currentid);
                // removediv.remove();
                lower.removeChild(removediv);
                // right.innerHTML = "";
                right.appendChild(welcome);

            }
        }
    });


    btn.addEventListener("click", function addbutton() {
        this.disabled = true;
        //input button shall hold the name of the commenter 
        input = document.createElement("input");
        input.setAttribute("placeholder", "Name");
        input.setAttribute("class", "nameComment");

        //textarea shall hold the comments 
        textarea = document.createElement("textarea");
        textarea.setAttribute("placeholder", "Enter Your Response here.");
        textarea.setAttribute("class", "textComment");

        // this button adds the response to the opened question window
        let button = document.createElement("button");
        button.addEventListener("click", function () {
            //validation check for empty fields
            if (input.value == "" || textarea.value == "") {
                return;
            }

            //pushing the responses into its relevant object
            let h3 = document.createElement("h3");
            h3.setAttribute("class", "responsehead");
            h3.innerText = input.value;
            input.value = "";
            input.setAttribute("placeholder", "Name");

            let p = document.createElement("p");
            p.innerText = textarea.value;
            p.setAttribute("class", "responsepara");
            textarea.value = "";
            textarea.setAttribute("placeholder", "Enter Your Response here.");

            //A seperate division for each comment made
            divcom = document.createElement("div");
            divcom.setAttribute("class", "divcom");

            divcom.appendChild(h3);
            divcom.appendChild(p);
            divcomContainer.appendChild(divcom);

            let responsebody = {};
            responsebody.name = h3.innerText;
            responsebody.comment = p.innerText;

            for (let i = 0; i < array.length; i++) {
                if (array[i].id == currentid) {
                    array[i].response.push(responsebody);
                    //updating local storage instance of each and every response;
                    localStorage.setItem("discussionString", JSON.stringify(array));
                    break;
                }
            }
        });

        button.innerText = "Add Response";
        //one childlist cannot be appended multiple time without redefining the values
        let br = document.createElement("br");
        right.appendChild(input);
        right.appendChild(br);
        right.appendChild(textarea);
        br = document.createElement("br");
        right.appendChild(br);
        right.appendChild(button);

    });

    // A div for responses
    let resheading = document.createElement("div");
    resheading.setAttribute("class", "resheading");

    // making and appending a h2 tag inside it. coz, it helps with text size: lol,
    // but ruins general spacing along with margins and becomes a monster to deal with.

    let h2 = document.createElement("h2");
    h2.innerHTML = "Response<br>";
    // label.appendChild(h2);
    //appending label(h2) in div section and then further appending this div into right div
    resheading.appendChild(h2);

    //appending all children in requires series
    rightMainContainer.appendChild(responseHeadContainer); // rightMainContainer.appendChild(rp1); rightMainContainer.appendChild(rp2);
    rightMainContainer.appendChild(addreso);  // rightMainContainer.appendChild(btn); // rightMainContainer.appendChild(resolvebutton);
    rightMainContainer.appendChild(resheading);
    rightMainContainer.appendChild(divcomContainer);
    right.appendChild(rightMainContainer);
}

function likeincrease(event) {
    // console.log(event);
    event.stopPropagation();
    let childlist = event.target.parentElement.children;
    // console.log(childlist);
    childlist[3].innerText = parseInt(childlist[3].innerText) + 1;

    // console.log(event.target.parentElement);
    let parent = event.target.parentElement;
    // console.log(parent.id);
    for (key in array) {
        if (array[key].id == parent.id) {
            array[key].likecount = childlist[3].innerText;
            // console.log("this is like count in array", array[key].likecount);
            localStorage.setItem("discussionString", JSON.stringify(array));
        }
    }
}

function dislikeincrease(event) {
    event.stopPropagation();
    let childlist = event.target.parentElement.children;
    childlist[5].innerText = parseInt(childlist[5].innerText) + 1;

    let parent = event.target.parentElement;
    for (key in array) {
        if (array[key].id == parent.id) {
            array[key].dislikecount = childlist[5].innerText;
            localStorage.setItem("discussionString", JSON.stringify(array));
        }
    }
}

function startoggle(event) {
    event.stopPropagation();

    for (key in array) {
        if (array[key].id == event.target.parentElement.id) {
            // console.log(event.target.parentElement.id, array[key].id);
            if (array[key].star == "star.png") {
                array[key].star = "starlight.png";
                event.target.src = "starlight.png";
                localStorage.setItem("discussionString", JSON.stringify(array));
            }
            else {
                array[key].star = "star.png";
                event.target.src = "star.png";
                localStorage.setItem("discussionString", JSON.stringify(array));
            }
        }
    }
}

setInterval(function () {

    let div = document.getElementById("lower");
    let childs = div.children

    for (key in childs) {
        if (key == 'length') {
            return;
        }
        // console.log(key);
        let child = childs[key].children;
        child[7].innerText = timeCalcu(array[key].time);
    }
}, 1000);