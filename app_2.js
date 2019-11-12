//GET DATE
var date = new Date;
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

$(".date").html(year + ' ' + month + ' ' + day);



//GLOBAL VARIABLES
var circleEmpty = '<i class="far fa-circle"></i>';
var trash = '<i class="far fa-trash-alt"></i>';


// CALL ADD TASK
$("#plusBtn").click(addTask);


//ADD TASK
function addTask() {
    var task = $(".item input").val();

    contentText =
        '<li>'
        + circleEmpty
        + '<p>'
        + task
        + '</p>'
        + trash
        + '</li>';

    $(".content ul").append(contentText);

    $(".content ul li").css({
        "list-style-type": "none",
        "display": "flex",
        "flex-direction": "row",
        "justify-content": "space-evenly",
        "align-items": "center"
    });

    //CALL STORE TO LOCAL STORAGE
    storeToLocalStorage(task);

    //REMOVE TASK + CALL REMOVE FROM LOCAL STORAGE
    $("li :nth-child(3)").click(removeTask);
    function removeTask() {
        $(this).parent().remove();
        removeFromLocalStorage($(this).parent(':nth-child(1)').text());
    }

    //TASK DONE
    $("li :nth-child(1)").click(taskDone);
    function taskDone() {
        $(this).next().css({
            "text-decoration": "line-through",
            "color": "rgb(101, 101, 101)"
        });
        $(this).addClass("fas fa-check-circle").removeClass("far fa-circle");
    }
}


//STORE TO LOCAL STORAGE
function storeToLocalStorage(task) {
    let tasks;


    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//GET TASKS FROM LOCAL STORAGE WHEN DOM CONTENT LOADED
$().ready(getFromLocalStorage);

function getFromLocalStorage() {

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        var contentText =
            '<li>'
            + circleEmpty
            + '<p>'
            + task
            + '</p>'
            + trash
            + '</li>';

        $(".content ul").append(contentText);

        $(".content ul li").css({
            "list-style-type": "none",
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "space-evenly",
            "align-items": "center"
        });
    });
}

//REMOVE FROM LOCAL STORAGE (BY SPLICING FROM ARRAY + SET NEW ARRAY TO LOCAL STORAGE)
function removeFromLocalStorage(task) {
    console.log(task);

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (taskItem, index) {
        if (task === taskItem) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//CLEAR ALL TASKS AND CLEAR LOCAL STORAGE
$(".clear-all").click(clearContent).click(clearLocalStorage);
function clearContent() {
    $("#list").empty();
};

function clearLocalStorage() {
    localStorage.clear();
}

























